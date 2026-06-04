import React, { useState, useRef, useEffect } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function ScrambleTextSwitcher({words, activeIndex,
  duration = 400}) {
/*   const words = ["Apple", "Banana", "Cats"]; */

/*   const [index, setIndex] = useState(0); */
  const [displayText, setDisplayText] = useState( words[activeIndex] || "");

  const intervalRef = useRef(null);
  useEffect(() => {
    const targetText = words[activeIndex] || "";

    let frame = 0;
    const totalFrames = duration / 40;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      frame++;

      const scrambled = Array(targetText.length)
        .fill("")
        .map(
          () =>
            CHARS[
              Math.floor(Math.random() * CHARS.length)
            ]
        )
        .join("");

      setDisplayText(scrambled);

      if (frame >= totalFrames) {
        clearInterval(intervalRef.current);
        setDisplayText(targetText);
      }
    }, 80);

    return () => clearInterval(intervalRef.current);
  }, [activeIndex, words, duration]);



  return (
    <div className="scrambleText"
    
      style={{
        cursor: "pointer",
        fontSize: "5rem",
        fontWeight: "700",
        userSelect: "none",
        fontFamily:'system-ui'
       
     
      }}
    >
      {displayText}
    </div>
  );
}