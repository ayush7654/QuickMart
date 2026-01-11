import  {useState} from 'react';
 import { ChevronLeft,ChevronRight } from 'lucide-react'; 
import { Link } from "react-router-dom";
import ScrollMouse from '../../../components/ScrollMouse/ScrollMouse';
import BracketButton from '../../../components/BracketButton/BracketButton';
 import './ImgCarousel.css';


export default function ImgCrousel() {

  
const homeBGs = [
     { id: 0,  img1: 'ImageCrousel/IC-Fashion4.webp',img2:'BG-Images-sm/fashion-sm.webp', product: './store/84'  },
     { id: 1, img1: 'ImageCrousel/IC-Watch.webp',img2:'BG-Images-sm/Rolex10.jpg', product: './store/98' },
    { id: 2, img1: 'ImageCrousel/IC-Shoes.webp',img2:'BG-Images-sm/Nike14.jpg', product: './store/88' },
    { id: 3, img1: 'ImageCrousel/IC-Apple.jpg',img2:'BG-Images-sm/IC-Apple-sm.avif', product: './store/123' }
   
  ];

  const [currentBGImg,setCurrentBGImg]= useState(0);
  const[currentPath,setCurrentPath]= useState('./store/123');
  
  const [transition,setTransition]= useState(true);


  return (
   <div className="ImageCrousel-Container">
      {/*   <ScrollMouse/> */}
            <div className="Nav-div">
              <ChevronLeft onClick={() =>setCurrentBGImg(prev => (prev > 0 ? prev - 1 : prev))} className="home-left-arrow" id='nav-arrow' strokeWidth={.5} absoluteStrokeWidth />
              <ChevronRight onClick={() =>setCurrentBGImg(prev => (prev < homeBGs.length - 1 ? prev + 1 : prev))} className="home-right-arrow" id='nav-arrow' strokeWidth={.5} absoluteStrokeWidth />
            </div>
         {homeBGs.map(bg => (
  <div key={bg.id} className="homeCrousal">
    <div
      className="homeContent"
      style={{
        transform: `translateX(-${currentBGImg * 100}vw)`,
        transition: transition ? 'transform 2000ms ease-in-out' : 'none'
      }}
    >
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
          <div className="CrousalNav-content">{homeBGs.map(nav=><div onClick={()=>setCurrentBGImg(nav.id)} className={nav.id===currentBGImg?"CrousalNav-selected":"CrousalNav"}></div>) }</div>
         </div>

        </div>
  )
}
