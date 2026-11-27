
import React, { useState, useEffect } from 'react';

import { motion, useScroll, useTransform } from "framer-motion";

 import "./Testing.css";

import {
  FaFilter, FaSort, FaSortUp, FaSortDown,
  FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortAmountDown
} from 'react-icons/fa';
import {
  MdFilterList, MdFilterAlt, MdOutlineFilterAlt, MdTune,
  MdSort, MdSwapVert, MdArrowUpward, MdArrowDownward
} from 'react-icons/md';
import {
  LuFilter, LuListFilter, LuSlidersHorizontal,
  LuArrowUpDown, LuArrowUpNarrowWide, LuArrowDownWideNarrow
} from 'react-icons/lu';
import {
  BsFilter, BsFunnel, BsFunnelFill, BsSliders,
  BsArrowDownUp, BsSortDown, BsSortUp, BsSortAlphaDown
} from 'react-icons/bs';
import {
  HiFunnel, HiOutlineFunnel, HiAdjustmentsHorizontal,
  HiArrowsUpDown, HiBarsArrowDown, HiBarsArrowUp
} from 'react-icons/hi2';

  const iconGroups = [
  {
    library: 'Font Awesome (react-icons/fa)',
    icons: [
      { name: 'FaFilter', component: FaFilter },
      { name: 'FaSort', component: FaSort },
      { name: 'FaSortUp', component: FaSortUp },
      { name: 'FaSortDown', component: FaSortDown },
      { name: 'FaSortAlphaDown', component: FaSortAlphaDown },
      { name: 'FaSortAlphaUp', component: FaSortAlphaUp },
      { name: 'FaSortNumericDown', component: FaSortNumericDown },
      { name: 'FaSortAmountDown', component: FaSortAmountDown },
    ],
  },
  {
    library: 'Material Design (react-icons/md)',
    icons: [
      { name: 'MdFilterList', component: MdFilterList },
      { name: 'MdFilterAlt', component: MdFilterAlt },
      { name: 'MdOutlineFilterAlt', component: MdOutlineFilterAlt },
      { name: 'MdTune', component: MdTune },
      { name: 'MdSort', component: MdSort },
      { name: 'MdSwapVert', component: MdSwapVert },
      { name: 'MdArrowUpward', component: MdArrowUpward },
      { name: 'MdArrowDownward', component: MdArrowDownward },
    ],
  },
  {
    library: 'Lucide (react-icons/lu)',
    icons: [
      { name: 'LuFilter', component: LuFilter },
      { name: 'LuListFilter', component: LuListFilter },
      { name: 'LuSlidersHorizontal', component: LuSlidersHorizontal },
      { name: 'LuArrowUpDown', component: LuArrowUpDown },
      { name: 'LuArrowUpNarrowWide', component: LuArrowUpNarrowWide },
      { name: 'LuArrowDownWideNarrow', component: LuArrowDownWideNarrow },
    ],
  },
  {
    library: 'Bootstrap Icons (react-icons/bs)',
    icons: [
      { name: 'BsFilter', component: BsFilter },
      { name: 'BsFunnel', component: BsFunnel },
      { name: 'BsFunnelFill', component: BsFunnelFill },
      { name: 'BsSliders', component: BsSliders },
      { name: 'BsArrowDownUp', component: BsArrowDownUp },
      { name: 'BsSortDown', component: BsSortDown },
      { name: 'BsSortUp', component: BsSortUp },
      { name: 'BsSortAlphaDown', component: BsSortAlphaDown },
    ],
  },
  {
    library: 'Heroicons (react-icons/hi2)',
    icons: [
      { name: 'HiFunnel', component: HiFunnel },
      { name: 'HiOutlineFunnel', component: HiOutlineFunnel },
      { name: 'HiAdjustmentsHorizontal', component: HiAdjustmentsHorizontal },
      { name: 'HiArrowsUpDown', component: HiArrowsUpDown },
      { name: 'HiBarsArrowDown', component: HiBarsArrowDown },
      { name: 'HiBarsArrowUp', component: HiBarsArrowUp },
    ],
  },
];

export default function Testing() {






  return (
<div className="testing-div">

<div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Filter & Sort Icons Showcase</h2>
      {iconGroups.map((group) => (
        <div key={group.library} style={{ marginBottom: '32px' }}>
          <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', color: '#334155' }}>
            {group.library}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '12px',
              marginTop: '12px',
            }}
          >
            {group.icons.map(({ name, component: IconComponent }) => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  gap: '8px',
                }}
              >
                <IconComponent size={28} color="#0f172a" />
                <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#475569' }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
 
 </div>





  );

  



}
