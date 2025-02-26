export function StartButton({ disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled} className={`bg-red-active w-[20%] aspect-square rounded-full text-white uppercase m-auto block text-xs transition-all${disabled ? " opacity-30" : ""}`}>
      Start
    </button>
  );
}
