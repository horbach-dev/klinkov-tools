import React from 'react'

import './Input.scss'

interface IProps {
  defaultValue?: string
  setValue: (v: string) => void
  value: string
  placeholder?: string
}

const Input = ({ value, setValue, placeholder = '' }: IProps) => {

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  return (
    <div className='input-inner'>
      <input
        className='input'
        type='text'
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <span className='input-inner__icon' />
    </div>
  )
}

export default Input
