import React from "react";

export const StarIcon = ({ cx, cy, size, className }) => (
  <path
    d={`M ${cx} ${cy - size} 
       L ${cx + size * 0.25} ${cy - size * 0.25} 
       L ${cx + size} ${cy - size * 0.2} 
       L ${cx + size * 0.4} ${cy + size * 0.2} 
       L ${cx + size * 0.6} ${cy + size} 
       L ${cx} ${cy + size * 0.5} 
       L ${cx - size * 0.6} ${cy + size} 
       L ${cx - size * 0.4} ${cy + size * 0.2} 
       L ${cx - size} ${cy - size * 0.2} 
       L ${cx - size * 0.25} ${cy - size * 0.25} Z`}
    fill="currentColor"
    className={className}
  />
);
