import React,{useContext} from "react";
import { useFirebase } from "./FirebaseContext/Firebase";

import {Outlet, Navigate,Link} from 'react-router-dom'
import { useOutletContext } from "react-router-dom";
import CartOut from "../pages/Cart/CartOut";
export default function Authentication(){
    
   /*  const loginState= localStorage.getItem("LoginState") */
    
    const cartList = useOutletContext()
    const firebase= useFirebase()

   
    let loginState= firebase.isLoggedIn // make this a boolean to dectect if any user is logged in 
    
    return(<div >
    {loginState?<Outlet context= {cartList}/>:
   <CartOut/>
   }
    
    
    </div>
        
    )
}