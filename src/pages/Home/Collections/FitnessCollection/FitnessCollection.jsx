import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import './FitnessCollection.css'
import ScalingTextAnimation from '../../../../components/ScalingTextAnimation/ScalingTextAnimation';


export default function FitnessCollection() {




const [isOpen, setIsOpen] = useState(false);

// 1. Store your videos in an array
const videoFiles = [
 {id:0,videoSrc:'/HomeCollections/Fitness-Video3.mp4', color:'rgb(255, 224, 0)',img:'/WeightImg4.jpg'},
 {id:1,videoSrc:'/HomeCollections/Fitness-Video4.mp4', color:'rgb(183, 110, 255)',img:'/YogaMatImg2.jpg'},
 {id:2,videoSrc:'/HomeCollections/Fitness-Video5.mp4', color:'rgb( 247, 187, 206 )',img:'/MachineImg1.jpg'}
 
];

const FitnessProducts = [
  {id:0,title:'Dumbell',brand:'Gornation',price:45, img1:'/Fitness-Dumbell2.jpg',img2:'/Fitness-Dumbell3.jpg'},
  
      {id:1,title:'Yoga Pants',brand:'Cambivo',price:20, img1:'/Fitness-Yogamat2.jpg',img2:'/Fitness-Yogamat1.jpg'},
        {id:2,title:'Running Shoe',brand:'Nike',price:130, img1:'/Fitness-Shoes5.jpg',img2:'/Fitness-Shoes4.jpg'},
  {id:3,title:'Tredmill',brand:'Tychnogym',price:1200, img1:'/Fitness-WalkingPad3.jpg',img2:'/Fitness-WalkingPad1.webp'},
  
]


const [hoveredIndex, setHoveredIndex] = useState(null);

// 2. Track the index instead of the string
const [videoIndex, setVideoIndex] = useState(0);

useEffect(() => {



  const delay = isOpen ? 8000 : 4000;
  
  const timeoutId = setTimeout(() => {
    setIsOpen((prev) => {
      const nextState = !prev;
      
      // 3. Increment index only when expanding (false -> true)
      if (nextState === true) {
        setVideoIndex((prevIndex) => (prevIndex + 1) % videoFiles.length);
      }
      
      return nextState;
    });
  }, delay);

  return () => clearTimeout(timeoutId);
}, [isOpen]);
 

const banners = new Array(1).fill(null);
const loopBanners = [...banners, ...banners];







  return (
    <div className='Fitness-Collection-wrapper'>
     <div className="fitness-container" style={{backgroundImage:`url(HomeCollections/${videoFiles[videoIndex].img})`}}>
     <div className={`fitness-video-wrapper ${isOpen ? 'fitness-video-expanded' : ''}`}>
      <video 
       key={videoFiles[videoIndex].id} // Forces re-render to start the new video immediately
       className="fitness-video-content"
       src={videoFiles[videoIndex].videoSrc} 
       autoPlay 
       loop 
       muted 
       playsInline
     />
     <div className='video-text-wrapper'>
       <span className='fitness-head-2'>Train Smarter. Grow Stronger.</span>
      <span className='fitness-head-1'>The Fitness Hub</span>
     <div className='fitness-btn'>Explore More</div>
     </div>
     </div>
      <div className="banners-viewport">  
         <div className="banners-wrapper">
           {loopBanners.map((_, index) => (
             <div
               key={index}
               className={`fitness-banner-wrapper ${isOpen ? 'fitness-active' : ''}`}
               
             >
          <div className="banner-inner">
     
               <div className="fitness-banner-part fitness-top"
               style={{background:videoFiles[videoIndex].color}} >
                 <div className="fitness-content">
                   
                         <ScalingTextAnimation word='Equip Your Grind'/>   
                          
     
                 </div>
               </div>
     
               <div className="fitness-banner-part fitness-bottom"
                style={{background:videoFiles[videoIndex].color}} > {/* 247, 187, 206 */} {/* 183, 110, 255 */}
                 <div className="fitness-content">
                         <ScalingTextAnimation word='Equip Your Grind'/>  
                        
                 </div>
               </div>
     </div>
             </div>
           ))}
         </div>
       </div>
       
     
           
                    
         </div> 

         <div className='collection-product-wrapper'>   
   <div  id='home-product-head'>Fitness Hub Collection</div>

         <div className='home-Products-container'>
     {FitnessProducts.map((product,index)=>
     <div className='collection-ProductCard'
      onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
     >
        <div className="collection-ProductImg-wrapper"
        
        style={{ 
          backgroundImage: `url(HomeCollections/FitnessImages/${hoveredIndex === index ? product.img2 : product.img1})` 
        }}>

        </div>
        <div className="collection-ProductInfo-wrapper">
            <div className="collection-Info-line1">
                <span >{product.title}</span>
                <span >${product.price}</span>
            </div>
            <div className='collection-brandname'>{product.brand}</div>
        </div>

     </div>)}
    </div>
    </div>
    </div>
  )
}











