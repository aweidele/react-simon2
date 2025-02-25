import { useState } from "react";
import { GameButton } from "./GameButton";

export function GameBoard() {
  const gameButtons = [
    {
      color: "yellow",
      position: "top left",
    },
    {
      color: "blue",
      position: "top right",
    },
    {
      color: "green",
      position: "bottom right",
    },
    {
      color: "red",
      position: "bottom left",
    },
  ];

  const [activeButton, setActiveButton] = useState(0);

  const handleButtonDown = (num) => {
    setActiveButton(num);
  };

  const handleButtonUp = () => {
    setActiveButton(0);
  };

  return (
    <>
      <div className="max-w-210 max-h-screen mx-auto p-5">
        <div className="h-full w-full bg-almost-black rounded-full aspect-square relative">
          {gameButtons.map((btn, i) => (
            <GameButton
              key={btn.color}
              color={btn.color}
              active={activeButton === i + 1}
              onMouseDown={() => {
                handleButtonDown(i + 1);
              }}
              onMouseUp={handleButtonUp}
              position={btn.position}
            />
          ))}
        </div>
      </div>
    </>
  );
}
