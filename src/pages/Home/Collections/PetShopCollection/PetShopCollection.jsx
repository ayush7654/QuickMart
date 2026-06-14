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

 // 1. Controls the staggered entry timing for all children inside
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Delay between each element's animation
        delayChildren: 0.1,    // Initial delay before the sequence starts
      },
    },
  };

  // 2. The motion properties for each line of text and group
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 65, 
        damping: 14 
      },
    },
  };

export default function PetShopCollection() {


  const PetProducts=[
    {title:'Cyclone Dog Jacket',img1:'SamplePetImg5.jpg',img2:'SamplePetImg2.jpg',price:'95',brand:'Cyclone'},

    {title:'Bigfoot Dog Jacket',img1:'SamplePetImg12.jpg',img2:'SamplePetImg13.jpg',price:'75',brand:'Bigfoot'},
    {title:'Cyclone Dog Jacket',img1:'SamplePetImg6.jpg',img2:'SamplePetImg7.jpg',price:'95',brand:'Cyclone'},
        {title:'Proshell Dog Jacket',img1:'SamplePetImg8.jpg',img2:'SamplePetImg9.jpg',price:'89',brand:'Proshell'},
]

const [hoveredIndex, setHoveredIndex] = useState(null);



  return (
    <div className="PetShop-collection-wapper">
    <div className="PetShop-collection"  >
 
   
<div className='pet-section'
>
   
<motion.div 
      className="pet-left-wrapper"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Animates automatically when scrolled into view
      viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of the section is visible
    >
      {/* --- Heading Lines --- */}
      <div className="pet-store-head">
        <div className="clip-mask">
          <motion.div variants={itemVariants}>Everything Your Pet</motion.div>
        </div>
        
        <div className="clip-mask">
          <motion.div variants={itemVariants}>Needs Care , Play & Love</motion.div>
        </div>
        
        <div className="clip-mask">
          <motion.div variants={itemVariants}>in One Place</motion.div>
        </div>
      </div>

      {/* --- Subheading Lines --- */}
      <div className="pet-store-subhead">
        <div className="clip-mask-sub">
          <motion.div variants={itemVariants}>Premium pet care products , fun exercise essentials, and</motion.div>
        </div>
        <div className="clip-mask-sub">
          <motion.div variants={itemVariants}>healthy lifestyle solutions designed for happy pets</motion.div>
        </div>
        <div className="clip-mask-sub">
          <motion.div variants={itemVariants}>and stress-free pet parents.</motion.div>
        </div>
      </div>

      {/* --- Buttons --- */}
      <motion.div className='pet-store-btn-wrapper' variants={itemVariants}>
        <motion.div 
          className='pet-store-btn pet-shop-btn'
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Shop Now
        </motion.div>
        <motion.div 
          className='pet-store-btn'
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Explore Pet Care
        </motion.div>
      </motion.div>

    </motion.div>



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
