import React, {useState} from 'react'
import './Testing.css'
import MenuCancel from '../MenuCancel/MenuCancel';


export default function Testing() {
  
  const [currentStage, setCurrentStage] = useState(1); // 0–3

  const stages = ["Ordered", "Packed", "Shipped", "Delivered"];

  // Each gap between circles is 1 segment (total 3 segments)
  const progressPercent = (currentStage / (stages.length - 1)) * 100;


  return (
    <div className='testing-div'>

  <div className='tracking-div'>
    <div className='tracking-path-div'>
      <div id='tracking-path' className='empty-path'></div>
      <div id='tracking-path' className='filled-path'></div>
    </div>
    <div className='stage-div-container'>
      {stages.map((item,i)=><div className='stage-div' style={{backgroundColor:currentStage>=i?'rgb(80,220,220)':'rgb(210, 210, 210)'}}><div className='stage-name' style={{color:currentStage>=i?'rgba(0, 0, 0, 1)':'rgb(190, 190, 190)'}}>{item}</div></div>)}
    </div>

  </div>
    </div>
  )
}