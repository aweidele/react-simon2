import { useState, useEffect } from "react";
import { GameButton } from "./GameButton";
import { StartButton } from "./StartButton";

export function GameBoard() {
  const gameButtons = ["yellow", "blue", "green", "red"];

  const [activeButton, setActiveButton] = useState(0);
  const [gameSequence, setGameSequence] = useState([]);
  const [iteration, setIteration] = useState(0);
  const [gameMode, setGameMode] = useState("gameover");
  const [errorFlash, setErrorFlash] = useState(0);

  const handleButtonDown = (num) => {
    setActiveButton(num);
  };

  const handleButtonUp = (num) => {
    setActiveButton(0);

    if (num === gameSequence[iteration]) {
      console.log("correct");
      const nextTurn = iteration + 1;
      if (nextTurn < gameSequence.length) {
        setIteration(nextTurn);
      } else {
        setIteration(0);
        setGameSequence((prevSequence) => [...prevSequence, Math.floor(Math.random() * 4) + 1]);
        setGameMode("playback-pause");
      }
    } else {
      setGameMode("error");
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
      }, 750);
    }
    if (gameMode === "playback-pause") {
      setTimeout(
        () => {
          setGameMode("playback-on");
        },
        iteration ? 250 : 750
      );
    }

    if (gameMode === "error") {
      setActiveButton(gameSequence[iteration]);
      setTimeout(() => {
        setErrorFlash((prev) => prev + 1);
        setActiveButton(0);
        setGameMode("error-flash");
      }, 400);
    }

    if (gameMode === "error-flash") {
      if (errorFlash < 4) {
        setTimeout(() => {
          setGameMode("error");
        }, 200);
      } else {
        setGameMode("gameover");
        setGameSequence([]);
      }
    }
  }, [gameMode]);

  const handleStart = () => {
    setGameSequence((prevSequence) => [...prevSequence, Math.floor(Math.random() * 4) + 1]);
    setIteration(0);
    setErrorFlash(0);
    setGameMode("playback-on");
  };

  return (
    <>
      <div className="fixed text-sm">
        <p>
          {iteration} / {gameSequence.length} / {gameMode}
        </p>
        <p>{errorFlash}</p>
        <ul className="my-4">
          {gameSequence.map((num, i) => (
            <li key={`seq${i}`}>
              {num} {gameButtons[num - 1]}
            </li>
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
              error={gameMode === "error" || gameMode === "error-flash"}
            />
          ))}
        </div>
      </div>
    </>
  );
}
