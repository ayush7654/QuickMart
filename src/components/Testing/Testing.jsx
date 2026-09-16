
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";



import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";



 import "./Testing.css";




export default function Testing() {




  const cardsInfo = [
     {  brand: 'Prada',  name: "Prada Women Bag",  thumbnail: 'Home-products-img/BluePrada.jpg' },

   
   
     { brand: 'Urban Chic', name: 'Urban Chic Check Shirt', thumbnail: 'Home-products-img/Green-shirt.jpg' },
      
    { brand: 'Nike', name: 'Nike Air Jordan 1', thumbnail: 'Home-products-img/AirJordanImg.jpg' },
    { brand: 'Apple', name: 'AirPods Max Silver', thumbnail: 'Home-products-img/hp-airmax.jpg' },
    { brand: 'Apple', name: 'AirPods Max Silver', thumbnail: 'Home-products-img/hp-airmax.jpg' }
     
   
  ];

  const [currentCard, setCurrentCard] = useState(3);
  
  return (
<div className="testing-div" >
<div className="coverflow-carousel">

      <Swiper
        effect="coverflow"

        centeredSlides={true}
        slidesPerView="auto"

        spaceBetween={15}

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
    {cardsInfo.map((card, index) => (
  <SwiperSlide key={index}>
    <div
      className={`coverflow-card ${
        currentCard === index ? "active-card" : ""
      }`}
      style={{ backgroundImage: `url(${card.thumbnail})` }}
    >
      {card.name}
    </div>
  </SwiperSlide>
))}
      </Swiper>

    </div>

</div>





  );

  



}
