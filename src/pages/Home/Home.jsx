import {useState,useEffect,useRef} from "react";
import { useLocation, Link } from "react-router-dom";

import './Home.css';
export default function Home(){

const location = useLocation()
const homeBGs = [
    { id: 0, img: '/homeBGiPhone3.jpg', product: './store/123' },
    { id: 1, img: 'homeAirJs3.png', product: './store/88' },
    { id: 2, img: 'homeRolex4.avif', product: './store/98' },
    { id: 3, img: 'homeBGclothes4.jpg', product: './store/98' },
    { id: 4, img: '/homeBGiPhone3.jpg', product: './store/123'
        
    }
  ];
const [currentBGImg,setCurrentBGImg]= useState('');
const[currentPath,setCurrentPath]= useState('./store/123')

const [transition,setTransition]= useState(true)




//console.log(location)
console.log(currentPath)


useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBGImg(prev => {
        const next = (prev + 1) % 5; //loops through 0,1,2,3
        setCurrentPath(homeBGs[next].product); // use the upcoming index here
        return next;
      });
    }, 4000);
  
    return () => clearInterval(interval);
  }, []);
  


  useEffect(()=>{
    if(currentBGImg===0){
        setTransition(false);
    }else{
        setTransition(true)
    }
  },[currentBGImg])

 


   
    return(<>
    
  <div className="Home">
 
          <div className="homeContent-Container">
            {homeBGs.map(bg=><div key={bg.id} className="homeCrousal" >
                <div
  className="homeContent"
  style={{
    backgroundImage: `url(${bg.img})`,
    transform: `translateX(-${currentBGImg * 100}vw)`,
    transition: transition?'transform 2000ms ease-in-out':'none',
  }}
></div>

</div>)}
   
<div className="bgImgNav"><div className="bgImgNav-slider" style={{transform: transition?`translateX(${currentBGImg*100}%)`:`translateX(0%)`, transition:transition?'transform 2000ms ease-in-out':'none'}}></div></div>
        </div>
        <Link to={currentPath} className="buy-link">Buy Now</Link>

      
      
         <div className="bento-heading" >Click. Pick. Shop.</div>
        <div className="Home-bottom" >
          <div  className="category-bento">
            <div className="bento-left-long"><Link to='/store?type=womens-dresses'><div className="bento-left-long-img"><span style={{paddingBottom:'1.5rem',paddingLeft:'1rem'}} >FASHION</span></div></Link></div>
       <div className="bento-center">
        <div className="bento-center-upper">
          <div className="upper-a"><Link to='/store?type=skin-care'><div className="upper-a-img"><span style={{paddingBottom:'1.5rem',paddingLeft:'1rem'}} >SKINCARE</span></div></Link></div>
          <div className="upper-b"><Link to='/store?type=furniture'><div className="upper-b-img"><span style={{paddingBottom:'1.5rem',paddingLeft:'1rem'}} >HOME DECOR</span></div></Link></div>
          <div className="upper-c"><Link to='/store?type=groceries'><div className="upper-c-img"><span style={{paddingBottom:'1.5rem',paddingLeft:'1rem'}} >ESSENTIALS</span></div></Link></div>
        </div>
        <div className="bento-center-lower">
        <div className="lower-a"><Link to='/store?type=mobile-accessories'><div className="lower-a-img"><span style={{paddingBottom:'1.5rem',paddingLeft:'1rem'}} >ELECTRONICS</span></div></Link></div>
        <div className="lower-b"><Link to='/store?type=sports-accessories'><div className="lower-b-img"><span style={{paddingBottom:'1.5rem',paddingLeft:'1rem'}} >SPORTS</span></div></Link></div>
        </div>
       </div>
            <div className="bento-right-long"><Link to='/store?type=mens-shoes'><div  className="bento-right-long-img"><span style={{paddingBottom:'1.5rem',paddingLeft:'1rem'}} >FOOTWEAR</span></div></Link></div>

          </div>
  
        </div>
        <div className="home-site-Info">
          <div className="site-Info-a">
            <div style={{fontSize:'1.5rem',color:'rgb(92, 92, 92)'}}>QuickMart: The One-stop Destination</div>
            <p style={{fontSize:'1rem',color:'grey'}}>QuickMart is a modern and user-friendly e-commerce platform designed to make online shopping fast, easy, and enjoyable. Whether you're browsing for electronics, fashion, home essentials, or groceries, QuickMart offers a wide selection of high-quality products at competitive prices. Its clean interface and intuitive navigation allow users to find what they need with just a few clicks.

One of QuickMart’s standout features is its personalized shopping experience. With smart recommendations and curated collections based on user preferences, customers can discover new products tailored to their interests. The platform also supports secure and flexible payment options, including credit/debit cards, digital wallets, and cash-on-delivery in select regions.

QuickMart ensures fast delivery and real-time order tracking, giving customers peace of mind from checkout to doorstep. Registered users can create wishlists, save carts, and receive notifications about discounts, seasonal deals, and back-in-stock items.

For mobile users, QuickMart’s responsive design and dedicated app ensure a seamless shopping experience on the go. The platform also includes customer reviews and detailed product descriptions, helping buyers make informed decisions.

Backed by strong customer support and a hassle-free return policy, QuickMart is committed to making online shopping not only convenient but also trustworthy. It’s the smart way to shop in today’s digital age.</p>
          </div>
          <div className="site-Info-b">
            <div  style={{fontSize:'1.5rem',color:'rgb(92, 92, 92)'}}>QuickMart Plus</div>
            <p  style={{fontSize:'1rem',color:'grey'}}>QuickMart Plus is a premium membership service that unlocks exclusive benefits for QuickMart users. Members enjoy free express delivery, early access to sales, and exclusive deals across all categories. With QuickMart Plus, users get priority customer support, a faster checkout experience, and access to Plus-only products. The service also offers enhanced return policies and personalized shopping insights to make your experience smoother and smarter. Designed for frequent shoppers, QuickMart Plus adds value, convenience, and savings to every order. It’s the perfect upgrade for those who want more from their online shopping experience at QuickMart.</p>
          </div>
          <div className="site-Info-c">
            <div  style={{fontSize:'1.5rem',color:'rgb(92, 92, 92)'}}>No Cost EMI</div>
            <p  style={{fontSize:'1rem',color:'grey'}}>
            QuickMart’s No Cost EMI feature lets you shop your favorite products without paying extra interest. Spread payments over easy monthly installments without hidden charges. It’s perfect for high-value purchases like electronics or appliances, making shopping more affordable and budget-friendly. Enjoy flexibility and convenience while keeping your finances in check—only on QuickMart.
            </p>
          </div>
          <div className="site-Info-d">
            <div  style={{fontSize:'1.5rem',color:'rgb(92, 92, 92)'}}>EMI on Debit Cards</div>
            <p  style={{fontSize:'1rem',color:'grey'}}>QuickMart’s No Cost EMI feature lets you shop your favorite products without paying extra interest. Spread payments over easy monthly installments without hidden charges. It’s perfect for high-value purchases like electronics or appliances, making shopping more affordable and budget-friendly. Enjoy flexibility and convenience while keeping your finances in check—only on QuickMart.</p>
          </div>
          <div className="site-Info-e">
            <div  style={{fontSize:'1.5rem',color:'rgb(92, 92, 92)'}}>Mobile Exchange Offers</div>
            <p  style={{fontSize:'1rem',color:'grey'}}>QuickMart’s Mobile Exchange lets you swap your old phone for instant discounts on a new one. Check your device’s value, apply the offer at checkout, and save instantly. It’s a smart, hassle-free upgrade option—only at QuickMart.</p>
          </div>
        </div>
    </div>
    
 
    
    </>
        
    )
}