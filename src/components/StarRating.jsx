import React from 'react';
import { MdStar, MdStarBorder, MdStarHalf } from 'react-icons/md';

const StarRating = ({ rating, starSize }) => {
  const stars = Array.from({ length: 5 });

  return (
    <div style={{ display: 'flex', gap: '4px',alignItems:'center'}}>
      {stars.map((_, index) => {
        return (
          <span key={index} style={{aspectRatio:'1/1'}} >
            {rating > index ? (
              <MdStar color="rgb(255, 62, 96)" size={starSize} />
            ) : (
              < MdStar color="rgb(185, 185, 185)" size={starSize} /> 
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
