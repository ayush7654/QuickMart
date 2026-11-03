import {useState, useEffect,useRef} from 'react'
import './SiteCollection.css'
import CategoryDataProvider from '../CategoryDataProvider';
import AnimatedUnderline from '../AnimatedUnderline/AnimatedUnderline';
import { useStoreData } from '../StoreDataContext';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { FaFacebook, FaXTwitter, FaYoutube, FaInstagram ,FaTiktok, FaLinkedin, FaLinkedinIn} from "react-icons/fa6";


const footerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const footerItemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};





  const featuredSubgroup= [
    'New Arrivals',
    'Absolute Steals',
    'Exclusive Picks',
    'Best Of Apple',
    'Wardrobe Overhaul',
    'Explore Our Range'
  ]

  
  const collectionImgs = [
    'clothing-collection2.jpg',
    'technology-collection3.jpg',
    'wellness-collection3.jpg',
    'outdoor-collection8.jpg',
    'accessories-collection4.jpg',
    
    'home&living-collection2.jpg']

  const brandCollection =[
      'BrandLogo2.webp',
  'BrandLogo3.webp',
  'BrandLogo4.webp',
  'BrandLogo5.webp',
  'BrandLogo6.webp',
  'BrandLogo7.webp',
  'BrandLogo8.webp',
  'BrandLogo9.webp',
    'BrandLogo10.webp',
  'BrandLogo11.webp',
  ]

export default function SiteCollection({collectionOpen,setCollectionOpen}) {

    const {handleTypeFilter,currentCategory} = useStoreData();
    const { categorizedData, loading , selectedGroup} = CategoryDataProvider();
    const [selectedSubGroupId,setSelectedSubGroupId] = useState(null);
    const [selectedCategoryId,setSelectedCategoryId] = useState(null)
    const [activeGroup, setActiveGroup] = useState(null);


      const scrollRef = useRef(null);

  const scrollChildren = (direction) => {
    const container = scrollRef.current;
    const child = container?.querySelector('.subgroup-list-wrapper');

    if (!container || !child) return;

    const gap = parseFloat(
      getComputedStyle(container.querySelector('.subgroups-wrapper')).gap
    ) || 0;

    const scrollAmount = child.offsetWidth + gap;

    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };


    useEffect(() => {
    
      if (!loading && categorizedData) {
    
        /* CLOSED */
        if (!collectionOpen) {
          setActiveGroup(null);
        
        
          
          return;
        }
    
        const groups = Object.keys(categorizedData);
    
        /* NO SELECTED CATEGORY */
        if (selectedCategoryId === null) {
          setActiveGroup(groups[0]);
           setSelectedSubGroupId(collectionOpen?0:null)  /*  */
          
          
        }
    
        /* RESTORE SELECTED CATEGORY */
        else {
          setActiveGroup(groups[selectedCategoryId]);
          setSelectedSubGroupId(selectedCategoryId)
          
        }
    
      }
    
    }, [loading, categorizedData, collectionOpen, selectedCategoryId]);

    



  return (
    <div className='site-collection'>

      <div className="site-collection-head">
        COLLECTIONS
        <span className='close-site-collection'
          onClick={()=>setCollectionOpen(false)}>
          <AnimatedUnderline color='black'>Close</AnimatedUnderline></span>
        </div>

   

         <div className="site-collection-layout">

          <div className="featured-wrapper">
           
           <div className="subgroup-list-wrapper">
              <div className="subgroup-list-image">
                <img src='SiteCollectionMedia/pet-collection5.jpg'/> 
                 <div className='subgroup-head'>Featured <ChevronRight size={13} strokeWidth={2} /></div>
                    </div>
               
              <div className="sub-group-list">
                     {featuredSubgroup.map((item,index) => (
                        <div 
                        className={`subgroup-name`}
                        key={index}  
                      
                  
                   >

                         <AnimatedUnderline>{item}</AnimatedUnderline> 
                          </div>
                      ))}
                    </div> 
           </div>
          </div>

          <div className="collection-midline"></div>
          
               <div className="subgroup-collection-wrapper">
                 <div className="subgroup-collection" ref={scrollRef}>

                  <div className="collection-nav-wrapper">
                    <div className="collection-btn" 
                    onClick={() => scrollChildren(-1)}>
                      < ChevronLeft />
                      </div>
                    <div className="collection-btn"
                     onClick={() => scrollChildren(1)}>
                      < ChevronRight/></div>
                  </div>
                   
                {(selectedSubGroupId != null ) && (
                  
                
                 <div className="subgroups-wrapper">
                   {Object.keys(categorizedData).map((group,index)=>
                  <div className="subgroup-list-wrapper" >
                 
                    <div className="subgroup-list-image">
        
                     <img src={`SiteCollectionMedia/${collectionImgs[index]}`}/> 
                     <div className='subgroup-head'>{group}<ChevronRight size={13} strokeWidth={2} /></div>
                      
                    </div>
                  
            
                 
                    <div className="sub-group-list">
                     {categorizedData[group].items.map((item, itemIdx) => (
                        <div 
                        className={`subgroup-name ${currentCategory===item.slug?'active-subgroup':''}`}
                        key={itemIdx}  
                        onMouseEnter={() => {
                    setActiveGroup(group);
                    setSelectedSubGroupId(index);
                  }}
                  
                     onClick={()=>{handleTypeFilter(item),
                                setCollectionOpen(false),                     
                                setSelectedSubGroupId(itemIdx)} }>

                         <AnimatedUnderline>{item.slug.replaceAll('-', ' ')}</AnimatedUnderline> 
                          </div>
                      ))}
                    </div> 
                  </div>)}
                 </div>
                
               
                
                )}
                
                 </div>
               </div>
                 
                


                 
            
                 
            </div>

             
   

      <div className="collection-footer-wrapper" >

        <div className="collection-brand-head">SHOP BY BRAND</div>
 
        <div className="collection-brands-wrapper">
         {brandCollection.map((brand,index)=>
         <div className='brand-icon' key={index}>
          <img src={`/BrandComponentIcons/${brand}`}/>
         </div>)}
        </div>

         <div className="collection-shopAll">
          <div className='collection-shopAll-btn'>
            SHOP ALL <ChevronRight size={20} strokeWidth={2} />
            
          </div>
          </div>

       </div>






     </div>
  )
}


