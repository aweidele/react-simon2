export function SpeedSlider({ speed, onChange, disabled }) {
  const max = 4;
  function handleChange(e) {
    setSpeed(e.target.value);
  }

  return (
    <div className={`w-1/2 m-auto transition-all duration-300${disabled ? " opacity-50" : ""}`}>
      <div className="text-center flex my-4">
        {Array.from({ length: max }, (_, i) => i + 1).map((i) => (
          <div className={`grow-1 transition-all duration-300 ${i === speed ? "text-yellow-active" : "text-white"}`}>{i}</div>
        ))}
      </div>
      <div className="relative">
        <input className="speed-slider w-full absolute top-0 left-0 h-full" type="range" min="1" max={max} onChange={onChange} disabled={disabled} value={speed} />
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 163.233 9" className="fill-slider-bg">
          <path d="M163.233 6 81.617 9 0 6V3l81.617-3 81.616 3v3z" />
        </svg>
      </div>
    </div>
  );
}
