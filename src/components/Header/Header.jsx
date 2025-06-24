import {useState,useEffect} from "react";
import {NavLink, Link, useLocation,useNavigate} from 'react-router-dom'
import { Search } from "react-feather";
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import { AiFillHome } from 'react-icons/ai';
import { HiOutlineUser, HiUser } from 'react-icons/hi';
import { HiShoppingCart,HiOutlineShoppingCart } from 'react-icons/hi';
 import { FaHeart } from 'react-icons/fa';    // Filled heart
import { FiHeart } from 'react-icons/fi';   
import { MdLogin } from 'react-icons/md';

import './Header.css'
export default function Header(){

    const firebase= useFirebase()

    console.log('username',firebase.currentUser)
    

    const elements = [
       
        {title:"CART ", path:'/cart',logo:<div className="header-cartLogo-div"><HiOutlineShoppingCart id="ol-header-logo" size={20}/><HiShoppingCart id="fd-header-logo" size={20}/></div>},/*'QMicons/cartLogoOl2.png'  */
        {title:"WISHLIST ", path:'/wishlist',logo:<div className="header-wishlistLogo-div"><FiHeart  id="ol-header-logo" size={20}/><FaHeart id="fd-header-logo" size={20}/></div>},/*'QMicons/heartIconOl5.png'  */
        {title:firebase.isLoggedIn?'NAME':'LOGIN',path:'/login',logo:firebase.isLoggedIn?<div className="header-userLogo-div"><HiOutlineUser  id="ol-header-logo" size={20}/><HiUser id="fd-header-logo" size={20}/></div>:<MdLogin size={20} />}/*'QMicons/userIconOl.png'  */
        ] 


    const navElements= [{title:'HOME',path:'/'},{title:'STORE',path:'/store?page=1'},{title:'ABOUT',path:'/about'},{title:'BLOG',path:'/blog'},{title:'CONTACT',path:'/contact'}]

    const [searchTerm,setSearchTerm]= useState('')

    const[suggestions,setSuggestions]= useState([])

    const[suggestionBox,setSuggestionBox]= useState(false)

    const[categories,setCategories]= useState(null)

    

    const navigate= useNavigate();

    function handleChange(e){
        setSearchTerm(e.target.value)
        setSuggestionBox(true)
       
    }
    
    function handleClick(name,slug){
        setSearchTerm(name)
        setSuggestionBox(false)
        navigate(`store?type=${slug}`)
    }
    

   useEffect(()=>{
    const fetchData= async()=>{
        try{
            const response = await fetch('https://dummyjson.com/products/categories')
            const result = await response.json()
            setSuggestions(result)
        }
        catch(er){
            console.error(er)
        }
    }

    fetchData();
   },[searchTerm,suggestionBox])

   useEffect(()=>{
    const fetchCategory= async()=>{
    const response= await fetch("https://dummyjson.com/products/categories")
    const data = await response.json()
    setCategories(data)
  
    }
    fetchCategory();
    },[])

   const suggestionComp= suggestions?suggestions.filter(item=>item.name.toLowerCase().includes(searchTerm.toLowerCase())):null;
    
  

 
   const categoryArr= categories? (window.innerWidth>775? categories.slice(12,20): categories.slice(12,16)):'loading'
   console.log('arr is',categoryArr)

    const location= useLocation()
    console.log(location)

   
    return(<div className="sticky-header">


        <div className="header-home">

        <div className="logo-title">
        <img src='/QMSiteLogo46.png'  className="logoImg"  /> 
        <div  className="header-logo-name">

        </div>
      
        </div>

     

     

        <div className="header-searchBar-div" >
            <div className="header-searchBar" >
            <input  className="header-search-box" placeholder="SEARCH" value={searchTerm} onChange={handleChange}/>
            <div style={{ position:'absolute',right:'10px'}} ><Link style={{color:'black'}} to={`/search/${searchTerm}` }> <Search style={{color:'grey'}}/></Link></div>
            </div>

            <div className="suggestionBox">
                {suggestionBox && searchTerm && suggestionComp?suggestionComp.map(item=><div onClick={()=>handleClick(item.name,item.slug)} key={item.name}><div className="suggestion">{item.name}</div></div>):null}
            </div>
           
            
        </div> 



         <div className='Home-Nav-Container'>
            {elements.map((element,index)=> <NavLink   key={index} className={({isActive})=>isActive?'navlink-selected':'navlink'} to={element.path}><div id="header-icon">{element.logo}{/* {<img src={`/${element.logo}`} id='header-nav-Icon'/> } */}</div> <div id='header-nav-name'>{element.title}</div>  <div></div></NavLink>)}
         </div>

        <div className="header-backArrow"> <Link style={{color:'white'}} to={`/store${location.state?location.state:'?page=1'}`}  >←</Link> </div>
         
        
    </div>
    <div className="productDetails-nav-container">
      <div className='blackLine'></div>
     <div className="productDetails-nav">  
   {/*  <Link to={`/store${location.state?location.state:'?page=1'}`} className="backToStore">←</Link> */} 
    {navElements 
  ? navElements.map(item => (
      <NavLink to={item.path} className={({isActive})=>isActive?'productDetails-nav-item-selected':'productDetails-nav-item'}  key={item.path}>
        {item.title}
      </NavLink>
    ))
  : <div>loading</div>
}
    </div>
     </div> 
    </div>
    
    
    
        
    )
}