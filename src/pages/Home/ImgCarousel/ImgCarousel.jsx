import  {useState} from 'react';
 import { ChevronLeft,ChevronRight } from 'lucide-react'; 
import { Link } from "react-router-dom";
import ScrollMouse from '../../../components/ScrollMouse/ScrollMouse';
import BracketButton from '../../../components/BracketButton/BracketButton';
 import './ImgCarousel.css';


export default function ImgCrousel() {

  
const homeBGs = [
     { id: 0,  img1: 'ImageCrousel/IC-Fashion3.jpg',img2:'BG-Images-sm/fashion-sm.webp', product: './store/84', content:<>Discover the <span>hottest</span> brands. </> , info:'From rising labels to established favorites, discover the hottest brands shaping today’s market. Our selection is constantly updated so you never miss what’s new and in demand.'  },
     { id: 1, img1: 'ImageCrousel/IC-Watch.webp',img2:'BG-Images-sm/Rolex10.jpg', product: './store/98',content:<>Browse <span>millions</span> of products. </> ,info:'Browse millions of products carefully organized to help you find exactly what you’re looking for. With detailed listings and smart navigation, discovering the right product feels effortless.' },
    { id: 2, img1: 'ImageCrousel/IC-Shoes.webp',img2:'BG-Images-sm/Nike14.jpg', product: './store/88',content:<>Find the <span>best</span> prices. </>, info:'Compare products easily and discover competitive pricing across our entire collection. We help you find great value without compromising on quality, so you can shop smarter every time.' },
    { id: 3, img1: 'ImageCrousel/IC-Apple.jpg',img2:'BG-Images-sm/IC-Apple-sm.avif', product: './store/123',content:<>Stay ahead with <span>latest</span> trends. </> , info:'Discover the latest trends as they emerge, with new products and styles added regularly. We keep our collection fresh so you can stay ahead of what’s popular and relevant.'}
   
  ];

  const [currentBGImg,setCurrentBGImg]= useState(0);
  const[currentPath,setCurrentPath]= useState('./store/123');
  
  const [transition,setTransition]= useState(true);


  return (
   <div className="ImageCrousel-Container">

         {homeBGs.map(bg => (
  <div key={bg.id} className="homeCrousal">
    <div
      className="homeContent"
      style={{
        transform: `translateX(-${currentBGImg * 100}vw)`,
        transition: transition ? 'transform 2000ms ease-in-out' : 'none'
      }}
    >
      <div className='crousel-content'>
        <div className='crousel-head'>{bg.content}</div>
        <div className='crousel-info'>{bg.info}</div>
        <div className='crousel-button'>Explore More</div>
        
      </div>
      
          <picture>
        {/* mobile image */}
        <source
          media="(max-width: 700px)"
          srcSet={bg.img2}
        />

        {/* desktop image (fallback) */}
        <img
          src={bg.img1}
          alt=""
          loading="eager"
        />
      </picture>
      
    
    </div>
  </div>
))}

<div  className="buy-link-div">
   <div  className="buy-link">
{/*   <Link id='buyLink-btn' className="btn-discoverMore">Discover More</Link>
  <Link id='buyLink-btn'  to={currentPath} className="btn-shopNow">Shop Now</Link> */}
        <BracketButton 
  height="35px" 
  width="200px" 
  bgColor="white" 
  color="#ffffffff" 
  hoverTextColor="black"
  textContent={'Discover More'} 
   hoverHeight='45px'
   fontSize='1rem'
  
/>

    <BracketButton 
  height="35px" 
  width="200px" 
  bgColor="white" 
  color="#ffffffff" 
  hoverTextColor="black"
  textContent={'Shop Now'} 
  hoverHeight='45px'
  
/>
</div> 

 <div className='buy-link-sm'>
<Link className='buy-btn-sm'> Shop Now</Link>
</div>
</div>


<div className="bgImgNav"><div className="bgImgNav-slider" style={{transform: transition?`translateX(${currentBGImg*100}%)`:`translateX(0%)`, transition:transition?'transform 2000ms ease-in-out':'none'}}></div></div>
       
         <div className="CrousalNav-div">
          <div className="CrousalNav-content">{homeBGs.map(nav=><div onClick={()=>setCurrentBGImg(nav.id)} className={`CrousalNav ${nav.id===currentBGImg?"CrousalNav-selected":''}`}></div>) }</div>
         </div>

        </div>
  )
}


   {/*   <ScrollMouse/> */}
            {/* <div className="Nav-div">
              <ChevronLeft onClick={() =>setCurrentBGImg(prev => (prev > 0 ? prev - 1 : prev))} className="home-left-arrow" id='nav-arrow' strokeWidth={.5} absoluteStrokeWidth />
              <ChevronRight onClick={() =>setCurrentBGImg(prev => (prev < homeBGs.length - 1 ? prev + 1 : prev))} className="home-right-arrow" id='nav-arrow' strokeWidth={.5} absoluteStrokeWidth />
            </div> */}