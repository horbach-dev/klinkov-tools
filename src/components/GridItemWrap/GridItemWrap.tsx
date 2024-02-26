import React from 'react'
import classnames from 'classnames'
import Title from '$components/Title'

import './GridItemWrap.scss'

interface IProps {
  title?: string
  shadow?: boolean
  children: any
  isAnimate: boolean
  isBubbles?: boolean
  withPadding?: boolean
  id?: string
}

const GridItemWrap = ({ title, shadow = true, isAnimate = false, id, withPadding = true, children }: IProps) => {
  return (
    <div
      id={id}
      className={classnames('grid-item', isAnimate && 'grid-item_animate')}
    >
      {shadow && (
        <div className='grid-item__decor'>
          <div className='grid-item__decor_top' />
          <div className='grid-item__decor_right' />
          <div className='grid-item__decor_left' />
        </div>
      )}
      <div className={classnames('grid-item__content', !withPadding && 'grid-item__content_no-padding')}>
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
