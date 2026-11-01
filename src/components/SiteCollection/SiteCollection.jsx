import {useState, useEffect,useRef} from 'react'
import './SiteCollection.css'
import CategoryDataProvider from '../../pages/Store/ExpandingStoreHeader/CategoryDataProvider';
import AnimatedUnderline from '../AnimatedUnderline/AnimatedUnderline';
import { useStoreData } from '../StoreDataContext';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { IoShirtOutline } from 'react-icons/io5';
import { FaGem } from "react-icons/fa";
import { PiTShirtFill } from "react-icons/pi";
import { MdLaptopMac } from "react-icons/md";
import { GiLipstick } from "react-icons/gi";
import { PiDeskFill } from "react-icons/pi";
import { FaRunning } from "react-icons/fa";
import { GiGrapes } from "react-icons/gi";
import { FaFacebook, FaXTwitter, FaYoutube, FaInstagram ,FaTiktok, FaLinkedin, FaLinkedinIn} from "react-icons/fa6";
import { div } from 'framer-motion/client';

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

 const categoryImgs = [
    {id:0, img: ['Clothing1.jpg','Clothing2.jpg'],},
    {id:1,img :['IphoneDuo4.jpg','IphoneDuo.jpg']},
    {id:2, img:['skincare1.jpg','skincare2.jpg']},
    {id:3, img:['GreenGems.jpg','Green-Gems.jpg']},
    {id:4, img:['Football5.jpg','Football6.jpg']},
    {id:5, img: ['DailyItem2.jpg','Grocery.jpg']}

  ]

  const groupImgs = [
    'clothing-group3.png',
    'technology-group1.png',
    'skincare-group.png',
    'accessories-group.png',
    'sports-group1.png',
    'home&living-group.png']

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

export default function SiteCollection() {

    const {handleTypeFilter,isOpen, setIsOpen,currentCategory} = useStoreData();
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
        if (!isOpen) {
          setActiveGroup(null);
        
        
          
          return;
        }
    
        const groups = Object.keys(categorizedData);
    
        /* NO SELECTED CATEGORY */
        if (selectedCategoryId === null) {
          setActiveGroup(groups[0]);
           setSelectedSubGroupId(isOpen?0:null)  /*  */
          
          
        }
    
        /* RESTORE SELECTED CATEGORY */
        else {
          setActiveGroup(groups[selectedCategoryId]);
          setSelectedSubGroupId(selectedCategoryId)
          
        }
    
      }
    
    }, [loading, categorizedData, isOpen, selectedCategoryId]);

    

    console.log('data is', categorizedData)

  return (
    <div className='site-collection'>

      <div className="site-collection-head">COLLECTIONS </div>

   

         <div className="site-collection-layout">

          <div className="featured-wrapper">
           
           <div className="subgroup-list-wrapper">
              <div className="subgroup-list-image">
                <img src='pet-collection5.jpg'/> 
                 <div className='subgroup-head'>Featured</div>
                    </div>
                    <div className="subgroup-list-head">Featured<ChevronRight size={13} strokeWidth={2} /></div>
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
        
                     <img src={collectionImgs[index]}/> 
                     <div className='subgroup-head'>{group}</div>
                      
                    </div>
                  
                  <div className="subgroup-list-head">{group}<ChevronRight size={13} strokeWidth={2} /></div>
                 
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
                                setIsOpen(false),                     
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
            
          </div></div>

      


                               <div className="site-collection-footer"
                               >
            
                                 <div className="collection-footer-info"
                               >
                                 <span>Get in touch </span>
                                  <div className="collection-footer-icon-wrapper">
                                    
                                    <FaFacebook/> 
                                      <FaInstagram />
                                    < FaYoutube/> 
                                    <  FaTiktok /> 
                                    <FaLinkedinIn/> 
                                  
                                  
                                  </div>
                                </div>
            
                                <div className="collection-footer-info">
                                <span><AnimatedUnderline>Cancel Order</AnimatedUnderline></span>
                                <span><AnimatedUnderline>Order History</AnimatedUnderline></span>
                                <span><AnimatedUnderline>Payment Methods</AnimatedUnderline></span>
                             
                             
                                 </div>
                                 
                                
                               
                                <div className="collection-footer-info"
                                 >
                                  <div className="collection-footer-contact-wrapper">
                                    <div className="collection-footer-contact">
                                      <span>For press contacts:</span>
                                      <span><AnimatedUnderline>press@saras.com</AnimatedUnderline> </span>
                                    </div>
                                
                                  </div>
                                 
                                  <span></span>
                                </div>

                                <div className="collection-footer-info"
                                >
                                  <div className="collection-footer-link-wrapper">
                                    <span>Shiho HQ</span>
                                    <span>42, Harbour View Road , Lower Parel</span>
                                   
                                  </div>
                                  <div className="collection-footer-telephone">
                                    <span>Tel:</span>
                                    <span>+91 22 4567 8900</span>
                                  </div>
                                </div>


                                <div className="collection-footer-info"
                                  >
                                  <div className="collection-footer-link-wrapper collection-footer-copyright">
                                     <span>© 2026 Shiho India Pvt. Ltd.</span>
                              
                                  <span>  Studio North.</span>
                                      <span> All Rights Reserved</span>
                                  </div>
                                 
                                
                                </div>
                               </div>
                               </div>






     </div>
  )
}


