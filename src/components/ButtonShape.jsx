import { calculatePath } from "../functions/functions";

export default function ButtonShape({ percent, fillClass }) {
  const radius = 345;
  const innerRad = 145;
  const path = calculatePath(percent, radius, innerRad);

  return (
    <svg className={`block`} viewBox={`0 0 ${radius} ${radius}`}>
      <path className={`pointer-events-auto ${fillClass} transition duration-200`} strokeWidth={0} d={path}></path>
    </svg>
  );
}
