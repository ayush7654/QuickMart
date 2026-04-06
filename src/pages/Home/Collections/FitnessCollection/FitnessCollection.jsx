import React,{useState} from 'react'
import './FitnessCollection.css'


export default function FitnessCollection() {
const CategoryCollection = [
  {id:0,title:'Dumbell',brand:'Gornation',price:45, img1:'HomeCollections/Fitness-Barbell1.jpg',img2:'HomeCollections/Fitness-Barbell3.jpg'},
    {id:1,title:'Running Shoe',brand:'Nike',price:130, img1:'HomeCollections/Fitness-RunningShoes3.jpg',img2:'HomeCollections/Fitness-RunningShoes2.jpg'},
      {id:2,title:'Yoga Pants',brand:'Cambivo',price:20, img1:'HomeCollections/Fitness-Yogamat3.jpg',img2:'HomeCollections/Fitness-Yogamat4.jpg'},
  {id:3,title:'Tredmill',brand:'Tychnogym',price:1200, img1:'HomeCollections/Fitness-Tredmill1.jpg',img2:'HomeCollections/Fitness-Tredmill2.jpg'}


]
const [hoveredIndex, setHoveredIndex] = useState(null);


  return (
    <div className='Fitness-Collection-wrapper'>
        <div className="collections-section-wrapper">
     
      <div className='collection-content'>
         <div className="explore-products-wrapper">
         {CategoryCollection.map((product,index)=>
        <div className='collection-product-wrapper' 
        key={product.id || index} 
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
         >
         <div className='collection-product'
         style={{ 
          backgroundImage: `url(${hoveredIndex === index ? product.img2 : product.img1})` 
        }}>

         </div>
         <div className='collection-product-info'>
         <div className='collection-line1'>
          <span>{product.title}</span>
          <span>${product.price}</span>
         </div>
         <div className='collection-brandname'>{product.brand}</div>
         </div>
        </div>)}
        </div>
         <div className="explore-banner-wrapper">
        <div className="banner-content">
          <div className='bannerImg'>
            <div className='fitness-content'>
               <div className='fitness-banner-stat'>
              <span className='banner-stat1'>360</span>
              <span className='banner-stat2'>Days of </span>
              <span className='banner-stat3'>GRIND </span>

              <div className='banner-line-wrapper'>
                <span className='banner-line'> 
                <span className='banner-circle'></span>
              </span>
              </div>                      
            </div>
            <div className='fitness-bottom-wrapper'>
            <div className='fitness-head'>
             NEW!
            </div>   
          <div className='fitness-button'>
            View More
            </div> 
            
            </div>
            </div>
           
           

            
          </div>
          <div className="collection-product-info">
            <div className='collection-line1'>
                 <span>Kiraro Steel Dumbell Set</span>
          <span>$120</span>
            </div>
            <div className='collection-brandname'>Kiraro</div>
          </div>
        </div>
       
        </div>
        </div> 
        
      </div>
    </div>
  )
}
