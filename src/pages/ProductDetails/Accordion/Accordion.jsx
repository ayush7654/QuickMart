import React, { useState } from 'react';
import './Accordion.css';
import AddtionalInfo from './AddtionalInfo/AddtionalInfo';
import ShippingDetails from './ShippingDetails/ShippingDetails';
import ProductReview from '../ProductReview/ProductReview';
const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const data = [
    { title: 'PRODUCT DETAILS', content:<AddtionalInfo/> },
    { title: ' SHIPPING & RETURNS', content: <ShippingDetails /> },
    { title: 'DOWNLOADS', content: 'User Manual (PDF), Installation Guide (SVG), Warranty Policy (PDF).' },
    { title: 'TOP REVIEWS', content: <ProductReview/> },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion-container">
      {data.map((item, index) => (
        <div key={index} className='accordion-item'>
          <button 
            className={`accordion-header ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <span className="accordion-title">{item.title}</span>
            <span className="accordion-icon">{activeIndex === index ? '−' : '+'}</span>
          </button>
          <div className={`accordion-content ${activeIndex === index ? 'show' : ''}`}>
            <div className="content-inner">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;