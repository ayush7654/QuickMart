import React from "react";
import "./AnimatedUnderline.css";

export default function AnimatedUnderline({
  children,
  from = "left",
    exit = "opposite", 
  thickness = 1.5,
  offset = 0,
  color = "rgb(50,50,50)",
  duration = 0.3,
}) {
  return (
    <span
         className={`animated-underline from-${from} exit-${exit}`}
      style={{
        "--underline-thickness": `${thickness}px`,
        "--underline-offset": `${offset}px`,
        "--underline-color": color,
        "--underline-duration": `${duration}s`,
      }}
    >
      {children}
    </span>
  );
}
