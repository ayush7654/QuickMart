import React from 'react'
import { Link } from 'react-router-dom';
import { MdPerson } from "react-icons/md";   
import './Logged_In.css'
import { signOut } from 'firebase/auth';
import ScrollButton from '../../../../components/ScrollingButton/ScrollingButton';
import CornerImgWrapper from '../../../ProductDetails/CornerImgWrapper/CornerImgWrapper';
import AnimatedUnderline from '../../../../components/AnimatedUnderline/AnimatedUnderline';
import { useCartList } from '../../../../components/CartListProvider';
export default function Logged_In({firebase, signOut}) {


  console.log(firebase)

  const logButtons = [
    {name:'Track Order',img:'./delivery2.png'},
    {name:'Visit Profile',img:'./contact-info.png'},
    {name:'Find Store',img:'./locations.png'},

  ]

  const {cartList} = useCartList()



  return (
    <div className="account-loggedIn-div">
                
      <div className='account-user-info-wrapper'>
        <div className='account-user-info'>
                 <div className='user-img-container'><img src='/MockDP6.jpg'/></div>
        <span  className='user-name'>Phillips Seifert</span>
        </div>
 

        <div className='user-credits-wrapper'>
        <span>USER ID : </span>
        <span className='user-email'>{firebase.currentUser.email}</span>
      </div>
      </div>

      

       <div className='user-activity-wrapper'>
        <div className='user-activity'>
        <span>
  {cartList.length === 0 
    ? "There are no items in your cart." 
    : cartList.length === 1 
      ? "There is 1 item in your cart." 
      : `There are ${cartList.length} items in your cart.`
  }
</span>

          <Link className='user-activity-btn'>
          <AnimatedUnderline
           offset={5}
         color='rgb(0, 100, 255)'
         thickness={1.5}>
            <span>Let's Checkout.</span>
          </AnimatedUnderline>
          </Link>
          </div>
     
       </div>

     
          
                <div  
     id='account-button' 
   
      onClick={signOut} >
          <ScrollButton
  text='Log Out'
  color="rgba(0, 0, 0)"
  theme='buttonFilled'
  themeOnHover='buttonOutline'

/>



      </div>

    
            </div>
  )
}
