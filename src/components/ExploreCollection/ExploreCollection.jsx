import React, { useState, useRef, useEffect } from 'react';
import SlideFrame from './../SlideFrame/SlideFrame';
import ScrollButton from '../ScrollingButton/ScrollingButton';
import './ExploreCollection.css';

const images = [
  { name: 'Clothing', img: 'explore-clothing3.jpg' },
  { name: 'Skincare', img: 'explore-skincare3.jpg' },
  { name: 'Technology', img: 'explore-technology3.jpg' },
  { name: 'Decor', img: 'explore-decor8.jpg' },
  { name: 'Sports', img: 'explore-sports11.jpg' },
  { name: 'Adventure', img: 'explore-adventure4.jpg' },
  { name: 'Grocery', img: 'Grocery.jpg' },
  { name: 'Footwear', img: 'explore-footwear2.jpg' },
];

export default function ExploreCollection() {
  const [imgIndex, setImgIndex] = useState(0);
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(
    typeof document === 'undefined' ? true : document.visibilityState === 'visible'
  );

  const containerRef = useRef(null);

  const getImage = (offset) => {
    return images[(imgIndex + offset) % images.length].img;
  };



  // Detect whether the component is currently in the viewport
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsOnScreen(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting);
      },
      { threshold: 0.1 } // Triggers once at least 10% of the section is visible
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Pause when the user switches away from the browser tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Only run the interval while on screen AND in an active tab
  useEffect(() => {
    if (!isOnScreen || !isTabVisible) return;

    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isOnScreen, isTabVisible]);

  return (
    <div ref={containerRef}>
      <div className="explore-frame-wrapper">
        <div className="explore-info-wrapper">
          <div className="explore-head-wrapper">
            <div className="explore-head">Explore </div>
          <div className="explore-head">the full</div>
          <div className="explore-head"> spectrum.</div>
          </div>

          <span className='home-shop-btn'>
                <ScrollButton text={'Collection '}/>
          </span>
          
        </div>

        <div className="explore-frame frame-0">
          <SlideFrame
            srcIndex={0}
            getImage={getImage}
            
            imgIndex={imgIndex}
            setimgIndex={setImgIndex}
          />
        </div>

        <div className="explore-category-wrapper">
          <div className="explore-frame frame-1">
            <SlideFrame
              srcIndex={1}
              getImage={getImage}
          
              imgIndex={imgIndex}
              setimgIndex={setImgIndex}
            />
          </div>

          <div className="explore-frame frame-2">
            <SlideFrame
              srcIndex={2}
              getImage={getImage}
          
              imgIndex={imgIndex}
              setimgIndex={setImgIndex}
            />
          </div>

          <div className="explore-frame frame-3">
            <SlideFrame
              srcIndex={3}
              getImage={getImage}
         
              imgIndex={imgIndex}
              setimgIndex={setImgIndex}
            />
          </div>

    
        </div>
      </div>
    </div>
  );
}