
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import HomeProduct from "../../pages/Home/HomeProduct/HomeProduct";
import "swiper/css";
import "swiper/css/effect-coverflow";

import "./CoverflowCarousel.css";

export default function CoverflowCarousel({ homeProducts }) {
  const [currentCard, setCurrentCard] = useState(0);

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
        effect="coverflow"
        centeredSlides={true}
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
           {/*    <img
                src={product.thumbnail}
                alt={product.title}
              />

              <div className="coverflow-card-info">
                <h3>{product.title}</h3>
              </div> */}
              <HomeProduct product={product}/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}

