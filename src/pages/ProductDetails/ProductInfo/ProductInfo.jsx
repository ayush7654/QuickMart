import { useState, useEffect } from 'react'
import { useFirebase } from '../../../components/FirebaseContext/Firebase';
import { useNavigate } from 'react-router-dom';
import { useCartList } from '../../../components/CartListProvider';
import './ProductInfo.css'
import StarRating from '../../../components/StarRating'

import { FiPlus, FiMinus } from "react-icons/fi";

export default function ProductInfo({ product }) {
    const { handleRemove, updateDataBase, cartList } = useCartList();
    const navigate = useNavigate();
    const firebase = useFirebase();
    const userInfo = firebase.isLoggedIn ? firebase.currentUser.email : null

    const [quantity, setQuantity] = useState(1);
    const [AddedtoCart, setAddedtoCart] = useState(false)
    const [pdColor, setpdColor] = useState('Brown')
    const [pdSize, setPdSize] = useState('M')

    // 1. Find the item in the global cart list
    const itemInCart = cartList.find(item => item.id === product.id);

 
useEffect(() => {
    // !! converts the object to a boolean (true if exists, false if null)
    setAddedtoCart(!!itemInCart);
    
    if (itemInCart) {
        setQuantity(itemInCart.quantity);
    }
}, [itemInCart]); // Removed cartList from deps to prevent over-triggering

    // 3. Smart Increase: Updates local state AND Database (if item is in cart)
    const handleIncrease = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        
        if (AddedtoCart) {
            updateDataBase(product, newQty);
        }
    };

    // 4. Smart Decrease: Updates local state AND Database (if item is in cart)
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
            handleRemove(product.title);
            // DO NOT setAddedtoCart here. The useEffect above will catch it 
            // once the Provider's cartList updates.
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

    return (
        <div className="product-info-pd">
            <span className='pd-brand-wrapper'>{product.brand}</span>
            <h2 className='pd-title-wrapper'>{product.title}</h2>

            <div id='pd-line-wrapper' className='pd-price-rating-wrapper'>
                <div className='pd-price-wrapper'>
                    <span className='pd-price'>${(((100 - product.discountPercentage) * product.price) / 100).toFixed(2)}</span>
                    <span className='pd-old-price'>${product.price}</span>
                </div>
                <div className='pd-rating-wrapper'>
                    <StarRating rating={product.rating} className='pd-star' />
                    <span>{product.rating}</span>
                </div>
            </div>

            <div className='pd-description-wrapper'>
                <div className='pd-description-head'> Description : </div>
                <p> {product.description} </p>
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
                    {/* FIX: Use the 'quantity' state here, not product.quantity */}
                    <span className='pd-quantity'>{quantity}</span>
                    <span className='pd-quantity-btn' onClick={handleIncrease}><FiPlus /></span>
                </div>

                <div onClick={handleClick}
                    style={{ opacity: product.availabilityStatus === 'Out Of Stock' ? .5 : 1 }}
                    className={`pd-Add-btn ${firebase.isLoggedIn ? (AddedtoCart ? 'pd-added' : '') : 'pd-Login'} `}>
                    {firebase.isLoggedIn ? AddedtoCart ? 'Remove From Cart' : 'Add To Cart' : 'Log In To Shop'}
                </div>
            </div>

            <div className='pd-info-note'>
                <span>Please note: delivery fees will be calculated at checkout</span>
                <span>Free delivery for orders over D2000 incl. VAT.</span>
            </div>
        </div>
    )
}