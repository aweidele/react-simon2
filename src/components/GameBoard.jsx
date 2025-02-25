import { GameButton } from "./GameButton";

export function GameBoard() {
  return (
    <div className="max-w-210 max-h-screen mx-auto p-5 aspect-square">
      <div className="h-full w-full bg-almost-blac rounded-full relative">
        <GameButton />
      </div>
    </div>
  );
}
