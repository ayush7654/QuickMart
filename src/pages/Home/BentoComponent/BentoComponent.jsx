import {useState} from 'react'

 import { ChevronLeft,ChevronRight } from 'lucide-react'; 
import './BentoComponent.css'
export default function BentoComponent() {

  const categoryImgs=[
    {img:'/QMbgImages/QM-bento-decor.jpg',name:'HOME DECOR',path1:'',path2:''},
      {img:'/QMbgImages/QM-bento-sports.jpg',name:'SPORTS',path1:'',path2:''},
     {img:'/QMbgImages/QM-Watches.webp',name:'WATCHES',path1:'',path2:''},
     {img:'/QMbgImages/QM-bento-shoes.jpg',name:'FOOTWEAR',path1:'',path2:''},
    {img:'/QMbgImages/QM-bento-electronics.jpg',name:'ELECTRONICS',path1:'',path2:''},
    {img:'/QMbgImages/QM-HP-Style3.jpg',name:'STYLE',path1:'',path2:''},
   
   
   
    {img:'/QMbgImages/QM-bento-shades.jpg',name:'SHADES',path1:'',path2:''},
    
    {img:'/QMbgImages/QM-bento-essentials.jpg',name:'ESSENTIALS',path1:'',path2:''},
    {img:'/QMbgImages/QM-HP-Skincare.jpg',name:'SKINCARE',path1:'',path2:''}
  ]

  const [categoryNav,setCategoryNav] = useState(0);
  return (
     <div className='bento-div' >
        
    <div className="bento-heading-div" ><div className='bento-heading'>Featured Categories -<span className="bento-tagline">&nbsp;Find What You Love</span> </div></div>

<div className="bento-container-div">
    <div className="bento-container-nav-div">
{categoryNav>0?  <ChevronLeft onClick={() => setCategoryNav(prev => (prev > 0 ? prev - 1 : prev) )}
 className="bento-left"  strokeWidth={1.2} absoluteStrokeWidth />:<div></div>}
  {categoryNav<6?     <ChevronRight   onClick={() => setCategoryNav(prev => (prev < 6 ? prev + 1 : prev))}
 className="bento-right"  strokeWidth={1.2} absoluteStrokeWidth />:<div></div>}
    </div>
  <div style={{width:'100%', display:'flex'}}>

   <div style={{ transform: `translateX(-${390*categoryNav}px`}}  className="bento-container">{categoryImgs.map(card=><div  id='card-bento' style={{ backgroundImage: `url(${card.img})`}}>
    <div id='card-bento-name'>{card.name} {'>'}</div>
    <div id ='bento-btn-div' className="bento1-a-btn"><div id='bento-btn1'>Explore</div><div  id='bento-btn2'>Shop Now</div></div> 

  
   </div>)}</div> 

  </div>
</div>

      </div>
  )
}
