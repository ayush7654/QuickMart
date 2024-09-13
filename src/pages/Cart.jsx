import {useEffect, useState} from "react";
import {useOutletContext,useLocation} from 'react-router-dom'
import { useFirebase } from "../components/FirebaseContext/Firebase";

export default function Cart(){
    const[cartList,setcartList]= useState([])

    const firebase= useFirebase()
    const userInfo = firebase.isLoggedIn?firebase.currentUser.email:null
    const fetchData=async()=>{
        const cartItem= await firebase.getDataFromFB("users",userInfo,"CartItems")
        cartItem.forEach(item=>setcartList(prev=>[...prev,item.data().Product]))
       
      
    }

   useEffect(()=>{
    fetchData()
   },[])
 
    const cartElements=cartList? (cartList.map((product,index)=>(
        <div key={index} className="Cart-item">
           <img src={product.images[0]} width="200px"/>
            <h3>{product.title}</h3>
            <h3>Price: {product.price}</h3>
        </div>))):"loading..";
   
    return(<>
    {cartList?<>
    <h2>This is your Cart</h2>
    <h3>Total items: {cartList.length}</h3>
    </>:<h2>So empty :/</h2>}
    {cartElements}
    
    </>
    
    )
}