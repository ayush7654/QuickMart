import {useState,useEffect} from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'

export default function CarouselComponent({Imagelist}) {
  
  const [ImgId,setImgId]= useState(0)

  const handleSlide=(direction)=>{
    
    if(ImgId>0 || ImgId<Imagelist.length-1){
      setImgId(prev=>{
        if(direction==='left' && prev>0){
           return prev-1;
        }else if(direction==='right' && prev<Imagelist.length-1){
          return prev+1;
        }else{
          return prev;
        }
      })
    }
    }
   
  const handleClick=(id)=>{
    setImgId(id)
  }

 
 
  
  return (
    <>
    <div className="carousel-div">
      <div className="carousel-sub-div">
      <button className='leftArrow'  onClick={()=>handleSlide('left')} ><div><ChevronLeft  size={40}/></div></button>
      <div className='ImageBox'>  
       {Imagelist.map((img,index)=>  // We render all the images together side by side.
       <img 
       className='currentImage'
       key={index} 
       src={img}
       style={{translate:`${-ImgId*600}px`}} //This property moves the image outside of the image box to a distance equal to its length.
       width="600px"/>)}
      </div>
      <button className='rightArrow'  onClick={()=>handleSlide('right')} ><div><ChevronRight size={40}/></div></button>
      </div>
      <div className="ImgSelecters">
      {Imagelist.map((item,index)=><div id={index} onClick={()=>handleClick(index)} className={ImgId===index?"imgBtn-clicked":'imgBtn'} key={index}></div>)}
    </div>
    </div>
   
    </>
  )
}
