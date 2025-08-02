import {useState} from 'react'
import { useFirebase } from '../../../components/FirebaseContext/Firebase';
import './ProductInfo.css'
import StarRating from '../../../components/StarRating'

export default function ProductInfo({product}) {

    const [quantity, setQuantity] = useState(1);

       const [AddedtoCart,setAddedtoCart]= useState(false)

   const [pdColor,setpdColor]= useState('Black')   

       const firebase= useFirebase()
       const userInfo = firebase.isLoggedIn?firebase.currentUser.email:null
   
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

    const deleteFromDataBase = async () => {
        await firebase.deleteDataInFB("users", userInfo, "CartItems", product.title);
    };
   
    function handleClick() {
        if (AddedtoCart) {
            // If already added to cart, delete it
            deleteFromDataBase();
        } else {
            // If not added, add it to the database
            updataDataBase();
        }
        // Toggle the state
        setAddedtoCart(prev => !prev);
    }

 

    const pdColorArr=[{id:0,colorName:'Black',color:'rgb(0,0,0)'},{id:1,colorName:'Grey',color:'rgb(113, 113, 113)'},{id:2,colorName:'Blue',color:'rgb(0, 61, 130)'},{id:3,colorName:'Red',color:'rgb(135, 0, 0)'}]

     function switchColor(e){
     setpdColor(e)
    }

  return (
     <div  className="product-info-pd">
          
           
        <div className="product-title-div" >
          <div className='product-brandname-div' >
            <div className="pd-brandName">
  {product.brand ? product.brand : product.category.charAt(0).toUpperCase() + product.category.slice(1)}
</div>

            <div id='pd-line'></div>
            </div>
          <div className="pd-title">{product.title}</div>
          </div> 
          <div className="product-info-price-div">
        <div className="price-num">${product.price}</div>
        <div  className="product-info-rating-div">
            
            <StarRating rating={product.rating} starSize={30}/>
           
          
        </div>
        </div>


        <div style={{border:'0px solid red'}}>
        
        <div className="product-description" >{product.description}</div>
        </div>

        <div className="pd-colorpick-div">
          <div className="pd-colorpick">

            {pdColorArr.map(item=> <div onClick={()=>switchColor(item.colorName)} className={item.colorName==pdColor?"pd-color-div-selected":"pd-color-div"}><div id="pd-color" style={{backgroundColor:item.color}}></div></div>)}

          </div>
            <div  id='pd-subHead'>Color  <span className='pd-subInfo'>{pdColor}</span></div>
        </div>
       
     
      
       
           
           
            <div id='pd-subHead' className="policy-ship-div" >
                <span>Return Policy</span>
                <span className='pd-subInfo'> {product.returnPolicy}</span>
            </div>

           <div id='pd-subHead' >
            <span>Shipment</span>
            <span  className='pd-subInfo'>{product.shippingInformation}</span>
            </div>

           <div id='pd-subHead' style={{display:'flex'}} className="stock-div">
            <span id='pd-subHead' >Stocks Left </span>
            <span  className='pd-subInfo'> {product.stock}</span>
           </div>
         
         
        <div className="quantity-container-div">
           <div id='pd-subHead' >Select Quantity:</div>
           <div className="quantity-container">
           <div
                className="decrease-btn" 
                onClick={handleDecrease} 
                disabled={quantity === 1}
            >
                -
            </div>
            <input 
                type="text" 
                className="quantity-input" 
                value={quantity} 
                readOnly
            />
            <div className="increase-btn" onClick={handleIncrease}>
                +
            </div>
           </div>
         
          
        </div>
       
        
     
        <div
  className={`addTocartBtn ${AddedtoCart ? 'added' : ''}`}
  onClick={handleClick}
  
>
  {AddedtoCart ? 'ADDED TO CART' : 'ADD TO CART'}
</div>
     
         </div>
  )
}
