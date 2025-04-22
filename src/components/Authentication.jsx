import React,{useContext} from "react";
import { useFirebase } from "./FirebaseContext/Firebase";
import { BreadCrumbContext } from "../App";
import {Outlet, Navigate,Link} from 'react-router-dom'
import { useOutletContext } from "react-router-dom";

export default function Authentication(){
    
   /*  const loginState= localStorage.getItem("LoginState") */
    
    const cartList = useOutletContext()
    const firebase= useFirebase()

   
    let loginState= firebase.isLoggedIn // make this a boolean to dectect if any user is logged in 
    
    return(<div >
    {loginState?<Outlet context= {cartList}/>:
    <div className="Cart-page-Out" >
      
        <div className="cart-BG">
    
        <div className="cartOut-text">
        <img className="cartOut-img" src='QMcartArrow.webp' />
            <div className="cartOut-text-1">Missing Cart items?</div>
        <div className="cartOut-text-2">Login to see the items you added previously</div>
        <Link to="/login" className="cart-Login-btn"> Login </Link>
        </div>
        </div>

    </div>}
    
    
    </div>
        
    )
}