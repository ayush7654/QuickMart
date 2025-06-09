import {useState,useEffect,useRef} from "react";
import { useLocation, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

 import { ChevronLeft,ChevronRight } from 'lucide-react'; 

 import StarRating from './../../components/StarRating';





import './Home.css';
export default function Home(){

const location = useLocation()
const homeBGs = [
    { id: 0, img1: 'QMbgImages/QMRolex3.jpg',img2:'QMbgImages/QMRolexSm.webp', product: './store/98' },
    { id: 1, img1: 'QMbgImages/QMAirJordan5.webp',img2:'QMbgImages/AjSample2.jpg', product: './store/88' },
    { id: 2, img1: 'QMbgImages/QMApple4.jpg',img2:'QMbgImages/homeBGiPhone.avif', product: './store/123' },
    { id: 3, img1: 'QMbgImages/QMlevis8.png',img2:'QMbgImages/QMlevisSm.jpg', product: './store/84' }
  ];
const [currentBGImg,setCurrentBGImg]= useState(0);
const[currentPath,setCurrentPath]= useState('./store/123')
const isFirstRender = useRef(true); // track initial mount
const [transition,setTransition]= useState(true)





console.log(currentBGImg)

function leftNav(){
  setCurrentBGImg(prev=>{
   if(prev>0){
      return prev-1;
    }
    else{
      return prev
    }
  })
}

function rightNav(){
  setCurrentBGImg(prev=>{

if(prev<homeBGs.length-1){
    return prev+1
  }
  else{
    return prev
  }
  })
}


  
 
 /*   useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBGImg(prev => (prev + 1) % homeBGs.length);
    }, 4000);
  
    return () => clearInterval(interval);
  }, []);   */
  

/*   useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // skip transition logic on first render
    }
  
    if (currentBGImg=== 0) {
      setTransition(false);
      requestAnimationFrame(() => setTransition(true));
    }
  }, [currentBGImg]); */


 


   
    return(<>
    
  <div className="Home">
    
 
          <div className="homeContent-Container">
            <div className="crousel-frame"></div>
            <div className="Nav-div">
<ChevronLeft onClick={leftNav} className="home-left-arrow" strokeWidth={.5} absoluteStrokeWidth />
              <ChevronRight onClick={rightNav} className="home-right-arrow" strokeWidth={.5} absoluteStrokeWidth />

            </div>
            {homeBGs.map(bg=><div key={bg.id} className="homeCrousal"  >
             {/*  <img src={`${bg.img}`} width='100%'/> */}
            <div
  className="homeContent"
  style={{
    backgroundImage: `url(${window.innerWidth>600?bg.img1:bg.img2})`,
    transform: `translateX(-${currentBGImg * 100}vw)`,
    transition: transition?'transform 2000ms ease-in-out':'none'
  }} 
>    </div> 

</div>)}

<div  className="buy-link">
  <Link id='buyLink-btn' className="btn-discoverMore">DISCOVER MORE</Link>
  <Link id='buyLink-btn'  to={currentPath} className="btn-shopNow">SHOP NOW</Link>
</div>

<div className="bgImgNav"><div className="bgImgNav-slider" style={{transform: transition?`translateX(${currentBGImg*100}%)`:`translateX(0%)`, transition:transition?'transform 2000ms ease-in-out':'none'}}></div></div>
        </div>
      
         
         <div className="home-Products-div">
          <div className="home-Products-heading-div" >{/* <img src='/headImg1.png' width='500px'/> */}<div className="home-Products-div-head"><span id='hp-head'>EXCLUSIVE OFFERS</span></div></div>
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
        

      
      
         <div className="trending-products-div">
         <div className="home-Products-heading-div" >{/* <img src='/headImg1.png' width='500px'/> */}<div className="home-Products-div-head"><span id='hp-head'>TRENDS IN FASHION</span></div></div>
          <div className="trending-products">
<div className="trending-product-1"><span className="tp-1-btn">Winter Collection</span></div>
<div className="trending-product-2"><span className="tp-2-btn">Summer Collection</span></div>
          </div>
        </div>
        <div className="Home-bottom" >

    

        <div className="home-Products-heading-div" >{/* <img src='/headImg1.png' width='500px'/> */}<div className="home-Products-div-head"><span id='hp-head'>CLICK. PICK. SHOP.</span></div></div>
      {/*   <div className="bento-heading" ><span id="bento-sub-heading">Click. </span><span id="bento-sub-heading">Pick. </span><span id="bento-sub-heading">Shop.</span> </div> */}
    
      
      <div class="container-bento">
  <div class="bento1">
    <div class="bento1-a"><div id='bento-img-div' className="bento1-a-img"></div><span className="bento1-a-img-name">ELECTRONICS {'>'} </span><div id ='bento-btn-div' className="bento1-a-btn"><div id='bento-btn1'>Explore</div><div  id='bento-btn2'>Shop Now</div></div></div>
    <div class="bento1-b"><div id='bento-img-div' className="bento1-b-img"></div><span className="bento1-b-img-name" >STYLE {'>'} </span><div id ='bento-btn-div' className="bento1-a-btn"><div id='bento-btn1'>Explore</div><div  id='bento-btn2'>Shop Now</div></div></div>
    <div class="bento1-c" ><div id='bento-img-div'  className="bento1-c-img"></div><span className="bento1-c-img-name" >SHADES {'>'}</span><div id ='bento-btn-div' className="bento1-a-btn"><div id='bento-btn1'>Explore</div><div  id='bento-btn2'>Shop Now</div></div></div>
  </div>
  <div class="bento2">
    <div class="bento2-a"><div id='bento-img-div' className="bento2-a-img"></div><span className="bento2-a-img-name" >FOOTWEAR {'>'}</span><div id ='bento-btn-div' className="bento1-a-btn"><div id='bento-btn1'>Explore</div><div  id='bento-btn2'>Shop Now</div></div></div>
    <div class="bento2-b"><div id='bento-img-div' className="bento2-b-img"></div><span  className="bento2-b-img-name" >WATCHES {'>'}</span><div id ='bento-btn-div' className="bento1-a-btn"><div id='bento-btn1'>Explore</div><div  id='bento-btn2'>Shop Now</div></div></div>
    <div class="bento2-c"><div id='bento-img-div' className="bento2-c-img"></div><span className="bento2-c-img-name" >SPORTS {'>'}</span><div id ='bento-btn-div' className="bento1-a-btn"><div id='bento-btn1'>Explore</div><div  id='bento-btn2'>Shop Now</div></div></div>
  </div>
  <div class="bento3">
    <div class="bento3-a"><div id='bento-img-div' className="bento3-a-img"></div><span className="bento3-a-img-name" >HOME DECOR {'>'}</span><div id ='bento-btn-div' className="bento1-a-btn"><div id='bento-btn1'>Explore</div><div  id='bento-btn2'>Shop Now</div></div></div>
    <div class="bento3-b"><div id='bento-img-div' className="bento3-b-img"></div><span className="bento3-b-img-name" >SKINCARE {'>'}</span><div id ='bento-btn-div' className="bento1-a-btn"><div id='bento-btn1'>Explore</div><div  id='bento-btn2'>Shop Now</div></div></div>
    <div class="bento3-c"><div id='bento-img-div' className="bento3-c-img"></div><span className="bento3-c-img-name" >ESSENTIALS {'>'}</span><div id ='bento-btn-div' className="bento1-a-btn"><div id='bento-btn1'>Explore</div><div  id='bento-btn2'>Shop Now</div></div></div>
  </div>
</div>



  
        </div>

      


        <div style={{display:'flex',justifyContent:'center',width:'100%',backgroundColor:'#eeeeee'}}>
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