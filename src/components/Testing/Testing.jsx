import React ,{useState}from "react";
import "./Testing.css";
import IconButton from "../IconButton/IconButton";

// Lucide
import { DollarSign, Percent } from "lucide-react";


// React Icons – FontAwesome
import { FaDollarSign, FaPercentage } from "react-icons/fa";

// React Icons – Material
import { MdAttachMoney, MdPercent } from "react-icons/md";

export default function Testing() {





  return (
    <div className="testing-div">
   
     {/* DOLLAR ICONS */}
      <h3>Dollar Icons</h3>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <DollarSign size={24} strokeWidth={1.5} />
        
        <FaDollarSign size={22} />
        <MdAttachMoney size={24} />
      </div>

      <hr style={{ margin: "2rem 0" }} />

      {/* PERCENT ICONS */}
      <h3>Percentage Icons</h3>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <Percent size={24} strokeWidth={1.5} />
     
        <FaPercentage size={20} />
        <MdPercent size={24} />
      </div>
    </div>
  );
};
