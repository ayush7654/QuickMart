import React from 'react'
import { Link } from 'react-router-dom'
import ScrollButton from '../../../../components/ScrollingButton/ScrollingButton'
import './Reg_In.css'
export default function Reg_In({firebase}) {
  return (
    <div className='account-loggedIn-div'>

      <div className='regIn-greeting-div'>
        <div className='regIn-User'>Hi, {firebase.currentUser.displayName}</div>
       <div className='regIn-Greeting'>Welcome to SAARAS</div>
       <div className='regIn-Para'>We bring you a seamless shopping journey with efficient, trustworthy service, so you spend less time waiting and more time enjoying.</div>
      </div>
     
       
     
       {/* <Link id='account-button' className='regIn-link' to='/'>Get Started →</Link> */}

            <Link  to='/'
     id='account-button' 
    /*  className={email || password ?'account-button-active':'account-button-inactive'} */
      >
          <ScrollButton
  text='Get Started →'
  theme={'darkMode'}
  color="#cf7729ff"
  themeOnHover={'colorMode'}

/>
      </Link>
      
      </div>
  )
}
