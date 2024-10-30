import {useState,useContext} from "react";
import {NavLink, Link, useLocation} from 'react-router-dom'
import { Search } from "react-feather";
import './Header.css'
export default function Header(){

    const elements = [{title:"HOME",path:'/'},
        {title:"STORE",path:'/store?page=1'},
        {title:"CART", path:'/cart'},
      
        {title:"LOGIN",path:'/login'}]

    const [searchTerm,setSearchTerm]= useState('')
    
  

    const handleClick=(title)=>{
        setbreadcrumbs(title)
        
         
      
    }

    const location= useLocation()
    console.log(location)

   
    return(<div className="sticky-header">
        <div className="header-home">
        
        <div className="logo-title">
        <img src='/Logofinal3.png'  className="logoImg"  />
        <div  className="logo-name">
        <div className="name">QuickMart</div>
        <div className="tagline" style={{color:'white',paddingBottom:'20px'}}>Quick Deals, Quick Feels </div>
        </div>
      
        </div>

        <div className="header-searchBar" >
            <input  className="header-search-box" placeholder="What are you looking for?" value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}}/>
           <div style={{ position:'absolute',right:'10px'}} ><Link to={`/search/${searchTerm}` }> <Search style={{color:'grey'}}/></Link></div>
            
        </div>
       
        
       
         <div className='Home-Nav-Container'>
            {elements.map((element,index)=> <NavLink onClick={()=>handleClick(element.title)}  key={index} className={({isActive})=>isActive?'navlink-selected':'navlink'} to={element.path}>{element.title}</NavLink>)}
         </div>
        
         
        
    </div>
    </div>
    
    
    
        
    )
}