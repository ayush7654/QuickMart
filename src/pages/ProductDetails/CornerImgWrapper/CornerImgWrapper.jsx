import React from 'react'
import './CornerImgWrapper.css'
export default function CornerImgWrapper() {
  return (
    <div className='corner-border'>
        <span className='corner top-left'></span>
        <span className='corner top-right'></span>
        <span className='corner bottom-left'></span>
        <span className='corner bottom-right'></span>
    </div>
  )
}
