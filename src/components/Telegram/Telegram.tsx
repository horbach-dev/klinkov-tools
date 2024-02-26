import React from 'react'

import './Telegram.scss'

const Telegram = () => {
  return (
    <div className='telegram-block'>
      <div className='telegram-block__list'>
        <div className='telegram-block__list-item'>
          {'Тестовое длинное сообщение в канале, проверить работу'}
        </div>
        <div className='telegram-block__list-item'>
          {'Тестовое длинное сообщение, ааааааа укеркуервкп'}
        </div>
        <div className='telegram-block__list-item'>
          {'Как отправить сообщение по шифрованному каналу'}
        </div>
      </div>
    </div>
  )
}

export default Telegram
