import React from 'react'
import './Collections.css'
import StackingEffect from './StackingEffect/StackingEffect';
import FitnessCollection from './FitnessCollection/FitnessCollection';
import SolarCollection from './SolarCollection/SolarCollection';
import PetShopCollection from './PetShopCollection/PetShopCollection';
export default function Collections() {




  return (
     <div className="collections-wrapper">

           <div className='collection-head'>Collections Curated For You. </div> 

      <FitnessCollection/>

      <SolarCollection/>

      <PetShopCollection/>

      

               {/*  <StackingEffect/> */}
             </div>
  )
}



