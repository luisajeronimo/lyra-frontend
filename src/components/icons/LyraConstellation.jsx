import React from "react";
import { StarIcon } from "./StarIcon";

export const LyraConstellation = () => (
  <div className="relative w-48 h-48 md:w-56 md:h-56 -mb-4">
    <div className="absolute inset-8 bg-purple-600/5 blur-[40px] rounded-full animate-pulse"></div>
    <svg
      viewBox="0 0 100 100"
      className="relative w-full h-full text-purple-300/80 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]"
    >
      <g className="text-purple-400/40">
        <line
          x1="75"
          y1="20"
          x2="55"
          y2="30"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <line
          x1="55"
          y1="30"
          x2="35"
          y2="40"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <line
          x1="35"
          y1="40"
          x2="28"
          y2="75"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <line
          x1="28"
          y1="75"
          x2="48"
          y2="70"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <line
          x1="48"
          y1="70"
          x2="55"
          y2="30"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      </g>
      <StarIcon
        cx={75}
        cy={20}
        size={3.5}
        className="text-white animate-pulse"
      />
      <StarIcon cx={55} cy={30} size={2.2} className="opacity-90" />
      <StarIcon cx={35} cy={40} size={2.2} className="opacity-90" />
      <StarIcon cx={28} cy={75} size={2.5} className="opacity-90" />
      <StarIcon cx={48} cy={70} size={2.5} className="opacity-90" />
    </svg>
  </div>
);
