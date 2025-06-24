import React from 'react'
import './CountdownProducts.css'
import ProductCard from '../../../components/ProductCard'
export default function CountdownProducts() {
  return (
      <div className="Countdown-home-Products-div">
          <div className="home-Products-heading-div" ><div className='home-Products-heading'>Countdown Deals -<span className="home-Products-tagline"> &nbsp; Grab It Before It’s Gone!</span></div></div>
          <div className="home-Products-container" >
         <ProductCard
              classname='home-product'
              key={155}
              id={155}
              images= {["https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp"]}

              title="Classic Sun Glasses"
              price={24.99}
              path={location.search}
            />

           
           <ProductCard
              classname='home-product'
              key={98}
              id={98}
              images= {['https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp']}

              title="Decoration Swing"
              price={59.99}
              path={location.search}
            />
           <ProductCard
              classname='home-product'
              key={160}
              id={160}
              images= {['https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp']}

              title="Samsung Galaxy Tab S8 Plus Grey"
              price={599.99}
              path={location.search}
            />
           <ProductCard
              classname='home-product'
              key={165}
              id={165}
              images= {['https://cdn.dummyjson.com/product-images/tops/short-frock/1.webp']}

              title="Short Frock"
              price={24.99}
              path={location.search}
            />
         </div>
         </div>
  )
}
