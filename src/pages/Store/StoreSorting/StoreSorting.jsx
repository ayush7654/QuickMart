import React from 'react'
import './StoreSorting.css'
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline';
export default function StoreSorting({isIdle,sortOrder,currentSort,setCurrentSort,toggleSortOrder}) {
  const SortArray= [{name:'Price',sort:'price'},
                    {name:'Rating',sort:'rating'},
                    {name:'Discount',sort:'discountPercentage'},
                    {name:'In Stock',sort:'stock'}];


  return (
         <div style={{
              transform: window.innerWidth>500 && isIdle? 'translateY(-0%)':'translateY(0%)' /* -15% */
            
            }} 
            className="sticky-sort-container">
             <div className="current-sort-container-div">
            <div className="current-sort-container">
              <div className="sort-div-head" >SORT BY </div>
              <div className="sort-div-wrapper sorty-div">
    
              {SortArray.map((item) => {
      const isSelected = currentSort?.name === item.name;
    
      return (
     
         <div
            onClick={() => {
        if (isSelected) return;
        setCurrentSort(item);
      }}
            className={`sort-div ${isSelected?'sort-div-selected':''}`}
          >
    
       
    
          <AnimatedUnderline 
          from="left" exit="opposite"
          offset={2} 
          key={item.name}
          thickness={1}>  
      {/*   <span className="sort-div-text">{item.name}</span> */}
        {item.name}
          </AnimatedUnderline> 
         
          </div> 
        
      );
    })}
    
    
    
              </div>
             
    <div  className={`sort-div-buttons ${currentSort?'sort-active':''}`}>
      <div className="order-sort-div"
           onClick={toggleSortOrder}>
           {/*  <ArrowUpDown className="sort-button" strokeWidth={1.5}/>  */}
              <AnimatedUnderline 
                  from="left"
                   exit='opposite' 
                   offset={5} 
                   thickness={1}>{sortOrder==='asc'?'Low → High':'High  → Low'}</AnimatedUnderline>
    
            </div>
      <div  onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSort(null);
                }} className="clear-sort-div">
                  <AnimatedUnderline 
                  from="left"
                   exit='opposite' 
                   offset={5} 
                   thickness={1}>Clear</AnimatedUnderline></div>
    </div>
      
      </div>
      </div>
            </div>
  )
}
