import React from 'react'
import './Collections.css'
import StackingEffect from './StackingEffect/StackingEffect';
import FitnessCollection from './FitnessCollection/FitnessCollection';
import SolarCollection from './SolarCollection/SolarCollection';
import PetShopCollection from './PetShopCollection/PetShopCollection';
import { motion } from "framer-motion";
export default function Collections() {


const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};


  return (
     <div className="collections-wrapper">

           <div id='home-section-head'>
            Collections Curated For You.
           
            
             </div> 
           <div className="head-dot-wrapper">
      <span className="head-dot red"></span>
      <span className="head-dot blue" ></span>
      <span className="head-dot green"></span>
    
    </div>
     

      <FitnessCollection productAnimation={containerVariants}/>

       <SolarCollection productAnimation={containerVariants}/> 

      <PetShopCollection productAnimation={containerVariants}/>

      

               {/*  <StackingEffect/> */}
             </div>
  )
}



