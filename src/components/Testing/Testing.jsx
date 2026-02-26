import { useEffect, useRef, useState } from "react";
import "./Testing.css";
import { Check, CheckSquare } from 'lucide-react';
import useStoreFilterData from "../../pages/Store/useStoreFilterData";
import PriceFilter from "../../pages/Store/FilterSection/PriceFilter/PriceFilter";
import SortDropdown from "../SortDropdown/SortDropdown";
export default function Testing() {



  return (
    <div className="testing-div">


<SortDropdown/>



</div>
)
}