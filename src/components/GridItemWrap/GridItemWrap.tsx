import React from 'react'
import Title from '$components/Title'

import './GridItemWrap.scss'

interface IProps {
  title?: string
  shadow?: boolean
  children: any
}

const GridItemWrap = ({ title, shadow = true, children }: IProps) => {
  return (
    <div className='grid-item'>
      {shadow && (
        <div className='grid-item__decor'>
          <div className='grid-item__decor_top' />
          <div className='grid-item__decor_right' />
          <div className='grid-item__decor_left' />
        </div>
      )}
      <div className='grid-item__content'>
        {title && (
          <Title>
            {title}
          </Title>
        )}
        {children}
      </div>
    </div>
  )
}

export default GridItemWrap
