import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import './PetShopCollection.css'
import { motion, useScroll, useTransform ,useSpring} from 'framer-motion';



 const arcItems = 
  [
 /*  {id:0,img:'DogFood2.png',scale:.7}, */
  {id:1,img:'DogFood5.png',scale:.7},
  {id:2,img:'DogFood6.png',scale:.85},
  {id:3,img:'DogFood4.png',scale:1},
]


const DogFood =[
  {id:0,title:'Wet Dog Food Pack',img1:'PetFood1Img1.webp',img2:'PetFood2Img2.webp',price:'£36.65',brand:'Superfoods'},
  {id:1,title:'Salmon And Chicken ',img1:'PetFood5Img1.webp',img2:'PetFood5Img2.jpg',price:'£19.07',brand:'Harringtons'},
  {id:2,title:'Baked Salmon Fish Bites',img1:'PetFood3Img1.webp',img2:'PetFood1Img2.webp',price:'£14.32',brand:'FreshBakes'},
  {id:3,title:'Lamb And Chicken',img1:'PetFood4Img1.webp',img2:'PetFood4Img2.webp',price:'£14.00',brand:'Harringtons'},
]

 

export default function PetShopCollection() {




 const arcItemRef = useRef(null);

 const sectionRef = useRef(null);

const { scrollYProgress } = useScroll({
  target: sectionRef,
  // "start end" = top of div enters bottom of viewport
  // "start start" = top of div reaches top of viewport
  offset: ["start end", "start start"] 
});

const translateYUp = useTransform(scrollYProgress,[0,1],["100%", "0%"]);

useEffect(() => {
  gsap.fromTo(
    ".arc-item",
    {
      scale: .4,
      opacity:.8,
      rotate: 0,
      transformOrigin: "center center",
      
    },
    {
      scale: 1,
      opacity:1,
      rotate: 40,
      ease: "none",
      stagger: 0.15, // nice cascading effect
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    }
  );
}, []);

  const PetProducts=[
    {title:' Yellow Knitted Sweater',img1:'Pet1Img2.jpg',img2:'Pet1Img1.jpg',price:'20',brand:'CHBORCHICEN'},
    {title:'Feline Cane Bed',img1:'Pet2Img2.webp',img2:'Pet2Img1.jpg',price:'200',brand:'Huft'},
    {title:'Dog Harness',img1:'Pet3Img2.webp',img2:'Pet3Img1.jpg',price:'70',brand:'Ruffwear'},
    {title:'Red Rolling Toy',img1:'Pet4Img2.jpg',img2:'Pet4Img1.jpg',price:'8',brand:'Dogtown'},
]

const [hoveredIndex, setHoveredIndex] = useState(null);



  return (
    <div className="PetShop-collection-wapper">
    <div className="PetShop-collection"  >
 
   
<div className='pet-section' ref={sectionRef}>
        <motion.img  style={{y:translateYUp}}  className='dog-main' src='HomeCollections/PetMainImg2.png'/>
<div className="pet-products-wrapper">
    
  <div className='pet-png-wrapper'>
    <img src='HomeCollections/Dog-paws-Img.png'/>
  </div>

  <div className='petShop-head'>Pet Shop</div>
<div className="arc-container">
      <div className="arc" >
         {arcItems.map((item, i) => (
          <div className="arc-item" key={i} style={{ "--i": i}} ref={arcItemRef} >
           <img src={`HomeCollections/${item.img}`} style={{transform:`scale(${item.scale})`}}/>
          </div>
        ))} 
      </div>

    </div>
</div>
<div className="pet-preview-wrapper">
  {DogFood.map((item,index)=>
  <div className='pet-product' 
   onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}>
  <div className='pet-food-img-wrapper' >
   <img src={`HomeCollections/${item.img1}`}/>
   <div className='pet-product-bg-wrapper'
   style={{backgroundImage:`url(HomeCollections/${item.img2})`}}
   ></div>
  </div>
  <div className='pet-food-Info-wrapper'>
  <div className="pet-info-line1">
    <span>{item.title}</span>
    <span>{item.price}</span>
  </div>
  <div className="pet-food-brand">{item.brand}</div>
  </div>
  </div>)}
</div>
</div>


    </div>
     <div className='collection-product-wrapper'>   
   <div  id='home-product-head'>Pet Shop Collection</div>
 
         <div className='home-Products-container'>
     {PetProducts.map((product,index)=>
     <div className='collection-ProductCard'
      onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
     >
        <div className="collection-ProductImg-wrapper"
        
        style={{ 
          backgroundImage: `url(HomeCollections/${hoveredIndex === index ? product.img1 : product.img2})` 
        }}>

        </div>
        <div className="collection-ProductInfo-wrapper">
            <div className="collection-Info-line1">
                <span >{product.title}</span>
                <span >${product.price}</span>
            </div>
            <div className='collection-brandname'>{product.brand}</div>
        </div>

     </div>)}
    </div>
    </div>
    </div>
      
  )
}
