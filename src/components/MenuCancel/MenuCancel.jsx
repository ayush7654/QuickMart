import React, {useState} from 'react'
import './MenuCancel.css'

export default function MenuCancel({state,colorSwitch}) {

    const [open, setOpen] = useState(false);

  return (
    <div
  className={`menu-btn ${state ? "open" : ""} ${colorSwitch ? 'header-menu' : ''}`}
  /*   onMouseEnter={() => setOpen(true)}
  onMouseLeave={() => setOpen(false)} */
>
  <span  style={{height:state?'1.5px':'2px'}}></span>
  <span style={{height:state?'1.5px':'3px'}}></span>
</div>

  )
}
