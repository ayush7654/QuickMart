import React from 'react'
import './PageHeader.css'
export default function PageHeader({bgImage,pageHeadText,pageHeadPara}) {
  return (
    <div className="page-head-div" 
    style={{
    backgroundImage:
      `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.2)), url(${bgImage})`
  }}>
    <h2 className="page-head">{pageHeadText}</h2>
    <p className="page-head-description">
    {pageHeadPara}
    </p>

   </div>
  )
}
