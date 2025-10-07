import {useState, useEffect} from 'react'
import FlipCard from '../FlipCard/FlipCard'
export default function BrandSM() {

 const [Brands,setBrands] = useState(
    [
    {id:1,front:'BrandComponentIcons/QM-home-brand10.png', back:'BrandComponentIcons/Sony-product.jpeg', flipped:false},
    {id:2,front:'BrandComponentIcons/QM-home-brand2.webp', back:'BrandComponentIcons/Vans-product.jpg', flipped:false},
    {id:3,front:'BrandComponentIcons/QM-home-brand3.png', back:'BrandComponentIcons/Adidas-product3.webp', flipped:false},
    {id:4,front:'BrandComponentIcons/QM-home-brand5.png', back:'BrandComponentIcons/Asus-product.jpg', flipped:false},
    {id:5,front:'BrandComponentIcons/QM-home-brand4.png', back:'BrandComponentIcons/LV-product.avif', flipped:false},
    {id:6,front:'BrandComponentIcons/QM-home-brand6.png', back:'BrandComponentIcons/Chanel-product.avif', flipped:false},
    {id:7,front:'BrandComponentIcons/QM-home-brand7.png', back:'BrandComponentIcons/samsung-product.jpg', flipped:false},
    {id:8,front:'BrandComponentIcons/QM-home-brand8.png', back:'BrandComponentIcons/Rolex-product.png', flipped:false},
    {id:9,front:'BrandComponentIcons/QM-home-brand9.png', back:'BrandComponentIcons/Decathlon-product.avif', flipped:false}
  ]
 );

 const[flipCounter,setflipCounter]= useState(0);
 const[unflipCounter,setunflipCounter]= useState(0);
 
   useEffect(()=>{
   const intervalId= setInterval(()=>{
    setflipCounter(prevCount=>{
        if(prevCount===9){
            return 1;
        }
        return prevCount+1;
    });
   },2000);

   return () => {
      clearInterval(intervalId);
    };

   },[])

   useEffect(() => {
  // Start after 6 seconds
  const delayTimer = setTimeout(() => {
    const intervalId = setInterval(() => {
      setunflipCounter((prevCount) => {
        if (prevCount === 9) {
          return 1;
        }
        return prevCount + 1;
      });
    }, 2000);

    // Clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, 2000);

  // Clear timeout if component unmounts before 6s
  return () => clearTimeout(delayTimer);
}, []);

   console.log(flipCounter)
   console.log(unflipCounter)

  useEffect(() => {
  setBrands(prev =>
    prev.map(item =>
      item.id ===flipCounter
        ? { ...item, flipped: !item.flipped }
        : item
    )
  );
}, [flipCounter]);

  useEffect(() => {
  setBrands(prev =>
    prev.map(item =>
      item.id ===unflipCounter
        ? { ...item, flipped: !item.flipped }
        : item
    )
  );
}, [unflipCounter]);

  return (
    <div className="brand-carousel-sm" >
         {Brands.map((logo, index) => (
  <FlipCard
    key={index}
    frontImage={logo.front}
    backImage={logo.back}
    isFlipped={logo.flipped}
     
  />
))}
      </div>
  )
}
