import {useState, useEffect} from 'react'
import './SiteMenu.css'
import CategoryDataProvider from '../../pages/Store/ExpandingStoreHeader/CategoryDataProvider';
import AnimatedUnderline from '../AnimatedUnderline/AnimatedUnderline';
import { useStoreData } from '../StoreDataContext';
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

 const categoryImgs = [
    {id:0, img: ['Clothing1.jpg','Clothing2.jpg'],},
    {id:1,img :['IphoneDuo4.jpg','IphoneDuo.jpg']},
    {id:2, img:['skincare1.jpg','skincare2.jpg']},
    {id:3, img:['GreenGems.jpg','Green-Gems.jpg']},
    {id:4, img:['Football5.jpg','Football6.jpg']},
    {id:5, img: ['DailyItem2.jpg','Grocery.jpg']}

  ]

export default function SiteMenu() {

    const {handleTypeFilter,isOpen, setIsOpen,currentCategory} = useStoreData();
    const { categorizedData, loading , selectedGroup} = CategoryDataProvider();
    const [selectedSubGroupId,setSelectedSubGroupId] = useState(null);
    const [selectedCategoryId,setSelectedCategoryId] = useState(null)
    const [activeGroup, setActiveGroup] = useState(null);


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

    

    console.log('active group', currentCategory)

  return (
    <div className={`site-menu ${isOpen ? "site-menu-open" : ""}`}>
      <div className="site-menu-content">

       <div className="site-menu-space"></div>

            <div className="site-menu-layout">
                <div className="menu-layout-content">
                 <div className="subgroup-content-wrapper">
                    <div className='subgroup-content-head'>Collections</div>
                {(selectedSubGroupId != null ) && (
                  <div className="subgroup-content">
                
                 <div className="subgroup-new">
                   {Object.keys(categorizedData).map((group,index)=>
                  <div className="subgroup-list-wrapper" >
                  <div className="subgroup-list-head">{group}</div>
                 
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
                
                  </div>
                
                )}
                
                 </div>


                   <div className={`category-grid-wrapper ${isOpen ? 'is-active' : ''}`}>
                 
                 
                    <div className="category-grid">
                 
                 {categoryImgs[selectedSubGroupId]?.img.map((imgPath, index) => (
                   <div className="catgeory-img-wrapper">
                     <img src={`StoreMedia/${imgPath}`}/>
                 
                   </div>
                 ))}
                   
                    </div>
                 </div>
            
                 </div>
            </div>

             <div className="menu-footer-wrapper">
                               <div className="site-menu-footer"
                               >
            
                                 <div className="menu-footer-info"
                               >
                                 <span>Get in touch </span>
                                  <div className="menu-footer-icon-wrapper">
                                    
                                    <FaFacebook/> 
                                      <FaInstagram />
                                    < FaYoutube/> 
                                    <  FaTiktok /> 
                                    <FaLinkedinIn/> 
                                  
                                  
                                  </div>
                                </div>
            
                                <div className="menu-footer-info">
                                <span><AnimatedUnderline>Cancel Order</AnimatedUnderline></span>
                                <span><AnimatedUnderline>Order History</AnimatedUnderline></span>
                                <span><AnimatedUnderline>Payment Methods</AnimatedUnderline></span>
                             
                             
                                 </div>
                                 
                                
                               
                                <div className="menu-footer-info"
                                 >
                                  <div className="menu-footer-contact-wrapper">
                                    <div className="menu-footer-contact">
                                      <span>For press contacts:</span>
                                      <span><AnimatedUnderline>press@saras.com</AnimatedUnderline> </span>
                                    </div>
                                
                                  </div>
                                 
                                  <span></span>
                                </div>

                                <div className="menu-footer-info"
                                >
                                  <div className="menu-footer-link-wrapper">
                                    <span>Shiho HQ</span>
                                    <span>42, Harbour View Road , Lower Parel</span>
                                   
                                  </div>
                                  <div className="menu-footer-telephone">
                                    <span>Tel:</span>
                                    <span>+91 22 4567 8900</span>
                                  </div>
                                </div>


                                <div className="menu-footer-info"
                                  >
                                  <div className="menu-footer-link-wrapper menu-footer-copyright">
                                     <span>© 2026 Shiho India Pvt. Ltd.</span>
                              
                                  <span>  Studio North.</span>
                                      <span> All Rights Reserved</span>
                                  </div>
                                 
                                
                                </div>
                               </div>
                               </div>
      </div>
     </div>
  )
}
