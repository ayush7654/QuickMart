
import React, { useState, useRef, useEffect } from 'react';


 import "./Testing.css";
import { div } from 'framer-motion/client';





export default function Testing() {


const homeImgs =['hp-airpod.jpg', 'hp-watch.jpg','BluePrada.jpg','hp-chanel.jpg'/* ,'hp-chanel.jpg' */]


  
  
  return (
<div className="testing-div"  >
 <div className="home-img-head">
  Fresh Drops
  <span className="home-img-tagline">Check out what's latest.</span>
 </div>
<div className="home-img-wrapper">
  {homeImgs.map((item,index)=><div className='home-img'>
  <img src={`Home-products-img/${item}`}/>
</div>)}
</div>



 </div>





  );

  



}
