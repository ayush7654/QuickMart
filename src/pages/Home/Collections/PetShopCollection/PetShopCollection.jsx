import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import './PetShopCollection.css'
import { motion, useScroll, useTransform ,useSpring} from 'framer-motion';



 const arcItems = 
  [
 /*  {id:0,img:'DogFood2.png',scale:.7}, */
  {id:1,img:'DogFood5.png',scale:.7},
  {id:2,img:'DogFood6.png',scale:.85},
  {id:3,img:'DogFood4.png',scale:1},
]


const DogFood =[
  {id:0,title:'Wet Dog Food Pack',img1:'PetFood1Img1.webp',img2:'PetFood1Img2.webp',price:'£36.65',brand:'Superfoods'},
  {id:1,title:'Salmon And Chicken ',img1:'PetFood5Img1.webp',img2:'PetFood5Img2.jpg',price:'£19.07',brand:'Harringtons'},
  {id:2,title:'Baked Salmon Fish Bites',img1:'PetFood3Img1.webp',img2:'PetFood2Img2.webp',price:'£14.32',brand:'FreshBakes'},
  {id:3,title:'Lamb And Chicken',img1:'PetFood4Img1.webp',img2:'PetFood4Img2.webp',price:'£14.00',brand:'Harringtons'},
]

 

export default function PetShopCollection() {




/*  const arcItemRef = useRef(null);

 const sectionRef = useRef(null);

const { scrollYProgress } = useScroll({
  target: sectionRef,

  offset: ["start end", "start start"] 
});

const translateYUp = useTransform(scrollYProgress,[0,1],["100%", "0%"]);
 */


/* 
useEffect(() => {
  gsap.fromTo(
    ".arc-item",
    {
      scale: .4,
      opacity:.8,
      rotate: 0,
      transformOrigin: "center center",
      
    },
    {
      scale: 1,
      opacity:1,
      rotate: 40,
      ease: "none",
      stagger: 0.15, 
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    }
  );
}, []); */

  const PetProducts=[
    {title:'Cyclone Dog Jacket',img1:'SamplePetImg5.jpg',img2:'SamplePetImg2.jpg',price:'95',brand:'Cyclone'},

    {title:'Bigfoot Dog Jacket',img1:'SamplePetImg12.jpg',img2:'SamplePetImg13.jpg',price:'75',brand:'Bigfoot'},
    {title:'Cyclone Dog Jacket',img1:'SamplePetImg6.jpg',img2:'SamplePetImg7.jpg',price:'95',brand:'Cyclone'},
        {title:'Proshell Dog Jacket',img1:'SamplePetImg8.jpg',img2:'SamplePetImg9.jpg',price:'89',brand:'Proshell'},
]

const [hoveredIndex, setHoveredIndex] = useState(null);

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Creates the slight delay between lines
    },
  },
};

const childVariants = {
  hidden: { y: "100%" }, // Start hidden below the mask
  visible: {
    y: 0, // Slide into view
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Your smooth Apple-style curve
    },
  },
};

  return (
    <div className="PetShop-collection-wapper">
    <div className="PetShop-collection"  >
 
   
<div className='pet-section'>
   
<div className="pet-left-wrapper">

 <motion.div 
  className="pet-store-head"
  variants={parentVariants}
  initial="hidden"
  whileInView="visible"
 viewport={{ once: true, amount: 0.8 }}
>
  <div className="clip-mask">
    <motion.div variants={childVariants}>Everything Your Pet</motion.div>
  </div>
  
  <div className="clip-mask">
    <motion.div variants={childVariants}>Needs Care , Play & Love</motion.div>
  </div>
  
  <div className="clip-mask">
    <motion.div variants={childVariants}>in One Place</motion.div>
  </div>
</motion.div>
  <div className="pet-store-subhead">
   <div>Premium pet care products , fun exercise essentials, and </div>
   <div>healthy lifestyle solutions designed for happy pets</div>
   <div>and stress-free pet parents.</div>
  </div>
  <div className='pet-store-btn-wrapper'>
    <div className='pet-store-btn pet-shop-btn'>Shop Now</div>
    <div className='pet-store-btn'>Explore Pet Care</div>
  </div>
  




</div>
<div className="pet-Food-wrapper">
  {DogFood.map((item,index)=>
  <div className='pet-product' 
   onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}>
  <div className='pet-food-img-wrapper' >
   <img src={`HomeCollections/PetCareImages/${item.img1}`}/>
   <div className='pet-product-bg-wrapper'
   style={{backgroundImage:`url(HomeCollections/PetCareImages/${item.img2})`}}
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
     <div className='collection-product-wrapper'>   
   <div  id='home-product-head'>Pet Shop Collection</div>
 
         <div className='home-Products-container'>
     {PetProducts.map((product,index)=>
     <div className='collection-ProductCard'
      onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
     >
        <div className="collection-ProductImg-wrapper"
        
        style={{ 
          backgroundImage: `url(HomeCollections/PetCareImages/${hoveredIndex === index ? product.img2 : product.img1})` 
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
