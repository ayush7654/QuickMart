

import TextAnimation from '../TextAnimation';
import { motion } from 'framer-motion';
import "./Testing.css";





export default function Testing() {

const content = [
    "Crafted with precision.",
    "Designed for the modern web.",
    "Experience the Stork difference."
  ];


  return (
    <div className="testing-div">

<motion.div 
     
          initial="hidden" 
          whileHover="visible"
          style={{
            padding: "20px",
            background: "#111",
            color:'white',
            borderRadius: "12px",
            cursor: "pointer",
            marginBottom: "20px",
            width:'20%'
          }}
        >
         

          {/* The Component receives the hover signal and starts the scan */}
          <TextAnimation text={'    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt modi ullam totam fuga sit quaerat magnam tempora possimus dolorum consectetur sed quidem rem, repellat neque saepe. Expedita cum at sapiente.'} delay={0.1} />
          
        </motion.div>

      

</div>
)
}




 