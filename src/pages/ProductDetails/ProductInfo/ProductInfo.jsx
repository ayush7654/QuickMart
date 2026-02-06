import {useState,useEffect} from 'react'
import { useFirebase } from '../../../components/FirebaseContext/Firebase';
import { useNavigate } from 'react-router-dom';
import { useCartList } from '../../../components/CartListProvider';
import './ProductInfo.css'
import StarRating from '../../../components/StarRating'

import { FiPlus, FiMinus } from "react-icons/fi";
import CornerImgWrapper from '../CornerImgWrapper/CornerImgWrapper';
import IconButton from '../../../components/IconButton/IconButton';

export default function ProductInfo({product}) {

    const [quantity, setQuantity] = useState(1);

       const [AddedtoCart,setAddedtoCart]= useState(false)

   const [pdColor,setpdColor]= useState('Brown')   

   const [pdSize,setPdSize] = useState('M')

   const navigate = useNavigate();

       const firebase= useFirebase()
       const userInfo = firebase.isLoggedIn?firebase.currentUser.email:null

      const {handleRemove,cartList} = useCartList();
   
    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
 
    const updataDataBase=async()=>{

        const productInfo = {
            ...product,
            quantity: quantity
        };
        console.log('this is productInfo',productInfo)
        await firebase.storeDataInFB("users",userInfo,"CartItems",product.title,productInfo)
    }

   
    function handleClick() {
        if (firebase.isLoggedIn){
             if (AddedtoCart) {
            // If already added to cart, delete it
           /*  deleteFromDataBase(); */
           handleRemove(product.title);
           console.log('the product was removed')
        } else {
            // If not added, add it to the database
            updataDataBase();
        }
        // Toggle the state
        setAddedtoCart(prev => !prev);
        }

        else{
             navigate("/login");  
        }
       
    }

useEffect(() => {
    // 1. Check if cartList exists and has items
    if (cartList && cartList.length > 0) {
        
        // 2. Check if any item in the cart matches the current product ID
        const isAlreadyInCart = cartList.some(item => item.id === product.id);
        
        // 3. Update the state
        setAddedtoCart(isAlreadyInCart);
        
    } else {
        // 4. If the cart is empty, the item definitely isn't in it
        setAddedtoCart(false);
    }
}, [cartList, product.id]);

    const pdColorArr=[{id:0,colorName:'Brown',color:'rgba(110, 86, 86, 1)'},
      {id:1,colorName:'Grey',color:'rgba(143, 143, 143, 1)'},
      {id:2,colorName:'Blue',color:'rgba(0, 77, 165, 1)'},
      {id:3,colorName:'Red',color:'rgb(135, 0, 0)'}]

    const pdSizeArr=[
      {id:0,sizeLetter:'S',sizeNum:8},
      {id:0,sizeLetter:'M',sizeNum:10},
      {id:0,sizeLetter:'L',sizeNum:12},
      {id:0,sizeLetter:'XL',sizeNum:14},
      {id:0,sizeLetter:'XXL',sizeNum:16},
    ]


     function switchColor(e){
     setpdColor(e)
    }

  return (
     <div  className="product-info-pd">        
   <span className='pd-brand-wrapper'>
    {product.brand}
   </span>

   <h2 className='pd-title-wrapper'>
    {product.title}
   </h2>

   <div id='pd-line-wrapper' className='pd-price-rating-wrapper'>
    <div className='pd-price-wrapper'>
      <span className='pd-price'>${(((100-product.discountPercentage)*product.price)/100).toFixed(2)}</span>
      <span className='pd-old-price'>${product.price}</span>
    </div>

    <div className='pd-rating-wrapper'>
      <span>  <StarRating rating={product.rating}  className='pd-star'/></span>
      <span>{product.rating}</span>
    </div>
   </div>


  
<div className='pd-description-wrapper'>
  <div className='pd-description-head'> Description : </div>
  <p> {product.description} </p>
</div>

<div className='pd-color-wrapper'>
     <div >
        <span id='pd-head'>Color :</span>
        <span id='pd-head-info'> {pdColor}</span>
      </div>
    <div className='color-selector'>
        {pdColorArr.map(item=> 
            <div onClick={()=>switchColor(item.colorName)}
             className={`pd-color-container ${item.colorName==pdColor?'selected-color':''}`}>
                <div className="pd-color" style={{backgroundColor:item.color}}></div>
            </div>)}
    </div>
   </div>


   <div  className='pd-size-wrapper'>
    <div id='pd-line-wrapper' className='size-head'>
      <div >
        <span id='pd-head'>Size :</span>
        <span id='pd-head-info'> {pdSize}</span>
      </div>
      <span className='size-chart-link'>View Size Chart</span>
      
      </div>
      <div className='size-selector'>
      
    {pdSizeArr.map(item=><span onClick={()=>setPdSize(item.sizeLetter)} className={`pd-size ${item.sizeLetter==pdSize?'selected-size':''}`}>{item.sizeLetter}</span>)}
      </div>
   </div>


   


   <div id='pd-line-wrapper' className='pd-button-wrapper'>
    <div className='pd-quantity-wrapper'>
      <span className='pd-quantity-btn' onClick={handleDecrease}><FiMinus/></span>
      <span className='pd-quantity'>{quantity}</span>
      <span className='pd-quantity-btn' onClick={handleIncrease}><FiPlus/></span>
    </div>

     <div  onClick={handleClick} 
     style={{opacity:product.availabilityStatus==='Out Of Stock'?.5:1}} 
     className={`pd-Add-btn ${firebase.isLoggedIn? (AddedtoCart ? 'pd-added' : ''):'pd-Login'} `}>
     {firebase.isLoggedIn? AddedtoCart  ? 'Remove From Cart' : 'Add To Cart':'Log In To Shop'}
    </div> 
 
   </div>

    


<div className='pd-info-note'>
  <span>Please note: delivery fees will be calculated at checkout</span>
  <span>Free delivery for orders over D2000 incl. VAT.</span>

</div>


    
     
         </div>
  )
}
