import React, { useState } from 'react'
import classnames from "classnames"
import './InputChecker.css';

const InputChecker = ({
  label = '',
  bgColor = '#80FFD4',
  isChecked = true,
  setIsChecked,
  className = '',
}) => {

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={classnames('input-checker', className)}>
      <label className='input-checker__label'>
        <div className="switch">
          <input type="checkbox" checked={isChecked} onChange={handleToggle}/>
          <span
            className="slider"
            style={{backgroundColor: isChecked ? bgColor : 'rgba(184, 190, 201, 1)'}}
          ></span>
        </div>
        <span className="checker-label">{label}</span>
      </label>
    </div>
  );
};

export default InputChecker;
