import {useState,useEffect,useRef} from "react";
import { useLocation, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

import './Home.css';
export default function Home(){

const location = useLocation()
const homeBGs = [
    { id: 0, img1: 'QMbgImages/QMapple.png',img2:'QMbgImages/homeBGiPhone.avif', product: './store/123' },
    { id: 1, img1: 'QMbgImages/QMAirJordan.webp',img2:'QMbgImages/AjSample2.jpg', product: './store/88' },
    { id: 2, img1: 'QMbgImages/QMRolex2final.jpg',img2:'QMbgImages/QMRolexSm.webp', product: './store/98' },
    { id: 3, img1: 'QMbgImages/QMlevis2.jpg',img2:'QMbgImages/QMlevisSm.jpg', product: './store/98' },
    { id: 4, img1: 'QMbgImages/QMapple.png',img2:'QMbgImages/homeBGiPhone.avif', product: './store/123' }
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
            {homeBGs.map(bg=><div key={bg.id} className="homeCrousal"  >
             {/*  <img src={`${bg.img}`} width='100%'/> */}
            <div
  className="homeContent"
  style={{
    backgroundImage: `url(${window.innerWidth>600?bg.img1:bg.img2})`,
    transform: `translateX(-${currentBGImg * 100}vw)`,
    transition: transition?'transform 2000ms ease-in-out':'none',
  }} 
>   {/*   <img className="homeImg" style={{marginTop:'-15rem'}} src={`${bg.img}`} width='100%'/>   */} </div> 

</div>)}
<Link to={currentPath} className="buy-link">Buy Now</Link>
<div className="bgImgNav"><div className="bgImgNav-slider" style={{transform: transition?`translateX(${currentBGImg*100}%)`:`translateX(0%)`, transition:transition?'transform 2000ms ease-in-out':'none'}}></div></div>
        </div>
      
         
         <div className="home-Products-div">
          <div className="home-Products-div-head">Exclusive Offers</div>
          <div className="home-Products" style={{color:'white'}}>
         <ProductCard
              classname='home-product'
              key={79}
              id={79}
              images= {["https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/1.png"]}

              title="Asus Zenbook Pro Dual Screen Laptop"
              price={1799.99}
              path={location.search}
            />
           <ProductCard
              classname='home-product'
              key={98}
              id={98}
              images= {['https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Submariner%20Watch/1.png']}

              title="Rolex Submariner Watch"
              price={13999.99}
              path={location.search}
            />
           <ProductCard
              classname='home-product'
              key={101}
              id={101}
              images= {['https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/1.png']}

              title="Apple AirPods Max Silver"
              price={549.99}
              path={location.search}
            />
           <ProductCard
              classname='home-product'
              key={92}
              id={92}
              images= {['https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20Red/1.png']}

              title="Sports Sneakers Off White Red"
              price={109.99}
              path={location.search}
            />
         </div>
         </div>
        

      
      
         <div className="bento-heading" ><span id="bento-sub-heading">Click. </span><span id="bento-sub-heading">Pick. </span><span id="bento-sub-heading">Shop.</span> </div>
        <div className="Home-bottom" >
          <div  className="category-bento">
            <div className="bento-left-long"><Link to='/store?type=womens-dresses'><div className="bento-left-long-img"><span className="bento-left-long-img-name" >FASHION</span></div></Link></div>
       <div className="bento-center">
        <div className="bento-center-upper">
          <div className="upper-a"><Link to='/store?type=skin-care'><div className="upper-a-img"><span className="upper-a-img-name" >SKINCARE</span></div></Link></div>
          <div className="upper-b"><Link to='/store?type=furniture'><div className="upper-b-img"><span className="upper-b-img-name">HOME DECOR</span></div></Link></div>
          <div className="upper-c"><Link to='/store?type=groceries'><div className="upper-c-img"><span  className="upper-c-img-name" >ESSENTIALS</span></div></Link></div>
        </div>
        <div className="bento-center-lower">
        <div className="lower-a"><Link to='/store?type=mobile-accessories'><div className="lower-a-img"><span className="lower-a-img-name" >ELECTRONICS</span></div></Link></div>
        <div className="lower-b"><Link to='/store?type=sports-accessories'><div className="lower-b-img"><span className="lower-b-img-name" >SPORTS</span></div></Link></div>
        </div>
       </div>
            <div className="bento-right-long"><Link to='/store?type=mens-shoes'><div  className="bento-right-long-img"><span className="bento-right-long-img-name" >FOOTWEAR</span></div></Link></div>

          </div>
  
        </div>
        <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
        <div className="home-site-Info">
          <div className="site-Info-a">
            <div id="homeInfo-subhead">QuickMart: The One-stop Destination</div>
            <p id="homeInfo-para">QuickMart is a modern and user-friendly e-commerce platform designed to make online shopping fast, easy, and enjoyable. Whether you're browsing for electronics, fashion, home essentials, or groceries, QuickMart offers a wide selection of high-quality products at competitive prices. Its clean interface and intuitive navigation allow users to find what they need with just a few clicks.

One of QuickMart’s standout features is its personalized shopping experience. With smart recommendations and curated collections based on user preferences, customers can discover new products tailored to their interests. The platform also supports secure and flexible payment options, including credit/debit cards, digital wallets, and cash-on-delivery in select regions.

QuickMart ensures fast delivery and real-time order tracking, giving customers peace of mind from checkout to doorstep. Registered users can create wishlists, save carts, and receive notifications about discounts, seasonal deals, and back-in-stock items.

For mobile users, QuickMart’s responsive design and dedicated app ensure a seamless shopping experience on the go. The platform also includes customer reviews and detailed product descriptions, helping buyers make informed decisions.

Backed by strong customer support and a hassle-free return policy, QuickMart is committed to making online shopping not only convenient but also trustworthy. It’s the smart way to shop in today’s digital age.</p>
          </div>
          <div className="site-Info-b">
            <div  id="homeInfo-subhead">QuickMart Plus</div>
            <p   id="homeInfo-para">QuickMart Plus is a premium membership service that unlocks exclusive benefits for QuickMart users. Members enjoy free express delivery, early access to sales, and exclusive deals across all categories. With QuickMart Plus, users get priority customer support, a faster checkout experience, and access to Plus-only products. The service also offers enhanced return policies and personalized shopping insights to make your experience smoother and smarter. Designed for frequent shoppers, QuickMart Plus adds value, convenience, and savings to every order. It’s the perfect upgrade for those who want more from their online shopping experience at QuickMart.</p>
          </div>
          <div className="site-Info-c">
            <div  id="homeInfo-subhead">No Cost EMI</div>
            <p   id="homeInfo-para">
            QuickMart’s No Cost EMI feature lets you shop your favorite products without paying extra interest. Spread payments over easy monthly installments without hidden charges. It’s perfect for high-value purchases like electronics or appliances, making shopping more affordable and budget-friendly. Enjoy flexibility and convenience while keeping your finances in check—only on QuickMart.
            </p>
          </div>
          <div className="site-Info-d">
            <div  id="homeInfo-subhead">EMI on Debit Cards</div>
            <p   id="homeInfo-para">QuickMart’s No Cost EMI feature lets you shop your favorite products without paying extra interest. Spread payments over easy monthly installments without hidden charges. It’s perfect for high-value purchases like electronics or appliances, making shopping more affordable and budget-friendly. Enjoy flexibility and convenience while keeping your finances in check—only on QuickMart.</p>
          </div>
          <div className="site-Info-e">
            <div  id="homeInfo-subhead">Mobile Exchange Offers</div>
            <p   id="homeInfo-para">QuickMart’s Mobile Exchange lets you swap your old phone for instant discounts on a new one. Check your device’s value, apply the offer at checkout, and save instantly. It’s a smart, hassle-free upgrade option—only at QuickMart.</p>
          </div>
        </div>
        </div>
     
    </div>
    
 
    
    </>
        
    )
}