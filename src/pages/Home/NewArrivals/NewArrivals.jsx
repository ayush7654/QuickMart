import React from 'react'
import ProductCard from '../../../components/ProductCard'
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton'
import HomeProduct from '../HomeProduct/HomeProduct'
import './NewArrivals.css'


export default function NewArrivals() {
  return (
      <div id='home-product-div' className="newArrivals-home-Products-div">
        
                  <div className='home-heading'>New Arrivals
                    <span className='view-collection-btn'>View Collection</span>
                     </div>
                  <div className="home-Products-container" >


                    <HomeProduct
                             
                              key={7}
                              id={7}
                              thumbnail='Home-products-img/ChanelPerfume.jpg' /* https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp */
                              name="Coco Noir Eau De"
                              price={129.99}
                              brand='Chanel'
                              path={location.search}
                       />

                        <HomeProduct
                             
                              key={94}
                              id={94}
                              thumbnail='Home-products-img/SilverWatch.webp' /* https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp */
                              name="Longines Master Collection"
                              price={1499.99}
                              brand='Longines'
                              path={location.search}
                       />

                        <HomeProduct
                             
                              key={174}
                              id={174}
                              thumbnail='Home-products-img/BluePradaBag.jpg' /* https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp */
                              name="Prada Women Bag"
                              price={599.99}
                              brand='Prada'
                              path={location.search}
                       />

                         <HomeProduct
                             
                              key={101}
                              id={101}
                              thumbnail='Home-products-img/AirPod2.jpg' /* https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp */
                              name="AirPods Max Silver"
                              price={549.99}
                              brand='Apple'
                              path={location.search}
                       />

             

                
                
             
    
                 </div>
           {/*      <div className='view-more-button'>
                              <ScrollButton
  text='View More'
  theme="buttonOutline"
   themeOnHover="buttonFilled"
  color="#000000ff"

 
/>
                </div> */}

    
                 </div>
  )
}
