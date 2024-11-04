import React from 'react';

const StarRating = ({ rating }) => {
  // Ensure the rating is within the 0 to 5 range
  const validRating = Math.max(0, Math.min(rating, 5));

  return (
    <div style={{ display: 'flex' }}>
      {[...Array(5)].map((_, index) => {
        const fillPercentage = Math.min(1, Math.max(0, validRating - index)) * 100;

        return (
          <div
            key={index}
            style={{
              width: '20px',
              height: '20px',
              margin: '0 4px',
              position: 'relative',
              border: '1px solid black',
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              backgroundColor: 'white', // Background for unfilled part
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${fillPercentage}%`,
                height: '100%',
                backgroundColor: 'black',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
