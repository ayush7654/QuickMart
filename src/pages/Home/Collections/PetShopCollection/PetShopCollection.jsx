import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import './PetShopCollection.css'
import { motion, useScroll, useTransform ,useSpring} from 'framer-motion';



 const arcItems = 
  [
  {id:0,img:'DogFood2.png',scale:.7},
  {id:1,img:'DogFood5.png',scale:.8},
  {id:2,img:'DogFood6.png',scale:.9},
  {id:3,img:'DogFood4.png',scale:1},
]


const PetProducts =[
  {id:0,title:'Wet Dog Food Pack',img1:'PetFood1Img1.webp',img2:'PetFood2Img2.webp',price:'£36.65',brand:'Superfoods'},
  {id:1,title:'Salmon And Chicken ',img1:'PetFood5Img1.webp',img2:'PetFood5Img2.jpg',price:'£19.07',brand:'Harringtons'},
  {id:2,title:'Baked Salmon Fish Bites',img1:'PetFood3Img1.webp',img2:'PetFood1Img2.webp',price:'£14.32',brand:'FreshBakes'},
  {id:3,title:'Lamb And Chicken',img1:'PetFood4Img1.webp',img2:'PetFood4Img2.webp',price:'£14.00',brand:'Harringtons'},
]

 

export default function PetShopCollection() {




 const arcRef = useRef(null);

 const sectionRef = useRef(null);

const { scrollYProgress } = useScroll({
  target: sectionRef,
  // "start end" = top of div enters bottom of viewport
  // "start start" = top of div reaches top of viewport
  offset: ["start end", "start start"] 
});

const translateYUp = useTransform(scrollYProgress,[0,1],["100%", "0%"]);

useEffect(() => {
  gsap.to(arcRef.current, {
    rotate: 90,
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.current, // ✅ bigger area
      start: "top center",
      end: "bottom center", // smoother range
      scrub: 1, // 🔥 smoothing (not true)
      invalidateOnRefresh: true,
    },
  });
}, []);

  const SolarProducts=[
    {title:' Yellow Knitted Sweater',img1:'PetImg62.jpg',img2:'PetImg64.jpg',price:'10',brand:'CHBORCHICEN'},
    {title:'Blue Leather Jacket',img1:'PetImg56.jpg',img2:'PetImg57.webp',price:'70',brand:'Lulala'},
    {title:'Dog Harness',img1:'PetImg59.webp',img2:'PetImg58.webp',price:'200',brand:'Ruffwear'},
    {title:'Red Rolling Toy',img1:'PetImg65.webp',img2:'PetImg66.jpg',price:'100',brand:'Dogtown'},
]

const [hoveredIndex, setHoveredIndex] = useState(null);



  return (
    <div className="PetShop-collection-wapper">
    <div className="PetShop-collection"  >
 
   
<div className='pet-section' ref={sectionRef}>
        <motion.img /* style={{y:translateYUp}} */ className='dog-main' src='HomeCollections/PetMainImg2.png'/>
<div className="pet-products-wrapper">
    
  <div className='pet-png-wrapper'>
    <img src='HomeCollections/Dog-paws-Img.png'/>
  </div>

  <div className='petShop-head'>Pet Shop</div>
<div className="arc-container">
      <div className="arc" ref={arcRef}>
        {arcItems.map((item, i) => (
          <div className="arc-item" key={i} style={{ "--i": i}} >
           <img src={`HomeCollections/${item.img}`} style={{transform:`scale(${item.scale})`}}/>
          </div>
        ))}
      </div>


    </div>
</div>
<div className="pet-preview-wrapper">
  {PetProducts.map((item,index)=>
  <div className='pet-product' 
   onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}>
  <div className='pet-food-img-wrapper' >
   <img src={`HomeCollections/${item.img1}`}/>
   <div className='pet-product-bg-wrapper'
   style={{backgroundImage:`url(HomeCollections/${item.img2})`}}
   ></div>
  </div>
  <div className='pet-food-Info-wrapper'>
  <div className="pet-info-line1">
    <span>{item.title}</span>
    <span>{item.price}</span>
  </div>
  <div className="pet-food-brand">{item.brand}</div>
  </div>
  </div>)}
</div>
</div>


    </div>
      <div className='solar-product-wrapper'>   
   <div className='solarpack-products-head' id='home-product-head'>PetShop Collection</div>
   <div className='home-Products-container'>
     {SolarProducts.map((product,index)=>
     <div className='solar-ProductCard'
      onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
     >
        <div className="solarProductImg-wrapper pet-product-img"
        
        style={{ 
          backgroundImage: `url(HomeCollections/${hoveredIndex === index ? product.img1 : product.img2})` 
        }}>

        </div>
        <div className="solarProductInfo-wrapper">
            <div className="solarInfo-line1">
                <span >{product.title}</span>
                <span >${product.price}</span>
            </div>
            <div className='solarProduct-brandname'>{product.brand}</div>
        </div>

     </div>)}
    </div>
    </div>
    </div>
      
  )
}
