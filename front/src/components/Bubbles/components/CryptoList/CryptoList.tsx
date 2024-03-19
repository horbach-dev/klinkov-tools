import React, {useRef, useState} from 'react'
import classnames from 'classnames'
import useStore from '$hooks/useStore'
import UserStore from '$stores/UserStore'

import './CryptoList.scss'

const head = [
  'Имя',
  'Цена',
  'Объем рынка',
  '24ч объем',
  'Час',
  'День',
  'Неделя',
  'Месяц',
  'Год',
  'arrow'
]

const CryptoList = ({ items = [] }: any) => {
  const scrollableRef = useRef(null)
  const [isScrolling, setScrolling] = useState(false)

  const [popup,setUserState] = useStore(UserStore, store => store.popup)

  const handleScroll = () => {
      setScrolling((scrollableRef?.current?.scrollLeft || 0) > 1)
  }

  const handleClickItem = item => {
    setUserState(prev => ({ ...prev, popup: { item,isOpen: true } }))
  }

  return (
    <div className='crypto-list'>
      <div
        ref={scrollableRef}
        className='crypto-list__table'
        onScroll={handleScroll}
      >
        <div className='crypto-list__table-header'>
          {head.map((key, index) => {
            if (key === 'arrow') {
              return (
                <div
                  key={index}
                  className='crypto-list__table-col crypto-list__table-col_arrow'
                />
              )
            }

            return (
              <div
                key={index}
                className='crypto-list__table-col crypto-list__table-col_header'
              >
                {key}
              </div>
            )
          })}
        </div>
        <div className='crypto-list__table-rows'>
          {items.map((row, idx) => (
            <div
              key={idx}
              onClick={() => handleClickItem(row)}
              className='crypto-list__table-row'
            >
              {Object.keys(row).map((key, index) => {
                const item = row[key]
                const isPercent = ['4', '5', '6', '7', '8'].includes(key)

                if (key === '0') {
                  return (
                    <div
                      key={index}
                      className={classnames('crypto-list__table-col', `crypto-list__table-col_${key}`, isScrolling && 'crypto-list__table-col_scr')}
                    >
                      <img
                        className='crypto-list__logo'
                        src={item.logo}
                        alt={item.name}
                      />
                      <div className='crypto-list__info'>
                        <p className='crypto-list__info-title'>
                          {item.name}
                        </p>
                        <p className='crypto-list__info-description'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                }

                if (key === '1') {
                  return (
                    <div
                      key={index}
                      className={classnames('crypto-list__table-col', `crypto-list__table-col_${key}`)}
                    >
                      {item.price}
                    </div>
                  )
                }

                if (key === '2') {
                  return (
                    <div
                      key={index}
                      className={classnames('crypto-list__table-col', `crypto-list__table-col_${key}`)}
                    >
                      {item.volume}
                    </div>
                  )
                }

                if (key === '3') {
                  return (
                    <div
                      key={index}
                      className={classnames('crypto-list__table-col', `crypto-list__table-col_${key}`)}
                    >
                      {item.volume}
                    </div>
                  )
                }

                if (isPercent) {
                  return (
                    <PercentCol
                      key={index}
                      k={key}
                      value={item.percent}
                    />
                  )
                }

                return (
                  <div
                    key={index}
                    className='crypto-list__table-col crypto-list__table-col_arrow'
                  >
                    <div className='crypto-list__table-col-arrow' />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const PercentCol = ({ k, value }: any) => {
  const prefix = value > 0 ? 'plus' : 'minus'

  return (
    <div
      key={k}
      className={
        classnames(
          'crypto-list__table-col',
          `crypto-list__table-col_${k}`,
          `crypto-list__table-col_${prefix}`
        )
      }
    >
      {value > 0 && '+'}
      {value}
    </div>
  )
}

export default CryptoList
