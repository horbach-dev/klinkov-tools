import React from 'react'

import './Title.scss'

interface IProps {
    children: string
}

const Title = ({ children }: IProps) => (
  <h3 className='title'>
    {children}
  </h3>
)

export default Title
