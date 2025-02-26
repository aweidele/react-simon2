export function StartButton({ disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled} className={`bg-red-active hover:bg-red-hover w-[20%] aspect-square rounded-full text-white uppercase mx-auto block text-start-button my-2 transition-all${disabled ? " opacity-30" : ""}`}>
      Start
    </button>
  );
}
