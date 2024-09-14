import {useState,useContext} from "react";
import {NavLink, Link} from 'react-router-dom'
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

   
    return(<div>
        <div className="header">
        <div className="logo-title">
        <div className="logo-name">
        <img src="/src/assets/logo.png" width="45px" alt='Website-Logo'/>
        <div className="name">QuickMart</div>
        </div>
        <div>Quick Deals, Quick Feels </div>
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