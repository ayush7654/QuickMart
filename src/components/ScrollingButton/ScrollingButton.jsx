import './ScrollingButton.css';
import { LayoutPanelLeft } from 'lucide-react'
function ScrollButton({ 
  text, 
  textColor='white',
  color = "rgb(0,100,255)", 
  theme = "buttonFilled",      // Default: Filled
  themeOnHover = "buttonOutline", // Default Hover: Outline
  className = "", 
  Icon= LayoutPanelLeft,
  style = {} 

}) {
  return (
    <div
      className= 'scroll-btn'  >
      <div className='scroll-btn-Icon-wrapper'>
       <span className="scroll-btn-Icon-content">
        <Icon className='scroll-btn-Icon' size={18}/>
       </span>
      </div>
      <div className="scroll-btn__viewport">
        <div className="scroll-btn__inner">
          <div className="scroll-btn__text">{text}</div>
          <div className="scroll-btn__text">{text}</div>
        </div>
      </div>
    </div>
  );
}

export default ScrollButton;