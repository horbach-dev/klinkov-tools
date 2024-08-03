import React, { useState } from 'react';
import './InputChecker.css';

const InputChecker = ({
                        label = '',
                        bgColor = '#80FFD4',
                        isChecked = true,
                        setIsChecked,
}) => {

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="input-checker">
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={handleToggle}/>
        <span
          className="slider"
          style={{backgroundColor: bgColor}}
        ></span>
      </label>
      <span className="checker-label">{label}</span>
    </div>
  );
};

export default InputChecker;
