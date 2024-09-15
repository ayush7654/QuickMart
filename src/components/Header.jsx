import {useState,useContext} from "react";
import {NavLink, Link, useLocation} from 'react-router-dom'
import { Search } from "react-feather";
/* import { BreadCrumbContext } from "../App"; */
export default function Header(){

    const elements = [{title:"HOME",path:''},
        {title:"STORE",path:'store?page=1'},
        {title:"YOUR CART", path:'cart'},
        {title:"ABOUT", path:'about'},
        {title:"LOGIN",path:'login'}]

    const [searchTerm,setSearchTerm]= useState('')
    
   /*  const [Breadcrumbs,setbreadcrumbs] = useContext(BreadCrumbContext) */

    const handleClick=(title)=>{
        setbreadcrumbs(title)
        
         
      
    }

    const location= useLocation()
    console.log(location)

   
    return(<div className="sticky-header">
        <div className={location.pathname==='/'?"header-home":'header'}>
        
        <div style={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'center',gap:'0px'}} className="logo-title">
        <img src='./public/Logofinal3.png' width='72px' style={{paddingTop:'10px'}} />
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} className="logo-name">
        <div className="name">QuickMart</div>
        <div style={{color:'white',paddingBottom:'20px'}}>Quick Deals, Quick Feels </div>
        </div>
      
        </div>

        <div style={{display:'flex', position:'relative',alignItems:'center'}}>
            <input style={{ width: '600px',height:'40px',border: '0px' ,borderRadius:'4px'}} className="header-search-box" placeholder="What are you looking for?" value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}}/>
           <div style={{ position:'absolute',right:'10px'}} ><Link to={`/search/${searchTerm}` }> <Search style={{color:'grey'}}/></Link></div>
            
        </div>
       
        
       
         <div className='Home-Nav-Container'>
            {elements.map((element,index)=> <NavLink onClick={()=>handleClick(element.title)}  key={index} className={({isActive})=>isActive?'navlink-selected':'navlink'} to={`/${element.path}`}>{element.title}</NavLink>)}
         </div>
         {/* <div>{Breadcrumbs}</div> */}
         
        
    </div>
    </div>
    
    
    
        
    )
}