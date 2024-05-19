import 'chartjs-adapter-moment'
import 'moment/locale/ru'

import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import classnames from 'classnames'
import moment from 'moment'
import { IDataItem } from '$components/Dominance/types'
import useWindowSizeListener from '$hooks/useWindowSize'
import { calculatePercentageOfTotalBitcoin } from './utils'

import './DominanceChart.scss'

interface IProps {
  bitcoinDominanceData: IDataItem[]
  range?: string
  onlyChart?: boolean
  symbol?:string
  setCurrentValue: any
  setLastValue: any
}

const BitcoinDominanceChart = ({ bitcoinDominanceData, range, onlyChart,symbol= 'BTC', setLastValue, setCurrentValue }: IProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [data, setData] = useState([])
  const { innerWidth } = useWindowSizeListener()
  const isMobile = innerWidth <= 1100

  useEffect(() => {
    moment.locale('ru')

    if (bitcoinDominanceData && bitcoinDominanceData.length) {
      setTimeout(() => {
        if (chartRef.current) {
          chartRef.current.style.width = '100%'
          chartRef.current.style.height = '100%'
        }
      }, 100)

      const arrData: any = []
      const points: string[] = []
      const dates: string[] = []

      bitcoinDominanceData.forEach((item) => {
        const p = calculatePercentageOfTotalBitcoin(item.quote,symbol)

        points.push(p)

        // const t = formatDate(new Date(item.timestamp))
        const t = moment(item.timestamp)

        dates.push(String(t))
        arrData.push({ x: t, y: parseFloat(p) })
      })

      if (points.length) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setData([points[points.length - 1], points[0]])
        setCurrentValue(points[points.length - 1])
        setLastValue(points[0])
      }

      const ctx = chartRef?.current?.getContext('2d')

      if (chartInstance.current) {
        chartInstance.current?.destroy()
      }

      const element = document.querySelector('.dominance-chart__container')

      const height = element ?
          (Number({ ...window?.getComputedStyle(element) }
          ?.width?.slice(0, -2)) / (isMobile ? 4 : 5)) || 350
          : 350

      const gradient = ctx?.createLinearGradient?.(0, 0, 0, height)

      gradient?.addColorStop?.(0, 'rgba(219, 180, 102, .3)')
      gradient?.addColorStop?.(1, 'rgba(34, 34, 34, 0)')

      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            datasets: [
              {
                label: 'Dominance',
                data: arrData,
                borderColor: 'rgba(219, 180, 102, 1)',
                borderWidth: 1,
                pointRadius: 0,
                fill: true,
                backgroundColor: gradient,
              },
            ],
          },
          options: {
            aspectRatio: isMobile ? 5 : 4,
            backgroundColor: gradient,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: range ? parseRange[range] : 'year',
                  tooltipFormat: 'DD.MM.YYYY HH:mm:ss',
                  displayFormats: {
                    hour: 'HH:mm',
                  },
                },
                display: !onlyChart,
                ticks: {
                  maxTicksLimit: 4,
                  padding: 0,
                  backdropPadding: 0,
                  font: {
                    family: 'oswald',
                    size: isMobile ? 16 : 14,
                    weight: 700
                  }
                },
                offset: false,
              },
              y: {
                display: false,
                beginAtZero: false,
                min: Math.min(arrData.map(item => item.y)),
                max: Math.max(arrData.map(item => item.y)),
                ticks: {
                  font: {
                    family: 'oswald',
                    size: 16,
                    weight: 700
                  }
                }
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
          },
        })
      }
    }
  }, [bitcoinDominanceData, range, innerWidth])

  window.addEventListener('orientationchange', () => {
    if (chartRef.current) {
      const wrap = document.getElementById('bubbles-section')
      const widthWrap = (wrap?.getBoundingClientRect?.()?.width || 0) / (isMobile ? 2.35 : 1.1) || 0
      // const heightWrap =  0

      // chartRef.current.style.width = `${widthWrap + 'px' || '100%'}`
      // chartRef.current.style.height = `${ '100%'}`
      // chartRef.current.style.position = 'relative'
      // chartRef.current.style.left = '-16'
    }
  })

  // useEffect(() => {
  //   if (chartRef.current) {
  //     const wrap = document.getElementById('bubbles-section')
  //     const widthWrap = (wrap?.getBoundingClientRect?.()?.width || 0) / (isMobile ? 2.35 : 1.1) || 0
  //     const heightWrap = 0
  //
  //     // chartRef.current.style.width = `${widthWrap + 'px' || '100%'}`
  //     // chartRef.current.style.height = `${'100%'}`
  //     // chartRef.current.style.position = 'relative'
  //     // chartRef.current.style.left = '-16'
  //   }
  // }, [innerWidth])

  const [currentValue, lastValue] = data

  const percent = ((currentValue - lastValue) / lastValue) * 100
  const isProfit = percent >= 0

  return onlyChart ? (
    <canvas ref={chartRef}/>
  ) : (
    <div className='dominance-chart'>
      <div className='dominance-chart__container'>
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}

export default BitcoinDominanceChart

const parseRange = {
  '1d': 'hour',
  '7d': 'day',
  '1m': 'day',
  '3m': 'day',
  '1y': 'month',
  ALL: 'year',
}
