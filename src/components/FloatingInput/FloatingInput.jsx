import React from 'react';
import './FloatingInput.css';

const FloatingInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text", 
  optional = false, 
  icon = null,
  ...props 
}) => {
  return (
    <div className="floating-label-group">
      <input
        {...props}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" " 
        className="floating-input"
      />
      <label className="floating-label">
        {label} {optional && "(optional)"}
      </label>
      {icon && <span className="input-icon">{icon}</span>}
    </div>
  );
};

export default FloatingInput;