import {useState,useContext} from "react";
import {NavLink} from 'react-router-dom'
import { BreadCrumbContext } from "../App";
export default function Header(){

    const elements = [{title:"HOME",path:''},
        {title:"STORE",path:'store?page=1'},
        {title:"YOUR CART", path:'cart'},
        {title:"ABOUT", path:'about'},
        {title:"LOGIN",path:'login'}]
    
    const [Breadcrumbs,setbreadcrumbs] = useContext(BreadCrumbContext)

    const handleClick=(title)=>{
        setbreadcrumbs(title)
        
         
      
    }

   
    return(<div>
        <div className="header">
        <div className="logo-title">
        <div>Quick Deals, Quick Feels </div>
        <div className="logo-name">
        <img src="/src/assets/logo.png" width="45px" alt='Website-Logo'/>
        <div className="name">QuickMart</div>
        </div>
        </div>
       
        
       
         <div className='Home-Nav-Container'>
            {elements.map((element,index)=> <NavLink onClick={()=>handleClick(element.title)}  key={index} className={({isActive})=>isActive?'navlink-selected':'navlink'} to={`/${element.path}`}>{element.title}</NavLink>)}
         </div>
         {/* <div>{Breadcrumbs}</div> */}
         
        
    </div>
    </div>
    
    
    
        
    )
}