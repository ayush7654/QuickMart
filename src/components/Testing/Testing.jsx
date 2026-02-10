import { useEffect, useRef, useState } from "react";
import "./Testing.css";
import IconButton from "../IconButton/IconButton";
import StoreFilter from "../../pages/Store/StoreSidebar/StoreFilter/StoreFilter";

import ScrollButton from "../ScrollingButton/ScrollingButton";

export default function Testing() {




  return (
    <div className="testing-div">



<div className="testing-button">
  <ScrollButton
  text='Log in'
  color='black'
  theme="buttonFilled"
  themeOnHover="buttonOutline"
  opacity={.25}
>

  </ScrollButton>
</div>


    </div>
  );
};
