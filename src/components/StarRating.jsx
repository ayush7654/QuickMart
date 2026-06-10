import React from 'react';
import { MdStar, MdStarBorder, MdStarHalf } from 'react-icons/md';

const StarRating = ({ rating, starSize , starCount=5, color='rgb( 252, 186, 3)' }) => { /* 255, 62, 96*/
  const stars = Array.from({ length: starCount });

  return (
    <div style={{ display: 'flex',alignItems:'center', justifyContent:'center'}}>
      {stars.map((_, index) => {
        return (
          <span key={index} style={{aspectRatio:'1/1', display: 'flex',alignItems:'center', justifyContent:'center'}} >
            {rating > index ? (
              <MdStar color={color} size={starSize} />
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
