import {useState,useEffect} from "react";
import {NavLink, Link, useLocation,useNavigate} from 'react-router-dom'
import { Search } from "react-feather";
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import './Header.css'
export default function Header(){

    const firebase= useFirebase()

    console.log('username',firebase.currentUser)
    

    const elements = [{title:"HOME ",path:'/',logo:'homelogo2'},
        {title:"STORE ",path:'/store?page=1',logo:'storeLogo3'},
        {title:"CART ", path:'/cart',logo:'cartlogo'},
      
        {title:firebase.isLoggedIn?'Name':'LOGIN',path:'/login',logo:firebase.isLoggedIn?'userIcon':'loginlogo'}]

    const [searchTerm,setSearchTerm]= useState('')

    const[suggestions,setSuggestions]= useState([])

    const[suggestionBox,setSuggestionBox]= useState(false)

    

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

   const suggestionComp= suggestions?suggestions.filter(item=>item.name.toLowerCase().includes(searchTerm.toLowerCase())):null;
    
  

 

    const location= useLocation()
    console.log(location)

   
    return(<div className="sticky-header">
        <div className="header-home">
        
        <div className="logo-title">
        <img src='/SiteLogo3.png'  className="logoImg"  />
        <div  className="logo-name">
        <div className="name">QuickMart</div>
        <div className="tagline" style={{color:'white',paddingBottom:'20px'}}>Quick Deals, Quick Feels </div>
        </div>
      
        </div>
       
        
        <div className="header-searchBar-div" >
            <div className="header-searchBar" >
            <input  className="header-search-box" placeholder="What are you looking for?" value={searchTerm} onChange={handleChange}/>
            <div style={{ position:'absolute',right:'10px'}} ><Link style={{color:'black'}} to={`/search/${searchTerm}` }> <Search style={{color:'grey'}}/></Link></div>
            </div>

            <div className="suggestionBox">
                {suggestionBox && searchTerm && suggestionComp?suggestionComp.map(item=><div onClick={()=>handleClick(item.name,item.slug)} key={item.name}><div className="suggestion">{item.name}</div></div>):null}
            </div>
           
            
        </div>
        
       
        
       
         <div className='Home-Nav-Container'>
            {elements.map((element,index)=> <NavLink   key={index} className={({isActive})=>isActive?'navlink-selected':'navlink'} to={element.path}> <img src={`/${element.logo}.png`} width='20px'/><div>{element.title}</div></NavLink>)}
         </div>
        
         
        
    </div>
    </div>
    
    
    
        
    )
}