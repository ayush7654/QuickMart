import './ScrollingButton.css' 



function ScrollButton({
  text,
  theme = "lightMode",
  themeOnHover,
  color = "#ff6b35", // used for colorMode
  className = "",
  style = {}
}) {
  return (
    <div
      className={`
        scroll-btn
        scroll-btn--${theme}
        ${themeOnHover ? `hover-${themeOnHover}` : ""}
        ${className}
      `}
      style={{
        // Base theme color
        ...(theme === "colorMode" && { "--btn-bg": color }),
        // Hover theme color
        ...(themeOnHover === "colorMode" && { "--btn-hover-bg": color }),
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
