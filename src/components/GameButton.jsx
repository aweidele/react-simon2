import { useEffect, useRef } from "react";
// import { startNote, stopNoteWithFade } from "../functions/sound";

const colors = {
  yellow: ["fill-yellow", "fill-yellow-active"],
  green: ["fill-green", "fill-green-active"],
  blue: ["fill-blue", "fill-blue-active"],
  red: ["fill-red", "fill-red-active"],
};

export const GameButton = ({ color, active, onMouseDown, onMouseUp, position }) => {
  const fillClass = colors[color][active ? 1 : 0];
  let positionClass;
  switch (position) {
    case "top left":
      positionClass = "top-button left-button";
      break;
    case "top right":
      positionClass = "top-button right-button rotate-90";
      break;
    case "bottom right":
      positionClass = "bottom-button right-button rotate-180";
      break;
    case "bottom left":
      positionClass = "bottom-button left-button -rotate-90";
      break;
  }

  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const fadeDuration = 0.1;

  function startNote() {
    if (oscillatorRef.current) return; // Prevent duplicate oscillators

    const audioCtx = audioCtxRef.current;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine"; // Change to 'square', 'sawtooth', or 'triangle' if needed
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    gain.gain.setValueAtTime(0, audioCtx.currentTime); // Start at volume 0
    gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + fadeDuration); // Fade in

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();

    oscillatorRef.current = osc;
    gainNodeRef.current = gain;
  }

  function stopNoteWithFade() {
    if (!oscillatorRef.current || !gainNodeRef.current) return;

    const audioCtx = audioCtxRef.current;
    const gain = gainNodeRef.current;
    const osc = oscillatorRef.current;

    gain.gain.setValueAtTime(gain.gain.value, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + fadeDuration); // Fade out

    setTimeout(() => {
      osc.stop();
      osc.disconnect();
      gain.disconnect();
      oscillatorRef.current = null;
      gainNodeRef.current = null;
    }, fadeDuration * 1000); // Stop after fade out
  }

  useEffect(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (active) {
      startNote();
    } else {
      stopNoteWithFade();
    }

    return () => stopNoteWithFade(); // Cleanup when unmounting
  }, [active]); // Re-run when `active` changes

  return (
    <button className={`w-[43%] cursor-pointer pointer-events-none touch-manipulation block absolute ${positionClass}`} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 345.845 345.845">
        <path
          className={`pointer-events-auto ${fillClass} transition duration-200`}
          d="M245.51 245.51c-14.21 14.21-25.368 30.762-33.165 49.192a153.502 153.502 0 0 0-11.906 51.143H0c1.113-44.722 10.448-88.105 27.785-129.1 17.882-42.278 43.486-80.25 76.096-112.864 32.61-32.61 70.584-58.214 112.864-76.096C257.737 10.445 301.123 1.113 345.845 0v200.439a153.377 153.377 0 0 0-51.143 11.906c-18.43 7.794-34.981 18.953-49.191 33.166Z"
        />
      </svg>
    </button>
  );
};
