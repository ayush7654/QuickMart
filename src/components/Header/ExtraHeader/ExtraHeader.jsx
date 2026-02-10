import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import './ExtraHeader.css'
export default function ExtraHeader() {

const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    // Switch every 4 seconds
    const interval = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="extra-header-wrapper">

    <div className={`extra-link-wrapper ${showFirst ? 'visible' : 'hidden'}`}>
        <span id="extra-link" className="underline">Coming Soon : The Summer Collection 26.</span>
        <span id="extra-text">Follow @sarasstore for more updates.</span>
      </div>

      {/* Second Set */}
      <div className={`extra-link-wrapper ${!showFirst ? 'visible' : 'hidden'}`}>
        <span id="extra-text">Free Standard Delivery</span>
        <span id="extra-link" className="underline">Details</span>
      </div>
 

    <div className="language-button">
<Globe size={14} strokeWidth={1.5} />
      English
    </div>
  </div>
  )
}
