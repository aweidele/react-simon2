import { useEffect, useRef } from "react";
// import { startNote, stopNoteWithFade } from "../functions/sound";

const colors = {
  yellow: ["fill-yellow", "fill-yellow-active"],
  green: ["fill-green", "fill-green-active"],
  blue: ["fill-blue", "fill-blue-active"],
  red: ["fill-red", "fill-red-active"],
};
import { buttons } from "../functions/sound";

export const GameButton = ({ color, active, onMouseDown, onMouseUp, onMouseLeave, disabled, error }) => {
  const fillClass = buttons[color].colors[active ? 1 : 0];
  const strokeClass = buttons[color].stroke;
  const positionClass = buttons[color].position;

  const audioCtxRef = useRef(null);
  const noteOscillatorRef = useRef(null);
  const harmOscillatorRef = useRef(null);
  const bassOscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const fadeDuration = 0.1;

  function startNote() {
    if (noteOscillatorRef.current || harmOscillatorRef.current || bassOscillatorRef.current) return; // Prevent duplicate oscillators

    const audioCtx = audioCtxRef.current;
    const noteOsc = audioCtx.createOscillator();
    const harmOsc = audioCtx.createOscillator();
    const bassOsc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    noteOsc.type = error ? "triangle" : "sine";
    noteOsc.frequency.setValueAtTime(buttons[color].note, audioCtx.currentTime);

    harmOsc.type = "triangle";
    harmOsc.frequency.setValueAtTime(error ? buttons[color].diss : buttons[color].harm, audioCtx.currentTime);

    bassOsc.type = error ? "triangle" : "sine";
    bassOsc.frequency.setValueAtTime(buttons[color].bass, audioCtx.currentTime);

    gain.gain.setValueAtTime(0, audioCtx.currentTime); // Start at volume 0
    gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + fadeDuration); // Fade in

    noteOsc.connect(gain);
    harmOsc.connect(gain);
    bassOsc.connect(gain);
    gain.connect(audioCtx.destination);

    noteOsc.start();
    harmOsc.start();
    bassOsc.start();

    noteOscillatorRef.current = noteOsc;
    harmOscillatorRef.current = harmOsc;
    bassOscillatorRef.current = bassOsc;
    gainNodeRef.current = gain;
  }

  function stopNoteWithFade() {
    if (!noteOscillatorRef.current || !harmOscillatorRef.current || !bassOscillatorRef.current || !gainNodeRef.current) return;

    const audioCtx = audioCtxRef.current;
    const gain = gainNodeRef.current;
    const noteOsc = noteOscillatorRef.current;
    const harmOsc = harmOscillatorRef.current;
    const bassOsc = bassOscillatorRef.current;

    gain.gain.setValueAtTime(gain.gain.value, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + fadeDuration); // Fade out

    setTimeout(() => {
      noteOsc.stop();
      harmOsc.stop();
      bassOsc.stop();

      noteOsc.disconnect();
      harmOsc.disconnect();
      bassOsc.disconnect();

      gain.disconnect();
      noteOscillatorRef.current = null;
      harmOscillatorRef.current = null;
      bassOscillatorRef.current = null;
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

    return () => stopNoteWithFade();
  }, [active]);

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  return (
    <button disabled={disabled} className={`w-[43%] pointer-events-none touch-manipulation block absolute ${positionClass}`} onTouchStart={onMouseDown} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave} onContextMenu={handleContextMenu}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 347.845 347.845">
        <path
          className={`pointer-events-auto ${fillClass} transition duration-200 stroke-2 ${strokeClass}`}
          d="M245.51 245.51c-14.21 14.21-25.368 30.762-33.165 49.192a153.502 153.502 0 0 0-11.906 51.143H0c1.113-44.722 10.448-88.105 27.785-129.1 17.882-42.278 43.486-80.25 76.096-112.864 32.61-32.61 70.584-58.214 112.864-76.096C257.737 10.445 301.123 1.113 345.845 0v200.439a153.377 153.377 0 0 0-51.143 11.906c-18.43 7.794-34.981 18.953-49.191 33.166Z"
        />
      </svg>
    </button>
  );
};
