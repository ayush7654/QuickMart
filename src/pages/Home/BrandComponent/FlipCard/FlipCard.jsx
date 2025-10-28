import React from "react";
import "./FlipCard.css";

const FlipCard = ({ frontImage, backImage, isFlipped ,propClass }) => {
  return (
   <div className={`flip-card ${propClass}`}>
      <div className="flip-card-inner" style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <div className="flip-card-front">
          <img src={frontImage} alt="Front logo" />
        </div>
        <div className="flip-card-back" style={{backgroundImage:`url(${backImage})`}}>
       
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
 {/*   <img src={backImage} alt="Back logo" /> */}