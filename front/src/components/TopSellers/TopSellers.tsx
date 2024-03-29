import React from 'react'
import useStore from '$hooks/useStore'
import ContentStore from '$stores/ContentStore'

import './TopSellers.scss'

const TopSellers = () => {
  const [cryptoExchange] = useStore(ContentStore, store => store.cryptoExchange || [])

  return (
    <div className='top-sellers'>
      <div className='top-sellers__list'>
        {cryptoExchange.map((item, index) => {
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
                {
                  <p className='top-sellers__list-item-title'>
                    <span>
                      {item.price}
                    </span>
                    {'подарок по ссылке ↓'}
                  </p>
                }
                <a
                  className='top-sellers__list-item-link'
                  href={item.link}
                  target='_blank'
                  rel='noreferrer'
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
