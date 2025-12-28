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

  < HiArrowUp size={30}/>
  <  AiOutlineArrowUp size={30}/>
  <   MdArrowUpward size={30}/>
  <    FaCaretUp size={30}/>
  <    AiFillCaretUp size={30}/>
  <     BsCaretUpFill size={30}/>
  <   IoCaretUp size={30}/>
    </div>
  )
}