import React from 'react'

export default function NavigationButtons({array,func}) {
  return (
    <div>
         {array.map((nav, index) => (
    <div 
      key={nav.id}
      // Use index if your activeIndex is 0-based, or nav.id if it matches exactly
      onClick={() => setActiveIndex(index)} 
      className={`CrousalNav ${index === activeIndex ? "CrousalNav-selected" : ''}`}
    />
  ))}
    </div>
  )
}
 
