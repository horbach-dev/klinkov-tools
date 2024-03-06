import React, {useEffect, useState} from 'react'

import './Telegram.scss'
import {AxiosResponse} from "axios";
import { client } from "$api/index";

interface Message {
  title:string;
  link:string;
}

interface ResponseType {
    data:Message[]
}

const Telegram = () => {
  const [messages,setMessages] = useState<Message[]>();

  const getLatestMessages = () => {
    client.get('/get-last-messages')
        .then((res:AxiosResponse<ResponseType>)=>{
            setMessages(res.data.data)
        })
  }

  useEffect(()=>{
    getLatestMessages();
  },[])


  return (
    <div className='telegram-block'>
      <div className='telegram-block__list'>
        {messages && messages.map(message =>
            <div className='telegram-block__list-item'>
              {message.title}
           </div>
        )}
      </div>
    </div>
  )
}

export default Telegram
