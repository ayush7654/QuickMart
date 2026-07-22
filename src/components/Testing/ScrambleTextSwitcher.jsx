import React, { useState, useRef, useEffect } from "react";
import { useStoreData } from "../StoreDataContext";
const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function ScrambleTextSwitcher({words, activeIndex,
  duration = 400}) {

  const [displayText, setDisplayText] = useState( words[activeIndex] || "");
 const{isAtTop} = useStoreData();

console.log( ' store page position' , isAtTop)


  const intervalRef = useRef(null);
  useEffect(() => {
  const targetText = words[activeIndex] || "";

  // 1. If we aren't at the top, immediately reveal the final text and don't scramble
  if (!isAtTop) {
    clearInterval(intervalRef.current);
    setDisplayText(targetText);
    return; 
  }

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
  }, 100);

  return () => clearInterval(intervalRef.current);
}, [activeIndex, words, duration, isAtTop]); // 2. Added isAtTop to dependencies



  return (
    <div className="scrambleText"
    
      style={{
        cursor: "pointer",
        fontSize: "5rem",
        fontWeight: "400",
        userSelect: "none",
        fontFamily:'Roboto'

      
       
     
      }}
    >
      {displayText}
    </div>
  );
}