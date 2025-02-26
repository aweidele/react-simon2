import { useState } from "react";
import { GameButton } from "./GameButton";
import { StartButton } from "./StartButton";

export function GameBoard() {
  const gameButtons = ["yellow", "blue", "green", "red"];

  const [activeButton, setActiveButton] = useState(0);
  const [gameSequence, setGameSequence] = useState([1, 2, 3, 4]);
  const [gameMode, setGameMode] = useState("gameover");

  const handleButtonDown = (num) => {
    setActiveButton(num);
  };

  const handleButtonUp = () => {
    setActiveButton(0);
  };

  return (
    <div className="max-w-210 max-h-screen mx-auto p-5 aspect-square">
      <div className="h-full w-full bg-almost-black rounded-full relative flex justify-center items-center">
        <div className="w-[40%]">
          <StartButton />
        </div>
        {gameButtons.map((btn, i) => (
          <GameButton
            key={btn}
            color={btn}
            active={activeButton === i + 1}
            onMouseDown={() => {
              handleButtonDown(i + 1);
            }}
            onMouseUp={handleButtonUp}
            onTouchStart={() => {
              handleButtonDown(i + 1);
            }}
            onTouchEnd={handleButtonUp}
          />
        ))}
      </div>
    </div>
  );
}
