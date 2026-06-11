import React from 'react'
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline'
import { motion } from 'framer-motion';


import './TrendingComponent.css'
import ScrollButton from './../../../components/ScrollingButton/ScrollingButton';
export default function TrendingComponent() {


  const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each child animating
    },
  },
};

// 2. Define the animation variants for each child element
const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};


   const clothingTrends = [
    {img:'Men-clothing2.jpg',category:'Men',title:'Effortless Style. Engineered for Men.',description:'From sharp, tailored classics to laid-back weekend essentials, discover premium wardrobe staples designed for maximum comfort and an impeccable fit.'},
    {img:'Women-clothing.jpg',category:'Women',title:'Define Your Style. Own Your Power.',description:'Explore a curated collection of contemporary fashion, elegant silhouettes, and everyday essentials crafted to make you look and feel unforgettable wherever you go.'},
    {img:'Hot-Trends2.jpg',category:'Hot Trends',title:'Ahead of the Curve. Right Now.',description:'Don’t just follow the trends—set them. Dive into our freshest, most sought-after drop of viral styles and statement pieces straight from the fashion frontline.'},
    {img:'ActiveGear2.jpg',category:'Active Gears',title:'Built to Move. Driven to Perform.',description:"Whether you're crushing miles on the bike, diving into open waters, or hitting the gym, our high-performance athletic apparel delivers the ultimate blend of breathability, stretch, and endurance."},
   ]

  return (
      <div className="trending-products-div">
             <div className='home-heading clothing-trend-head'>The Wardrobe Overhaul Series</div>
<div className="clothingTrendsWrapper">

    {clothingTrends.map((trend,index)=>
     <div className="clothing-trend" style={{flexDirection:index%2===0?'row':'row-reverse'}}>
      
      <div className="trend-img-wrapper">
        <img src={`/FashionTrend/${trend.img}`}/>
      </div>
    <motion.div 
    className="trend-info"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }} 
  >
    <motion.span className="trend-tag" variants={itemVariants}>
      {trend.category}
    </motion.span>
    
    <motion.h2 variants={itemVariants}>
      {trend.title}
    </motion.h2>
    
    <motion.p variants={itemVariants}>
      {trend.description}
    </motion.p>

    {/* Added a subtle hover micro-interaction to your button */}
    <motion.div 
      className="fashion-trend-btn" 
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
     
      <ScrollButton text={' Shop Now '}/>
        {/* <span className="arrow" >→</span> */}
    </motion.div>
  </motion.div>

     </div>
    )}
  </div>


        </div>
  )
}

