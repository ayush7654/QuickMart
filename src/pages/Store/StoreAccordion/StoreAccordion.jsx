import {useState} from 'react'
import './StoreAccordion.css'
import { Check } from 'lucide-react';
const accordionData = [
  { id: 1, heading: "Availability", filters:[0,1] },
  { id: 2, heading: "Popular", filters:[6,7] },
  { id: 3, heading: "Protection", filters:[2,3] },
  { id: 4, heading: "Delivery & Payment", filters:[4,5] },
  
];


export default function StoreAccordion({storeFilters,setStoreFilters}) {

     const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };



  return (
       <div className="store-accordion-wrapper">
      {accordionData.map((item) => (
        <div
          key={item.id}
          className={`store-accordion-item ${
            openId === item.id ? "active" : ""
          }`}
        >
          <button
            className="store-accordion-header"
            onClick={() => toggleAccordion(item.id)}
          >
            <span>{item.heading}</span>

            <span className="store-accordion-icon">
              {openId === item.id ? "−" : "+"}
            </span>
          </button>

          <div
            className={`store-accordion-content ${
              openId === item.id ? "open" : ""
            }`}
          >
            <div className="store-accordion-inner">


               <div className="filter-check"
    onClick={() =>
      setStoreFilters(prev =>
        prev.map(f =>
          f.filter === storeFilters[item.filters[0]].filter
            ? { ...f, state: !f.state }
            : f
        )
      )
    } 
  >
    <span className={`filter-checkbox ${storeFilters[item.filters[0]].state?'filter-ticked':''}`}>
       <Check className='filter-checkbox-icon'/>
      </span>
    <span>{storeFilters[item.filters[0]].name}</span>
  </div>

            <div className="filter-check"
    onClick={() =>
      setStoreFilters(prev =>
        prev.map(f =>
          f.filter === storeFilters[item.filters[1]].filter
            ? { ...f, state: !f.state }
            : f
        )
      )
    } 
  >
    <span className={`filter-checkbox ${storeFilters[item.filters[1]].state?'filter-ticked':''}`}>
       <Check className='filter-checkbox-icon'/>
      </span>
    <span>{storeFilters[item.filters[1]].name}</span>
  </div>

    
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
