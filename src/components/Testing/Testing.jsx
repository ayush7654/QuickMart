
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow, Resize, Observer } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';



 import "./Testing.css";




export default function Testing() {


const CircularCarousel = () => {
  const cards = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];
  
  return (
<div className="testing-div" >
<div className="carousel-container">
      <Swiper
        modules={[Pagination, Navigation, EffectCoverflow, Resize, Observer]}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        observer={true}
        observeParents={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 15,     // Space cards slightly so side cards peek out
          depth: 120,      // Push background cards back
          modifier: 2,     // Scale difference intensity
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="mySwiper"
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id} className="carousel-slide-item">
            <div className="carousel-card">
              <span className="card-number">{card.id}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

</div>





  );

  
}


}
