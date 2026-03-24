import React from 'react'
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline'
import { motion } from 'framer-motion';
import './TrendingComponent.css'
export default function TrendingComponent() {
  return (
      <div className="trending-products-div">
             <div className='home-heading'>The Wardrobe Overhaul Series</div>

<div className="trend-container">
  {/* MEN SECTION: Comes from the LEFT */}
  <motion.div
    id="trend-div"
    className="trend-div1"
   initial={{ x: -70, opacity: 0 ,rotate: -5}}
    whileInView={{ x: 0, opacity: 1,rotate: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="trend-img1-div"></div>
    <div id="trend-name-div">
      <AnimatedUnderline color="white" from="center" offset={5} thickness={2}>
        <div id="trend-name">MEN</div>
      </AnimatedUnderline>
    </div>
  </motion.div>

  {/* WOMEN SECTION: Comes from the RIGHT */}
  <motion.div
    id="trend-div"
    className="trend-div2"
    initial={{ x: 100, opacity: 0 ,rotate: 5 }}
    whileInView={{ x: 0, opacity: 1 ,rotate: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] ,delay: 0.2}}
  >
    <div className="trend-img2-div"></div>
    <div id="trend-name-div">
      <AnimatedUnderline color="white" from="center" offset={5} thickness={2}>
        <div id="trend-name">WOMEN</div>
      </AnimatedUnderline>
    </div>
  </motion.div>
</div>
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