import React,{useContext} from "react";
import { useFirebase } from "./FirebaseContext/Firebase";

import {Outlet, Navigate,Link} from 'react-router-dom'
import { useOutletContext } from "react-router-dom";
import CartOut from "../pages/Cart/CartOut";
import CartLoading from "../pages/Cart/CartLoading/CartLoading";


export default function Authentication() {
  const cartList = useOutletContext();
  const firebase = useFirebase();

  const loginState = firebase.isLoggedIn; // boolean
  const authLoadingState = firebase.authLoading;

  return authLoadingState ? (
    <div style={{height:'100vh'}}></div>
  ) : (
    <div>
      {loginState ? <Outlet context={cartList} /> : <CartOut />}
    </div>
  );
}
