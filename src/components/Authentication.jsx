import React,{useContext} from "react";
import { useFirebase } from "./FirebaseContext/Firebase";
import { BreadCrumbContext } from "../App";
import {Outlet, Navigate,Link} from 'react-router-dom'
import { useOutletContext } from "react-router-dom";
import firebase from "firebase/compat/app";
export default function Authentication(){
    
   /*  const loginState= localStorage.getItem("LoginState") */
    
    const cartList = useOutletContext()
    const firebase= useFirebase()
    const[BreadCrumbs,setbreadcrumbs]=useContext(BreadCrumbContext)
   
    let loginState= firebase.isLoggedIn // make this a boolean to dectect if any user is logged in 
    
    return(<>
    {loginState?<Outlet context= {cartList}/>:<div style={{backgroundColor:'grey', height:'80vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    <h2>Please login to see your Cart</h2>
    <Link onClick={()=>setbreadcrumbs("LOGIN")} to="/login">Go to login Page</Link>
    </div>}
    
    
    </>
        
    )
}