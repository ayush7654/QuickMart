import {useState} from 'react'

 import { ChevronLeft,ChevronRight } from 'lucide-react'; 
import './BentoComponent.css'
export default function BentoComponent() {

  const categoryImgs=[
    {img:'/QMbgImages/QM-bento-clothing.jpg',name:'Clothing',path1:'',path2:''},
     {img:'/QMbgImages/QM-bento-shoes2.jpg',name:'Footwear',path1:'',path2:''},
         {img:'/QMbgImages/QM-bento-sunglasses.jpg',name:'Shades',path1:'',path2:''},
     {img:'/QMbgImages/QM-bento-sports2.jpg',name:'Sports',path1:'',path2:''},
      
    {img:'/QMbgImages/QM-bento-decor.jpg',name:'Home Decor',path1:'',path2:''},
     {img:'/QMbgImages/QMElectronics.webp',name:'Electronics',path1:'',path2:''},
     
     {img:'/QMbgImages/QM-Watches.webp',name:'Watches',path1:'',path2:''},

    {img:'/QMbgImages/QM-bento-essentials.jpg',name:'Essentials',path1:'',path2:''},
    {img:'/QMbgImages/QM-HP-Skincare.jpg',name:'Skincare',path1:'',path2:''}
  ]

  const [categoryNav,setCategoryNav] = useState(0);
  return (
     <div className='bento-div' >
        
     <div className="home-head-div">
                <div className="home-head-content">
                  <div className='home-head'>Featured Categories.</div>
                  
                  <div className='home-head-tagline'>Find what you love.</div>
                </div>
              <div className='home-head-frame'></div>
              </div>

<div className="bento-container-div">
    <div className="bento-container-nav-div">
{categoryNav>0?  <ChevronLeft onClick={() => setCategoryNav(prev => (prev > 0 ? prev - 1 : prev) )}
 className="bento-left"  strokeWidth={1.2} absoluteStrokeWidth />:<div></div>}
  {categoryNav<6?     <ChevronRight   onClick={() => setCategoryNav(prev => (prev < 6 ? prev + 1 : prev))}
 className="bento-right"  strokeWidth={1.2} absoluteStrokeWidth />:<div></div>}
    </div>
  <div style={{width:'100%', display:'flex'}}>

   <div style={{ transform: `translateX(-${390*categoryNav}px`}}  className="bento-container">{categoryImgs.map(card=><div  id='card-bento' style={{ backgroundImage: `url(${card.img})`}}>
    <div id='card-bento-name'>{card.name} </div>
   

  
   </div>)}</div> 

  </div>
</div>

      </div>
  )
}
