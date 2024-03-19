import React from 'react'
import img1 from './image-1.png'
import img2 from './image-2.png'
import img3 from './image-3.png'

import './TopSellers.scss'

const items = [
  {
    title: (
      <p className='top-sellers__list-item-title'>
        <span>
          {'20$'}
        </span>
        {'подарок по ссылке ↓'}
      </p>
    ),
    img: img1,
    url: '/'
  },
  {
    title: (
      <p className='top-sellers__list-item-title'>
        <span>
          {'20$'}
        </span>
        {'подарок по ссылке ↓'}
      </p>
    ),
    img: img2,
    url: '/'
  },
  {
    title: (
      <p className='top-sellers__list-item-title'>
        <span>
          {'20$'}
        </span>
        {'подарок по ссылке ↓'}
      </p>
    ),
    img: img3,
    url: '/'
  }
]

const TopSellers = () => {
  return (
    <div className='top-sellers'>
      <div className='top-sellers__list'>
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className='top-sellers__list-item'
            >
              <img
                src={item.img}
                alt='okex'
              />
              <div className='top-sellers__list-item-left'>
                {item.title}
                <a
                  className='top-sellers__list-item-link'
                  href={item.url}
                >
                  {'Получить'}
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TopSellers
