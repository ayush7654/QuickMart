import React from 'react'
import './Collections.css'
import StackingEffect from './StackingEffect/StackingEffect';
import FitnessCollection from './FitnessCollection/FitnessCollection';
import SolarCollection from './SolarCollection/SolarCollection';
export default function Collections() {




  return (
     <div className="collections-wrapper">

           <div className='collection-head'>The 2026 Lifestyle Trilogy</div> 

      <FitnessCollection/>

      <SolarCollection/>

               {/*  <StackingEffect/> */}
             </div>
  )
}



