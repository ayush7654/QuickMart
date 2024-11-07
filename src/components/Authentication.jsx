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
        <div className="cartOut-text">
        <div>Log in to see your Cart</div>
        <Link to="/login">Go to login Page →</Link>
        </div>
        <div className="cart-BG">

        </div>

    </div>}
    
    
    </div>
        
    )
}