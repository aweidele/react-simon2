import { useState, useEffect } from "react";
import { GameButton } from "./GameButton";
import { StartButton } from "./StartButton";

export function GameBoard() {
  const gameButtons = ["yellow", "blue", "green", "red"];

  const [activeButton, setActiveButton] = useState(0);
  const [gameSequence, setGameSequence] = useState([1, 2, 3, 4]);
  const [iteration, setIteration] = useState(0);
  const [gameMode, setGameMode] = useState("gameover");

  const handleButtonDown = (num) => {
    setActiveButton(num);
  };

  const handleButtonUp = (num) => {
    setActiveButton(0);
    const nextTurn = iteration + 1;
    if (nextTurn < gameSequence.length) {
      setIteration(nextTurn);
    } else {
      setIteration(0);
      setGameSequence((prevSequence) => [...prevSequence, Math.floor(Math.random() * 4)]);
      setGameMode("playback-pause");
    }
  };

  useEffect(() => {
    if (gameMode === "playback-on") {
      setActiveButton(gameSequence[iteration]);
      setTimeout(() => {
        setActiveButton(0);
        const nextTurn = iteration + 1;
        if (nextTurn < gameSequence.length) {
          setIteration(nextTurn);
          setGameMode("playback-pause");
        } else {
          setIteration(0);
          setGameMode("player");
        }
      }, 1000);
    }
    if (gameMode === "playback-pause") {
      setTimeout(
        () => {
          setGameMode("playback-on");
        },
        iteration ? 250 : 750
      );
    }
  }, [gameMode]);

  const handleStart = () => {
    setGameSequence((prevSequence) => [...prevSequence, Math.floor(Math.random() * 4)]);
    setGameMode("playback-on");
    setIteration(0);
  };

  return (
    <>
      <div className="fixed">
        <p>
          {iteration} / {gameMode}
        </p>
        <ul>
          {gameSequence.map((num, i) => (
            <li key={`seq${i}`}>{gameButtons[num - 1]}</li>
          ))}
        </ul>
      </div>
      <div className="max-w-210 max-h-screen mx-auto p-5 aspect-square">
        <div className="h-full w-full bg-almost-black rounded-full relative flex justify-center items-center">
          <div className="w-[40%]">
            <StartButton onClick={handleStart} disabled={gameMode !== "gameover"} />
          </div>
          {gameButtons.map((btn, i) => (
            <GameButton
              key={btn}
              color={btn}
              active={activeButton === i + 1}
              onMouseDown={() => {
                handleButtonDown(i + 1);
              }}
              onMouseUp={() => {
                handleButtonUp(i + 1);
              }}
              disabled={gameMode !== "player"}
            />
          ))}
        </div>
      </div>
    </>
  );
}
