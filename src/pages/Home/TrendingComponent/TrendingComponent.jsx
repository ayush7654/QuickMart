import React from 'react'
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline'
import { motion } from 'framer-motion';
import { slideUpVariants } from '../../../components/AnimationVariants';
import './TrendingComponent.css'
export default function TrendingComponent() {

const wrapperVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 0.2s delay between each child
    }
  }
};

const variants = {
  hidden: { y: 70, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 

    // You can put the transition here if you want it tied to this specific state
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

  return (
      <div className="trending-products-div">
             <div className='home-heading'>The Wardrobe Overhaul Series</div>

<motion.div className="trend-container"
variants={wrapperVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}>

  <motion.div
    id="trend-div"
    className="trend-div1"
   variants={variants}
 

  >

    <div id="trend-name-div">
      <AnimatedUnderline color="white" from="center" offset={5} thickness={2}>
        <div id="trend-name">MEN</div>
      </AnimatedUnderline>
    </div>
  </motion.div>


  <motion.div
    id="trend-div"
    className="trend-div2"
    variants={variants}

  >

    <div id="trend-name-div">
      <AnimatedUnderline color="white" from="center" offset={5} thickness={2}>
        <div id="trend-name">WOMEN</div>
      </AnimatedUnderline>
    </div>
  </motion.div>

    <motion.div
    id="trend-div"
    className="trend-div3"
   

 

  >

    <div id="trend-name-div">
      <AnimatedUnderline color="white" from="center" offset={5} thickness={2}>
        <div id="trend-name">HOT TRENDS</div>
      </AnimatedUnderline>
    </div>
  </motion.div>

     <motion.div
    id="trend-div"
    className="trend-div4"
  

  >

    <div id="trend-name-div">
      <AnimatedUnderline color="white" from="center" offset={5} thickness={2}>
        <div id="trend-name">ACTIVE GEARS</div>
      </AnimatedUnderline>
    </div>
  </motion.div>
</motion.div>
        </div>
  )
}


   {/* <div  className="home-head-div">
                <div className="home-head-content"> 
                  <div className='home-head'>YEAR OF STYLE</div>
                </div>  
              </div> */}

        
         {/*  <div className="trending-products">
            <div id='trending-product-div'> 
              <div id='trending-product'  className="trending-product-1">
                <span id ='tp-btn' className="tp-1-btn">SUMMER COLLECTION</span>
              </div>
            </div>
            <div id='trending-product-div'>
              <div id='trending-product' className="trending-product-2">
                <span id ='tp-btn' className="tp-2-btn">WINTER COLLECTION</span>
              </div>
            </div>


          </div> */}