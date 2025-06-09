import React from 'react';
import { MdStar, MdStarBorder, MdStarHalf } from 'react-icons/md';

const StarRating = ({ rating, starSize }) => {
  const stars = Array.from({ length: 5 });

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {stars.map((_, index) => {
        return (
          <span key={index}>
            {rating > index ? (
              <MdStar color="rgb(79, 78, 78)" size={starSize} />
            ) : (
              < MdStarBorder color="rgb(79, 78, 78)" size={starSize} /> 
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
