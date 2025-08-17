import { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";


import { X } from 'lucide-react';

import './StoreFilter.css'

export default function StoreFilter({ currentCategory, typeFilter, handleClickFilter, handleClickCategory,sideBartoggled }) {
  const [productCategory, setProductCategory] = useState([]);
  const [CategoryNum, setCategoryNum] = useState(0);

  // Move up/down state
  const [isIdle, setIsIdle] = useState(false);

  // For scroll detection
  const lastScrollY = useRef(window.scrollY);

  const handleCategory = (direction) => {
    setCategoryNum(prev => {
      if (direction === "left") {
        if (prev > 0) return prev - 1;
      } else {
        if (prev < 10) return prev + 1;
      }
      return prev;
    });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      setProductCategory(data);
    }
    fetchCategory();
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY.current + 5) {
            setIsIdle(true); // Move up
          } else if (currentScrollY < lastScrollY.current - 5) {
            setIsIdle(false); // Move down
          }
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
    /*   style={{
        transition: 'transform 0.5s ease',
        transform: isIdle ? 'translateY(-3rem)' : 'translateY(0)'
      }} */
      className="Store-filter"
    >

<div className='Store-filter-head'>
  <span>SELECT CATEGORY</span>
  <span className='Store-filter-cancel'>

    <X size={24} strokeWidth={1.5} onClick={sideBartoggled} />

  </span>
  
</div>
      
        <div className="store-categories" style={{ translate: `${-CategoryNum * 200}px`}}>
          {productCategory && productCategory.map((item, index) =>
            <div
              onClick={() => handleClickFilter(item.slug)}
           className='store-category-div'
              key={index}
            >
              <span    className={item.slug === typeFilter ? "store-category-selected" : "store-category"}>{item.name}</span>
            </div>
          )}
        </div>
   
   
    </div>
  )
}
