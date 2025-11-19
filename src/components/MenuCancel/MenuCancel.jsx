import React, {useState} from 'react'
import './MenuCancel.css'

export default function MenuCancel() {

    const [open, setOpen] = useState(false);

  return (
    <div
  className={`menu-btn ${open ? "open" : ""}`}
    onMouseEnter={() => setOpen(true)}
  onMouseLeave={() => setOpen(false)}
>
  <span></span>
  <span></span>
</div>

  )
}
