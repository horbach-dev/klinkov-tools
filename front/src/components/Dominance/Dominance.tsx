import React, { Suspense, useEffect, useState } from 'react'
import { Select } from 'antd'
import classnames from 'classnames'
import { client } from '$api/index'
import ArrowDropdown from '$components/Bubbles/components/ArrowDropdown'
import Loader from '$components/Loader'
import Title from '$components/Title'
import DominanceChart from './components/DominanceChart'

import './Dominance.scss'

const defaultValue = 'ALL'

const Dominance = () => {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [range, setRange] = useState(defaultValue)
    // const [percent]
    const [currentValue, setCurrentValue] = useState(0)
    const [lastValue, setLastValue] = useState(0)

    // const [currentValue, lastValue] = data

    const percent = ((currentValue - lastValue) / lastValue) * 100
    const isProfit = percent >= 0

    const getDominance = async (range) => {
        try {
            setLoading(true)

            const res = await client.get('/btc-dominance', {
                params: { range },
            })

            setRange(range)
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
          <div
              style={{
                  display: 'flex'
                }}
          >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
              <Title>
                {'Btc dominance'}
              </Title>
            </div>

            <div className='dominance-chart__label'>
              {currentValue && (
                <p className='dominance-chart__label-value'>
                  {currentValue + '%'}
                </p>
                  )}
              {currentValue && lastValue && (
                <p className={classnames('dominance-chart__label-diff', isProfit && 'dominance-chart__label-diff_profit')}>
                  {isProfit && '+'}
                  {percent.toFixed(2) + '%'}
                </p>
                  )}
            </div>
          </div>
          <Select
            disabled={!data.length || isLoading}
            defaultValue={defaultValue}
            value={range}
            className='bubbles__select'
            suffixIcon={<ArrowDropdown/>}
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
          <Loader/>
            ) : (
              <Suspense fallback={<Loader/>}>
                <DominanceChart bitcoinDominanceData={data} range={range} setLastValue={setLastValue} setCurrentValue={setCurrentValue} />
              </Suspense>
            )}
      </div>
    )
}

export default Dominance
