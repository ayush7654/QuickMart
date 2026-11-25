
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import './SiteLogo.css'
export default function SiteLogo() {

  const { scrollY } = useScroll();
  const innerHeight = window.innerHeight;

  const location = useLocation();
  const onHomePage = ['/'].includes(location.pathname);
  


  

    const y = useTransform(
    scrollY,
    [0, innerHeight],
    onHomePage ? ["0vh", "-43vh"] : ["-43vh", "-43vh"]
  );

  const scale = useTransform(
    scrollY,
    [0, innerHeight],
    onHomePage ? [1, 0.1] : [0.1, 0.1]
  );

  
  


  return (
    <div className="site-logo-wrapper1">
      <motion.div
        className="site-logo-animation1"
        style={{ y, scale }}
      >
        PATCHWORK
      </motion.div>
    </div>
  );
}


