import React ,{useState}from "react";
import "./Testing.css";
import IconButton from "../IconButton/IconButton";



export default function Testing() {


const [isActive,setIsActive]= useState(false)


  return (
    <div className="testing-div">
   
     <div onClick={()=>setIsActive(prev=>!prev)} className={`test-box ${isActive?'box-active':''}`}></div>
    </div>
  );
};
