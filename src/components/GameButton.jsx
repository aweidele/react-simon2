import { useEffect } from "react";
import ButtonShape from "./buttonShape";

const colors = {
  yellow: ["fill-yellow", "fill-yellow-active"],
  green: ["fill-green", "fill-green-active"],
  blue: ["fill-blue", "fill-blue-active"],
  red: ["fill-red", "fill-red-active"],
};

export const GameButton = ({ color, active, onMouseDown, onMouseUp, position, percent }) => {
  const fillClass = colors[color][active ? 1 : 0];
  let positionClass;
  switch (position) {
    case "top left":
      positionClass = "top-button left-button rotate-180";
      break;
    case "top right":
      positionClass = "top-button right-button -rotate-90";
      break;
    case "bottom right":
      positionClass = "bottom-button right-button";
      break;
    case "bottom left":
      positionClass = "bottom-button left-button rotate-90";
      break;
  }

  return (
    <button className={`w-[43%] cursor-pointer pointer-events-none touch-manipulation block absolute ${positionClass}`} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <ButtonShape percent={percent} fillClass={fillClass} />
    </button>
  );
};
