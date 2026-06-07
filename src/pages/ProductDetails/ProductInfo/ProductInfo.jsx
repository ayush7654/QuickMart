import { useState, useEffect } from 'react'
import { useFirebase } from '../../../components/FirebaseContext/Firebase';
import { useNavigate } from 'react-router-dom';
import { useCartList } from '../../../components/CartListProvider';
import { Link } from 'react-router-dom';
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton';
import './ProductInfo.css'
import StarRating from '../../../components/StarRating'

import { FiPlus, FiMinus } from "react-icons/fi";

export default function ProductInfo({ product }) {

    if (!product) return <div>Loading...</div>;

const { 
    title, 
    price, 
    description, 
    availabilityStatus, 
    images, 
    rating ,
    brand,
    discountPercentage,
    category
  } = product;


    const { handleRemove, updateDataBase, cartList } = useCartList();
    const navigate = useNavigate();
    const firebase = useFirebase();
    const userInfo = firebase.isLoggedIn ? firebase.currentUser.email : null

    const [quantity, setQuantity] = useState(1);
    const [AddedtoCart, setAddedtoCart] = useState(false)
    const [pdColor, setpdColor] = useState('Brown')
    const [pdSize, setPdSize] = useState('M')

  
    const itemInCart = cartList.find(item => item.id === product.id);

 
useEffect(() => {
   
    setAddedtoCart(!!itemInCart);
    
    if (itemInCart) {
        setQuantity(itemInCart.quantity);
    }
}, [itemInCart]);
   
    const handleIncrease = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        
        if (AddedtoCart) {
            updateDataBase(product, newQty);
        }
    };

   
    const handleDecrease = () => {
        if (quantity > 1) {
            const newQty = quantity - 1;
            setQuantity(newQty);
            
            if (AddedtoCart) {
                updateDataBase(product, newQty);
            }
        }
    };

 function handleClick() {
    if (firebase.isLoggedIn) {
        if (AddedtoCart) {
            handleRemove(title);
    
        } else {
            updateDataBase(product, quantity);
        }
    } else {
        navigate("/login");
    }
}

    // --- Static Arrays ---
    const pdColorArr = [
        { id: 0, colorName: 'Brown', color: 'rgba(110, 86, 86, 1)' },
        { id: 1, colorName: 'Grey', color: 'rgba(143, 143, 143, 1)' },
        { id: 2, colorName: 'Blue', color: 'rgba(0, 77, 165, 1)' },
        { id: 3, colorName: 'Red', color: 'rgb(135, 0, 0)' }
    ]

    const pdSizeArr = [
        { id: 0, sizeLetter: 'S' },
        { id: 1, sizeLetter: 'M' },
        { id: 2, sizeLetter: 'L' },
        { id: 3, sizeLetter: 'XL' },
        { id: 4, sizeLetter: 'XXL' },
    ]

 console.log('product info' , product)

    return (
        <div className="product-info-pd">
           
                 <div className="pd-navBar"> <Link to='/store'>Store&nbsp;</Link>/<span>&nbsp; {brand?brand:category} </span></div>
            <h2 className='pd-title-wrapper'>{title}</h2>

            <div id='pd-line-wrapper' className='pd-price-rating-wrapper'>
                <div className='pd-price-wrapper'>
                    <span className='pd-price'>${(((100 - discountPercentage) * price) / 100).toFixed(2)}</span>
                    <span className='pd-old-price'>${price}</span>
                </div>
                <div className='pd-rating-wrapper'>
                    <StarRating rating={Math.round(rating)} className='pd-star' /> 
                    <span>{rating.toFixed(1)}</span>
                </div>
            </div>

            <div className='pd-description-wrapper'>
              
                <p> {description} </p>
            </div>

            <div className='pd-color-wrapper'>
                <div>
                    <span id='pd-head'>Color :</span>
                    <span id='pd-head-info'> {pdColor}</span>
                </div>
                <div className='color-selector'>
                    {pdColorArr.map(item => (
                        <div key={item.id} onClick={() => setpdColor(item.colorName)}
                            className={`pd-color-container ${item.colorName === pdColor ? 'selected-color' : ''}`}>
                            <div className="pd-color" style={{ backgroundColor: item.color }}></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='pd-size-wrapper'>
                <div id='pd-line-wrapper' className='size-head'>
                    <div>
                        <span id='pd-head'>Size :</span>
                        <span id='pd-head-info'> {pdSize}</span>
                    </div>
                    <span className='size-chart-link'>View Size Chart</span>
                </div>
                <div className='size-selector'>
                    {pdSizeArr.map(item => (
                        <span key={item.sizeLetter} onClick={() => setPdSize(item.sizeLetter)} 
                            className={`pd-size ${item.sizeLetter === pdSize ? 'selected-size' : ''}`}>
                            {item.sizeLetter}
                        </span>
                    ))}
                </div>
            </div>

            <div id='pd-line-wrapper' className='pd-button-wrapper'>
                <div className='pd-quantity-wrapper'>
                    <span className='pd-quantity-btn' onClick={handleDecrease}><FiMinus /></span>
                  
                    <span className='pd-quantity'>{quantity}</span>

                    <span className='pd-quantity-btn' onClick={handleIncrease}><FiPlus /></span>
                </div>

                <div onClick={handleClick}
                    style={{ opacity:availabilityStatus === 'Out Of Stock' ? .5 : 1 }}
                    className={`pd-Add-btn ${firebase.isLoggedIn ? (AddedtoCart ? 'pd-added' : '') : 'pd-Login'} `}>
                        <ScrollButton text= {firebase.isLoggedIn ? AddedtoCart ? 'Remove From Cart' : 'Add To Cart' : 'Log In To Shop'}/>
                   
                </div>
            </div>

            <div className='pd-info-note'>
                <span>Please note: delivery fees will be calculated at checkout</span>
                <span>Free delivery for orders over D2000 incl. VAT.</span>
            </div>
        </div>
    )
}