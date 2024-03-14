import React, { Suspense, useEffect, useState } from 'react'
import { Select } from 'antd'
import axios from 'axios'
import ArrowDropdown from '$components/Bubbles/components/ArrowDropdown'
import Loader from '$components/Loader'
import Title from '$components/Title'
import DominanceChart from './components/DominanceChart'

import './Dominance.scss'
import { client } from "$api/index";

const defaultValue = 'ALL'

const Dominance = () => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [currentValue, setCurrentValue] = useState(defaultValue)
  const getDominance = async (range) => {
    try {
      setLoading(true)

      const res = await client.get('/btc-dominance', {
        params: { range },
      })

      setCurrentValue(range)
      setData(res.data.data.quotes)
    } catch (ex) {
      // error
      console.log(ex)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDominance(defaultValue)
  }, [])

  return (
    <div className='dominance'>
      <div className='dominance__header'>
        <Title>{'Btc dominance'}</Title>
        <Select
          disabled={!data.length || isLoading}
          defaultValue={defaultValue}
          value={currentValue}
          className='bubbles__select'
          suffixIcon={<ArrowDropdown />}
          onChange={getDominance}
          options={[
            { value: '1d', label: '24 часа' },
            { value: '7d', label: '7 дней' },
            { value: '1m', label: '1 месяц' },
            { value: '3m', label: '3 месяца' },
            { value: '1y', label: '1 год' },
            { value: 'ALL', label: 'Все время' },
          ]}
        />
      </div>
      {!data.length || isLoading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <DominanceChart bitcoinDominanceData={data} range={currentValue} />
        </Suspense>
      )}
    </div>
  )
}

export default Dominance
