import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import './PetShopCollection.css'
import { motion, useScroll, useTransform ,useSpring} from 'framer-motion';
import CollectionProduct from '../CollectionProduct/CollectionProduct';
import ScrollButton from '../../../../components/ScrollingButton/ScrollingButton';





 // 1. Controls the staggered entry timing for all children inside
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each element's animation
        delayChildren: 0.1,    // Initial delay before the sequence starts
      },
    },
  };

  // 2. The motion properties for each line of text and group
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 100 
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

export default function PetShopCollection({productAnimation}) {


  const PetProducts=[
    {title:'Cyclone Dog Jacket',img1:'SamplePetImg5.jpg',img2:'SamplePetImg2.jpg',price:'95',brand:'Cyclone'},

    {title:'Bigfoot Dog Jacket',img1:'SamplePetImg12.jpg',img2:'SamplePetImg13.jpg',price:'75',brand:'Bigfoot'},
    {title:'Cyclone Dog Jacket',img1:'SamplePetImg6.jpg',img2:'SamplePetImg7.jpg',price:'95',brand:'Cyclone'},
        {title:'Proshell Dog Jacket',img1:'SamplePetImg8.jpg',img2:'SamplePetImg9.jpg',price:'89',brand:'Proshell'},
]

const [hoveredIndex, setHoveredIndex] = useState(null);



  return (
    <div className="PetShop-collection-wapper">
    <div className="PetShop-collection">
 
   <div className="pet-collection-info">
      <div className="pet-store-head">
      Everything your pet needs in one place.
       </div>
      <div className="pet-store-subhead">
        Premium pet care products , fun exercise essentials, and healthy lifestyle solutions designed for happy pets and stress-free pet parents.
    </div>

    
      <div className='home-shop-btn' >
       <ScrollButton text={' Shop Now '}/>
   
      </div>

    </div>

    <motion.div className="pet-UI-graphics"
   variants={containerVariants}
      initial="hidden"
      whileInView="visible" 
      viewport={{ once: true, amount: 0.4 }}  >

      <motion.div 
      variants={itemVariants}
      className="pet-column pet-column-1">
          <img src="PetBed.jpg" alt="" />
      </motion.div>
      <motion.div
      variants={itemVariants}
      className="pet-column pet-column-2">
             <img src="cat5.jpg" alt="" />
      </motion.div>
      <motion.div 
      variants={itemVariants}
      className="pet-column pet-column-3">
        <img src="PetFood8.jpg" alt="" />
      </motion.div>
    </motion.div> 
   
    

    </div>
     <div className='collection-product-wrapper'>   
   <div  id='home-head-wrapper'>
    Pet Shop 
   <span id='home-head-tagline'>Quality care for your companions.</span>
    </div>
 
         <motion.div className='collection-Products-container'
          variants={productAnimation}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}>
     {PetProducts.map((product,index)=>
      <CollectionProduct 
          key={index}
          setHoveredIndex={setHoveredIndex}
          hoveredIndex={hoveredIndex}
          product={product}
          index={index}
          imgPath='PetCareImages'/>)}
    </motion.div>
    </div>

    
    </div>
      
  )
}
