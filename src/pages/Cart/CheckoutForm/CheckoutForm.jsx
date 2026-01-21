import React, { useState } from 'react';
import './CheckoutForm.css';
import PaymentSection from './PaymentSection/PaymentSection';
import { FiSearch } from "react-icons/fi";

import FloatingInput from '../../../components/FloatingInput/FloatingInput';
const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    contact: '',
    marketing: false,
    country: 'United States',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    saveInfo: false
  });

  const CardIcons =[{name:'visa',icon:''},
    {name:'mastercard',icon:''},
    {name:'americanExpress',icon:''},
    {name:'visa',icon:''}
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="checkout-form-container">
      {/* Contact Section */}
      <div className="form-section">
        <div className="section-header">
          <h2>Contact</h2>
          <a href="/login" className="login-link">Sign in</a>
        </div>
       
        <FloatingInput
        label='Email or mobile phone number'
        name='contact'
        onChange={handleChange}
        

        />
        <label className="checkbox-container">
          <input type="checkbox" name="marketing" onChange={handleChange} />
          <span>Email me with news and offers</span>
        </label>
      </div>

      {/* Delivery Section */}
      <div className="form-section">
          <div className="section-header">
         <h2>Delivery</h2>
        </div>
        
        
        <div className="input-group">
          <select name="country" className='input-select' value={formData.country} onChange={handleChange}>
            <option id='input-option' value="United States">United States</option>
            {/* Add more countries here */}
          </select>
        </div>

        <div className="row">
          <FloatingInput
        label='First name'
        name='firstName'
        onChange={handleChange}
        

        />
         

             <FloatingInput
        label='Last name (optional)'
        name='lastName'
        onChange={handleChange}
        

        />
        </div>

        <div className="input-group input-icon-div">
       
              <FloatingInput
        label='Address'
        name='address'
        onChange={handleChange}
        

        />
          <span className="form-icon">< FiSearch/></span>
        </div>

       
            <FloatingInput
        label='Apartment, suite, etc. (optional)'
        name='apartment'
        onChange={handleChange}
        

        />

        <div className="row three-col">
      
             <FloatingInput
        label='City'
        name='city'
        onChange={handleChange}
        

        />
          <select className='input-select' name="state" onChange={handleChange}>
            <option id='input-option' value="">State</option>
            <option id='input-option' value="CA">California</option>
            <option id='input-option' value="NY">New York</option>
          </select>
            
        
               <FloatingInput
        label='ZIP code'
        name='zip'
        onChange={handleChange}
        

        />
        </div>

        <label className="checkbox-container">
          <input type="checkbox" name="saveInfo" onChange={handleChange} />
          
          <span>Save this information for next time</span>
        </label>
      </div>
      {/* Payment Section */}
      <PaymentSection/>
      
      
    </div>
  );
};

export default CheckoutForm;