import React from "react";
import "./FlipCard.css";

const FlipCard = ({ frontImage, backImage }) => {
  return (
    <div className="brand-logo-sm flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={frontImage} alt="Front logo" />
        </div>
        <div className="flip-card-back">
          <img src={backImage} alt="Back logo" />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
