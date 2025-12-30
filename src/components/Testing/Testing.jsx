import React, {useState} from 'react'
import './Testing.css'
import MenuCancel from '../MenuCancel/MenuCancel';
import { HiShoppingBag  } from "react-icons/hi2";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";



export default function Testing() {



  return (
    <div className='testing-div'>

<div className="account-input-div">
  <div className="input-heading">Email</div>
  <input
    className="account-input login-email"
    placeholder=" "
    name="email"
   
  />
</div>



    </div>
  )
}