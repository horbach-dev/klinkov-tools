import React, { useEffect, useState } from 'react'
import { client } from '$api/index'
import Loader from '$components/Loader'
import Speed from './Speed'

import './FearIndicator.scss'

const FearIndicator = () => {
  const [data, setData] = useState<any>([])

  const getIndex = async () => {
    const todayMidnight = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
    const yesterdayMidnight = todayMidnight - (86400 * 1000)

    try {
      const res = await client.get(
        '/fear-and-greed',
        {
          params: {
            start: yesterdayMidnight / 1000,
            end: Math.ceil(new Date().getTime() / 1000),
          }
        },
      )

      setData(res.data?.data?.dataList || [])
    } catch(ex) {
      // error
      console.log(ex)
    }
  }

  useEffect(() => {
    getIndex()
  }, [])

  const score = Math.floor(data[data.length - 1]?.score || 0)
  const speed = (score / 2) + 50

  if (!data.length) return <Loader />

  return (
    <div className='feather-indicator'>
      <div className='feather-indicator__pie'>
        <Speed
          score={score}
          speed={Number(speed.toFixed(0))}
        />
      </div>
    </div>
  )
}

export default FearIndicator
