import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import classnames from 'classnames'
import { IDataItem } from '$components/Dominance/types'
import { calculatePercentageOfTotalBitcoin } from './utils'

import './DominanceChart.scss'

interface IProps {
  bitcoinDominanceData: IDataItem[];
}

const BitcoinDominanceChart = ({ bitcoinDominanceData }: IProps) => {
  const chartRef = useRef<any>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [data, setData] = useState([])

  useEffect(() => {

    window.addEventListener('resize', () => {
      chartInstance.current?.resize()

      if (chartRef.current) {
        chartRef.current.style.width = '100%'
        chartRef.current.style.height = '100%'
      }
    })

    if (bitcoinDominanceData && bitcoinDominanceData.length) {
      setTimeout(() => {
        if (chartRef.current) {
          chartRef.current.style.width = '100%'
          chartRef.current.style.height = '100%'
        }
      }, 100)

      const points: string[] = []
      const dates: string[] = []

     bitcoinDominanceData.forEach(item => {
        points.push(calculatePercentageOfTotalBitcoin(item.quote))
        dates.push(new Date(item.timestamp).toLocaleDateString('ru-RU'))
      })

      if (points.length) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setData([points[points.length - 1], points[0]])
      }

      const ctx = chartRef.current.getContext('2d')

      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      console.log('234')

      const gradient = ctx.createLinearGradient(0, 0, 0, 140)

      gradient.addColorStop(0, 'rgba(219, 180, 102, 0.2)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Dominance',
            data: points,
            borderColor: 'rgba(219, 180, 102, 1)',
            borderWidth: 1,
            pointRadius: 0,
            fill: true,
            backgroundColor: gradient
          }]
        },
        options: {
          scales: {
            x: {
              display: false // скрываем ось X
            },
            y: {
              display: false,
              beginAtZero: false,
              min: -50,
              max: 100,
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
        }
      })
    }
  }, [bitcoinDominanceData])

  const [currentValue, lastValue] = data

  const percent = (currentValue - lastValue) / lastValue * 100
  const isProfit = percent >= 0

  return (
    <div className='dominance-chart'>
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
      <canvas ref={chartRef} style={{ width: '100% !important' }} />
      <div>
        {'Range'}
      </div>
    </div>
  )
}

export default BitcoinDominanceChart
