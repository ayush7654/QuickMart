
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from 'lucide-react';
import { Filter } from 'lucide-react';

 import "./Testing.css";




export default function Testing() {

  return (
<div className="testing-div" >
<button className="minimal-filter-btn"  aria-label="Filter">
      <div className="icon-wrapper">
        <Filter className="filter-icon primary" size={22} />
        <Filter className="filter-icon duplicate" size={22} />
      </div>
    </button>
</div>





  );

  
}



