
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from 'lucide-react';
import { Filter } from 'lucide-react';
// 1. Feather Icons (fi)
import { 
  FiHome as FiHomeIcon, 
  FiShoppingBag as FiShoppingBagIcon, 
  FiUser as FiUserIcon, 
  FiHelpCircle as FiHelpCircleIcon, 
  FiHeadphones as FiHeadphonesIcon 
} from 'react-icons/fi';

// 2. Material Design (md)
import { 
  MdHome as MdHomeIcon, 
  MdStore as MdStoreIcon, 
  MdAccountCircle as MdAccountCircleIcon, 
  MdHelp as MdHelpIcon, 
  MdHeadset as MdHeadsetIcon 
} from 'react-icons/md';

// 3. FontAwesome (fa)
import { 
  FaHome as FaHomeIcon, 
  FaStore as FaStoreIcon, 
  FaUser as FaUserIcon, 
  FaQuestion as FaQuestionIcon, 
  FaHeadphones as FaHeadphonesIcon 
} from 'react-icons/fa';

// 4. Heroicons (hi)
import { 
  HiHome as HiHomeIcon, 
  HiShoppingBag as HiShoppingBagIcon, 
  HiUser as HiUserIcon, 
  HiQuestionMarkCircle as HiQuestionMarkCircleIcon, 
  HiSupport as HiSupportIcon 
} from 'react-icons/hi';

 import "./Testing.css";




export default function Testing() {


  const iconGroups = [
    {
      name: "Feather Icons (react-icons/fi)",
      icons: [
        { label: "Home", component: <FiHomeIcon /> },
        { label: "Shop", component: <FiShoppingBagIcon /> },
        { label: "Account", component: <FiUserIcon /> },
        { label: "Question Mark", component: <FiHelpCircleIcon /> },
        { label: "Headphone", component: <FiHeadphonesIcon /> },
      ]
    },
    {
      name: "Material Design (react-icons/md)",
      icons: [
        { label: "Home", component: <MdHomeIcon /> },
        { label: "Shop", component: <MdStoreIcon /> },
        { label: "Account", component: <MdAccountCircleIcon /> },
        { label: "Question Mark", component: <MdHelpIcon /> },
        { label: "Headphone", component: <MdHeadsetIcon /> },
      ]
    },
    {
      name: "FontAwesome (react-icons/fa)",
      icons: [
        { label: "Home", component: <FaHomeIcon /> },
        { label: "Shop", component: <FaStoreIcon /> },
        { label: "Account", component: <FaUserIcon /> },
        { label: "Question Mark", component: <FaQuestionIcon /> },
        { label: "Headphone", component: <FaHeadphonesIcon /> },
      ]
    },
    {
      name: "Heroicons (react-icons/hi)",
      icons: [
        { label: "Home", component: <HiHomeIcon /> },
        { label: "Shop", component: <HiShoppingBagIcon /> },
        { label: "Account", component: <HiUserIcon /> },
        { label: "Question Mark", component: <HiQuestionMarkCircleIcon /> },
        { label: "Headphone", component: <HiSupportIcon /> },
      ]
    }
  ];

  
  return (
<div className="testing-div" >
<div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>React Icons Comparison</h2>
      {iconGroups.map((group, index) => (
        <div key={index} style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', color: '#555', marginBottom: '8px' }}>
            {group.name}
          </h3>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
            {group.icons.map((item, idx) => (
              <div key={idx} title={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontSize: '24px' }}>
                {item.component}
                <span style={{ fontSize: '11px', color: '#777' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
</div>





  );

  
}



