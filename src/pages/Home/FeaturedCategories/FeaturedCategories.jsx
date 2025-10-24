import {useState} from 'react'

 import { ChevronLeft,ChevronRight } from 'lucide-react'; 
import './FeaturedCategories.css'
export default function FeaturedCategories() {

  const categoryImgs=[
    {img:'CategoriesImg/FC-Clothing.jpg',name:'Clothing',path1:'',path2:''},
     {img:'CategoriesImg/FC-Footwear.jpg',name:'Footwear',path1:'',path2:''},
      {img:'CategoriesImg/FC-HomeDecor.jpg',name:'Home Decor',path1:'',path2:''},
         {img:'CategoriesImg/FC-Shades.jpg',name:'Shades',path1:'',path2:''},
     {img:'CategoriesImg/FC-Sports.jpg',name:'Sports',path1:'',path2:''},
      
   
     {img:'CategoriesImg/FC-Electronics.webp',name:'Electronics',path1:'',path2:''},
     
     {img:'CategoriesImg/FC-Watches.webp',name:'Watches',path1:'',path2:''},

    {img:'CategoriesImg/FC-Essentials.jpg',name:'Essentials',path1:'',path2:''},
    {img:'CategoriesImg/FC-Skincare.jpg',name:'Skincare',path1:'',path2:''}
  ]

  const [categoryNav,setCategoryNav] = useState(0);

  const NavClicks = window.innerWidth>600? 6:8; 

  return (
     <div className='bento-div' >
        
     <div className="bento-head-div">
                   <div className='home-heading'>Explore Our Range</div>

              </div>

<div className="bento-container-div">
    <div className="bento-container-nav-div">
{categoryNav>0?  <ChevronLeft onClick={() => setCategoryNav(prev => (prev > 0 ? prev - 1 : prev) )}
 className="bento-left" id='bento-nav'  strokeWidth={1.2} absoluteStrokeWidth />:<div></div>}
  {categoryNav<NavClicks?     <ChevronRight   onClick={() => setCategoryNav(prev => (prev < NavClicks ? prev + 1 : prev))}
 className="bento-right" id='bento-nav' strokeWidth={1.2} absoluteStrokeWidth />:<div></div>}
    </div>
  <div style={{width:'100%', display:'flex'}}>

   <div style={{ transform: `translateX(-${
    window.innerWidth > 400 
      ? 390 * categoryNav 
      : window.innerWidth * categoryNav
  }px)`}}  className="bento-container">{categoryImgs.map(card=><div id='card-bento-div'><div  id='card-bento' style={{ backgroundImage: `url(${card.img})`}}>
    <div id='card-bento-name'>{card.name} </div>
   

  
   </div>
   </div>)}</div> 

  </div>
</div>

      </div>
  )
}
