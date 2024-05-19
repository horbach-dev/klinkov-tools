import React from 'react'

import './Title.scss'

interface IProps {
    children: string
}

const Title = ({ children }: IProps) => (
  <h3
      className='title'
      style={{
          color: 'rgba(217, 217, 217, 0.4)'
      }}
  >
    {children}
  </h3>
)

export default Title
