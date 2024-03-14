import React, { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { client } from '$api/index'
import Loader from '$components/Loader'

import './Telegram.scss'

interface Message {
  title:string;
  link:string;
}

interface ResponseType {
    data:Message[]
}

const Telegram = () => {
  const [messages,setMessages] = useState<Message[]>()

  const getLatestMessages = () => {
    // client.get('/get-last-messages')
    //     .then((res:AxiosResponse<ResponseType>)=>{
    //         setMessages(res.data.data)
    //     }).catch((e) => {
    //   console.error(e.message)
    // })
  }

  useEffect(()=>{
    getLatestMessages()
  },[])


  return (
    <div className='telegram-block'>
      <div className='telegram-block__list'>
        {messages?.length ? messages.map(message => (
          <a
            key={message.link}
            className='telegram-block__list-item'
            target='_blank'
            rel='noopener noreferrer'
            href={message.link}
          >
            {message.title}
          </a>
        )
        ): (
          <>
            <div
              className='telegram-block__list-item'>
              {'Загрузка сообшения...'}
            </div>
            <div className='telegram-block__list-item'>
              {'Загрузка сообшения...'}
            </div>
            <div className='telegram-block__list-item'>
              {'Загрузка сообшения...'}
            </div>
            {/*<Loader/>*/}
          </>
      )}
      </div>
    </div>
  )
}

export default Telegram
