
import React, { useState , useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import HomeProduct from "../../pages/Home/HomeProduct/HomeProduct";
import CarouselNav from "../CarouselNav/CarouselNav";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { useSwiper } from 'swiper/react';
import "./CoverflowCarousel.css";

export default function CoverflowCarousel({ homeProducts }) {
  const [currentCard, setCurrentCard] = useState(0);
 const swiperRef = useRef(null);


const handleClick = () => {
  if (swiper) {
    swiper.slideNext();
  } else {
    console.log("Swiper instance not found!");
  }
};
  return (
    <motion.div
      className="coverflow-carousel"
      initial={{
        opacity: 0,
        y: 60,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
            
      <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
        effect="coverflow"
        centeredSlides={true}
        initialSlide={2}
        slidesPerView="auto"
        spaceBetween={15} // Default space for screens 600px and above
        breakpoints={{
          // When window width is >= 0px and < 400px
          0: {
            spaceBetween: 5,
          },
          // When window width is >= 400px and < 600px
          400: {
            spaceBetween: 10,
          },
          // When window width is >= 600px and above
          600: {
            spaceBetween: 15,
          },
        }}
        grabCursor={true}
        onSlideChange={(swiper) => {
          setCurrentCard(swiper.realIndex);
        }}
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow]}
      >
        {homeProducts.map((product, index) => (
          <SwiperSlide key={product.id}>
            <div
              className={`coverflow-card ${
                currentCard === index ? "active-card" : ""
              }`}
             
            >
        
              <HomeProduct product={product}/>
            </div>
          </SwiperSlide>
        ))}
          <div className='category-nav-wrapper home-products-nav-wrapper'>
       
                <div className='category-nav'>
                   <div  className='category-nav-btn home-products-btn'  onClick={() => swiperRef.current?.slidePrev()}>
                    <FiChevronLeft size={30}  />
                   </div>
                     <div className='category-nav-btn home-products-btn' onClick={() => swiperRef.current?.slideNext()}>
                    <FiChevronRight size={30} />
                   </div>
                </div>     
          </div> 
      </Swiper>
      <div className="home-products-nav">
         
            <CarouselNav 
            list={homeProducts}
            activeIndex={currentCard}
            setActiveIndex={setCurrentCard}
            color={'0,100,255'}
            />
        
      </div>
    </motion.div>
  );
}

