import React from 'react'
import './CarouselNav.css'
export default function CarouselNav({list,activeIndex,setActiveIndex,color='255,255,255'}) {


const dotRgb = color;

  return (
    <div className="pagination-container"
    style={{ '--dot-rgb': dotRgb }}>
      {list.map((_, index) => (
        <div
          key={index}
          className={`pagination-dot ${activeIndex === index ? 'active' : ''}`}
          onClick={() => setActiveIndex(index)} 
        />
      ))}
    </div> 
  )
}
