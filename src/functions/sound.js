export function startNote() {
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

export function stopNoteWithFade() {
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
