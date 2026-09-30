import {useState,useEffect }from 'react'
import './StaticHeader.css'
export default function StaticHeader() {

const [headerTheme, setHeaderTheme] = useState("white");

useEffect(() => {
    const sections = document.querySelectorAll("[data-header-theme]");

    console.log("THEMED SECTIONS:", sections);
    
const observer = new IntersectionObserver(
  (entries) => {
    const activeEntry = entries.find(
      (entry) => entry.isIntersecting
    );

    if (activeEntry) {
      setHeaderTheme(activeEntry.target.dataset.headerTheme);
    } else {
      setHeaderTheme("blend");
    }
  },
  {
    rootMargin: "-16px 0px -90% 0px",
    threshold: 0,
  }
);

    sections.forEach((section) => observer.observe(section));


sections.forEach((section) => {
  const rect = section.getBoundingClientRect();

  if (rect.top <= 16 && rect.bottom > 16) {
    setHeaderTheme(section.dataset.headerTheme);
  }
});

console.log("OBSERVER ATTACHED");

    return () => observer.disconnect();
}, []);

  return (
    <div 
className={`static-header-wrapper ${
  headerTheme === "white" ? "header-force-white" : ""
} ${
  headerTheme === "black" ? "header-force-black" : ""
}`}
    
    >
   
   <div className="static-header-content">


    <div className="header-left-section">
        <span>Home</span>
        <span>Store</span>
        <span>About</span>
    </div>


      <div className="header-right-section">
        <span>S</span>
        <span>A</span>
        <span>C</span>
    </div>

   </div>


    </div>
  )
}
