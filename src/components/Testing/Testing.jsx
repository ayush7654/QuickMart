import React ,{useState}from "react";
import "./Testing.css";
import IconButton from "../IconButton/IconButton";
import { ArrowDownUp, ArrowLeftRight, Repeat2 } from 'lucide-react';


export default function Testing() {


const [isActive,setIsActive]= useState(false)


  return (
    <div className="testing-div">
 <ArrowDownUp size={20} />
       <ArrowLeftRight size={20} />
       <Repeat2 size={20} />

    </div>
  );
};
