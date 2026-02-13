import './ScrollingButton.css';

function ScrollButton({ 
  text, 
   textColor='black', 
  color = "rgb(0,100,255)", 
  theme = "buttonFilled",      // Default: Filled
  themeOnHover = "buttonOutline", // Default Hover: Outline
  className = "", 
  style = {} 

}) {
  return (
    <div
      className={`
        scroll-btn 
        theme-${theme} 
        hover-${themeOnHover} 
        ${className}
      `}
      style={{
        '--brand-color': color,
         '--filled-text-color':textColor, 
        ...style
      }}
    >
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