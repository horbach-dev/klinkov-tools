import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import zoomPlugin from 'chartjs-plugin-zoom'
import {client} from "$api/index"
import {
    compareArraysForBar,
    compareForLine,
    createArrayBetweenNumbers,
    setParsedData,
    sumForBuyLine,
    sumForSellLine,
} from "$components/LiquidationMap/utils"
import {
    customTicksPlugin,
    crosshairPlugin,
    formatNumber,
    currentPricePlugin,
} from './plugins'
import LiquidationMapLoader from "./components/LiquidationMapLoader"
import Header from "./components/Header"

import './LiquidationMap.scss'
import useWindowSizeListener from "$hooks/useWindowSize"
import RangeSlider from "$components/LiquidationMap/components/RangeSlider/RangeSlider";

export const getBarPercentage = (isMobile, labelsLength) =>  isMobile ?
    Math.max(labelsLength / 200, 5):
    Math.max(labelsLength / 700, 1)

const filterSell = (data, price) => data.filter(item => item[1] > price + 650)
const filterBuy = (data, price) => data.filter(item => item[1] < price - 340)

const LiquidationMap = () => {
    const { innerWidth } = useWindowSizeListener()
    const isMobile = innerWidth <= 768
    const isTablet = innerWidth <= 1080 && innerWidth > 768

    const chartRef = useRef<HTMLCanvasElement>()
    const chartInstance = useRef<Chart>()
    const [tenData, setTenData] = useState([])
    const [twentyFiveData, setTwentyFiveData] = useState([])
    const [fiftyData, setFiftyData] = useState([])
    const [hundredData, setHundredData] = useState([])
    const [labelsData, setLabelsData] = useState([])
    const [barData, setBarData] = useState([])
    const [barColors, setBarColors] = useState([])
    const [lineData, setLineData] = useState([])
    const [lineBuyData, setLineBuyData] = useState([])
    const [lineSellData, setLineSellData] = useState([])
    const [currentPrice, setCurrentPrice] = useState(0)
    const [currentPriceIndex, setCurrentPriceIndex] = useState(0)
    const [tenActive, setTenActive] = useState(true)
    const [twentyFiveActive, setTwentyFiveActive] = useState(true)
    const [fiftyActive, setFiftyActive] = useState(true)
    const [hundredActive, setHundredActive] = useState(true)
    const [lineBuyActive, setLineBuyActive] = useState(true)
    const [lineSellActive, setLineSellActive] = useState(true)
    const [period, setPeriod] = useState('day')
    const [status, setStatus] = useState('top_n_100')
    const [platform, setPlatform] = useState('binance')
    const [isLoader, setLoader] = useState(true)
    const [range, setRange] = useState([0, 0])

    const loadData = async () => {
        setLoader(true)

        Promise.all([
            client.get(`/liquidation/${period}/${platform}/BTCUSDT_${status}_depth_10x_Leveraged_sell.csv`)
              .then(setParsedData).catch(e => []),
            client.get(`/liquidation/${period}/${platform}/BTCUSDT_${status}_depth_10x_Leveraged_buy.csv`)
              .then(setParsedData).catch(e => []),
            client.get(`/liquidation/${period}/${platform}/BTCUSDT_${status}_depth_25x_Leveraged_sell.csv`)
              .then(setParsedData).catch(e => []),
            client.get(`/liquidation/${period}/${platform}/BTCUSDT_${status}_depth_25x_Leveraged_buy.csv`)
              .then(setParsedData).catch(e => []),
            client.get(`/liquidation/${period}/${platform}/BTCUSDT_${status}_depth_50x_Leveraged_sell.csv`)
              .then(setParsedData).catch(e => []),
            client.get(`/liquidation/${period}/${platform}/BTCUSDT_${status}_depth_50x_Leveraged_buy.csv`)
              .then(setParsedData).catch(e => []),
            client.get(`/liquidation/${period}/${platform}/BTCUSDT_${status}_depth_100x_Leveraged_sell.csv`)
              .then(setParsedData).catch(e => []),
            client.get(`/liquidation/${period}/${platform}/BTCUSDT_${status}_depth_100x_Leveraged_buy.csv`)
              .then(setParsedData).catch(e => []),
            client.get(`/get-coin?range=1H&id=1`),
            client.get(`/liquidation/${period}/${platform}/BTCUSDT_${status}_depth_current_price.txt`)
                .then(res => res.data).catch(e => 0),
        ]).then(([tenSell, tenBuy, twentyFiveSell, twentyFiveBuy, fiftySell, fiftyBuy, hundredSell, hundredBuy, currentPrice, processPrice]) => {
            console.log('data installed')
            const keys = Object.keys(currentPrice.data.data);
            // const price = currentPrice.data.data[keys[keys.length - 1]].v[0]
            const price = parseInt(Number(processPrice))
            setCurrentPrice(parseInt(price))

            console.log(tenSell)

            tenSell = filterSell(tenSell, price)
            tenBuy = filterBuy(tenBuy, price)
            twentyFiveSell = filterSell(twentyFiveSell, price)
            twentyFiveBuy = filterBuy(twentyFiveBuy, price)
            fiftySell = filterSell(fiftySell, price)
            fiftyBuy = filterBuy(fiftyBuy, price)
            hundredSell = filterSell(hundredSell, price)
            hundredBuy = filterBuy(hundredBuy, price)

            const tenData = [...tenBuy, ...tenSell].map(item => [...item, '10']).filter(item => item[1])
            const twentyFiveData = [...twentyFiveBuy, ...twentyFiveSell].map(item => [...item, '25']).filter(item => item[1])
            const fiftyData = [...fiftyBuy, ...fiftySell].map(item => [...item, '50']).filter(item => item[1])
            const hundredData = [...hundredBuy, ...hundredSell].map(item => [...item, '100']).filter(item => item[1])

            setTenData(tenData)
            setTwentyFiveData(twentyFiveData)
            setFiftyData(fiftyData)
            setHundredData(hundredData)

            const sellData = [...tenSell, ...twentyFiveSell, ...fiftySell, ...hundredSell]
            const buyData = [...tenBuy, ...twentyFiveBuy, ...fiftyBuy, ...hundredBuy]

            const labelsData: number[] = [...tenData, ...twentyFiveData, ...fiftyData, ...hundredData].map(item => item[1])

            const labels = createArrayBetweenNumbers(
              Math.min(Number(Math.min(...labelsData.filter(item => item))), price),
              Math.max(Number(Math.max(...labelsData.filter(item => item))), price),
            )

            console.log(labels)

            setCurrentPriceIndex(labels.findIndex(item => item === parseInt(price)))

            const tenValuesWithLeverage = compareArraysForBar(labels, [...tenData, ...twentyFiveData, ...fiftyData, ...hundredData])
            const dataColors = tenValuesWithLeverage.map(item => {
                if (item[3] === '10') {
                    return "rgba(195, 102, 219, 1)"
                }
                if (item[3] === '25') {
                    return "rgba(102, 163, 219, 1)"
                }
                if (item[3] === '50') {
                    return "rgba(219, 180, 102, 1)"
                }
                if (item[3] === '100') {
                    return "rgba(219, 126, 41, 1)"
                }
            })
            const barValues = tenValuesWithLeverage.map(item => item[2])

            const lineSellValuesData = compareArraysForBar(labels, sellData).map(item => item ? item[2] : item)
            const lineBuyValuesData = compareArraysForBar(labels, buyData).map(item => item ? item[2] : item)

            const sum = lineBuyValuesData.reduce((acc, curr) => acc + curr, 0)

            const lineBuyValues = sumForBuyLine(lineBuyValuesData, sum)
            const lineSellValues = sumForSellLine(lineSellValuesData)
            setLineBuyData(lineBuyValues)
            setLineSellData(lineSellValues)

            const lineValues = compareForLine(lineBuyValues, lineSellValues)

            setRange([0, labels.length])
            setLabelsData(labels)
            setBarColors(dataColors)
            setBarData(barValues)
            setLineData(lineValues)

            setLoader(false)
        })
    }

    useEffect(() => {
        loadData()
    }, [period, platform])

    useEffect(() => {
        if (!(tenData.length && twentyFiveData.length && fiftyData.length && hundredData.length)) return

        const data = compareArraysForBar(labelsData,[
            ...(tenActive ? tenData : []),
            ...(twentyFiveActive ? twentyFiveData : []),
            ...(fiftyActive ? fiftyData : []),
            ...(hundredActive ? hundredData : []),
        ]).map(item => item[2])

        setBarData([...data])

    }, [tenData, twentyFiveData, fiftyData, hundredData, tenActive, twentyFiveActive, fiftyActive, hundredActive]);

    useEffect(() => {
        if (!(lineSellData.length && lineBuyData.length)) return

        setLineData(compareForLine(lineBuyActive ? lineBuyData : lineBuyData.map(() => 0), lineSellActive ? lineSellData : lineSellData.map(() => 0)))

    }, [lineSellActive, lineBuyActive, lineSellData, lineBuyData]);

    useEffect(() => {
        if (!(labelsData.length && barColors.length && barData.length && lineData.length)) return

        if (chartInstance.current) {
            chartInstance.current?.destroy()
        }

        // const barPercentage = !isMobile ?
        //   Math.max((labelsData.length)/ 1000, 1):
        //   Math.max((labelsData.length)/ 1500, 5)
        const barPercentage = getBarPercentage(isMobile, range[1] - range[0])
        console.log(barPercentage)

        if (chartRef.current) {
            const ctx = chartRef.current?.getContext('2d')
            const aspectRatio = isMobile ? window.innerHeight / window.innerWidth : 3

            const gradient1 = ctx.createLinearGradient(0, 0, 0, isMobile ? window.innerHeight : 500)

            gradient1.addColorStop(0, 'rgba(128, 255, 212, 0.5)')
            gradient1.addColorStop(1, 'rgba(128, 255, 212, 0.05)')

            const gradient2 = ctx.createLinearGradient(0, 0, 0, isMobile ? window.innerHeight : 500)

            gradient2.addColorStop(0, 'rgba(255, 103, 86, 0.5)')
            gradient2.addColorStop(1, 'rgba(255, 103, 86, 0.05)')
            // @ts-expect-error
            chartInstance.current = new Chart(ctx, {
                data: {
                    labels: labelsData,
                    // labels: [1,2,3,4,5,6,7,8,9,0],
                    datasets: [
                        {
                            hidden: (!lineSellActive && !lineBuyActive),
                            type: 'line',
                            label: 'line',
                            data: lineData,
                            pointRadius: 0,
                            borderWidth: 1,
                            fill: true,
                            tension: 0,
                            yAxisID: 'y1',
                            segment: {
                                borderColor: (ctx) => {
                                    if (ctx.p0DataIndex <= currentPriceIndex) return 'rgba(255, 103, 86, 1)'
                                    if (ctx.p0DataIndex > currentPriceIndex) return 'rgba(128, 255, 212, 1)'
                                },
                                backgroundColor: (ctx) => {
                                    if (ctx.p0DataIndex <= currentPriceIndex) return gradient2
                                    if (ctx.p0DataIndex > currentPriceIndex) return gradient1
                                }
                            },
                        },
                        {
                            type: 'bar',
                            label: 'bar',
                            data: barData,
                            barPercentage,
                            backgroundColor: barColors,
                            pointRadius: 0,
                            yAxisID: 'y',
                        },

                    ]
                },
                plugins: [
                    zoomPlugin,
                    customTicksPlugin,
                    crosshairPlugin,
                    // rangeZoomPlugin,
                    currentPricePlugin,
                ],
                options: {
                    layout: {
                        padding: {
                            top: 80,
                            right: 50,
                            left: 50,
                            bottom: 20,
                        }
                    },
                    animation: false,
                    ...(isMobile ? { aspectRatio: 1 } : {}),
                    ...(isTablet ? { aspectRatio: 1 } : {}),
                    // maintainAspectRatio: true,
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: 'rgba(54, 162, 235, 0)',
                                maxTicksLimit: 10,
                            },
                            min: range[0],
                            max: range[1],
                        },
                        y: {
                            ticks: {
                                color: 'rgba(54, 162, 235, 0)',
                                display: false,
                                callback: function(val, index) {
                                    return formatNumber(val);
                                },
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, .2)',
                            },
                            border: {
                                dash: [5, 5],
                            }
                        },
                        y1: {
                            type: 'linear',
                            position: 'right',
                            grid: {
                                color: 'rgba(255, 255, 255, .2)',
                            },
                            border: {
                                dash: [5, 5],
                            },
                            ticks: {
                                display: false,
                                callback: function(val, index) {
                                    // Hide every 2nd tick label
                                    return formatNumber(val);
                                },
                            },
                        }
                    },
                    plugins: {
                        currentPricePlugin: {
                            currentPriceIndex: currentPriceIndex,
                            currentPrice: currentPrice,
                        },
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            intersect: false,
                            enabled: false,
                            external: function(context) {
                                const chart = context.chart
                                const chartBarData = chart.data.datasets.find(item => item.type === 'bar').data

                                const { scales, crosshair: {x, y, label} } = chart
                                const xValue = scales.x.getValueForPixel(x);
                                let tooltipEl = document.getElementById('chartjs-tooltip');

                                if (!tooltipEl) {
                                    tooltipEl = document.createElement('div');
                                    tooltipEl.id = 'chartjs-tooltip';
                                    tooltipEl.style = 'z-index: 1000; background: rgba(6, 6, 4, 1); padding: 15px; border: 4px solid rgba(219, 180, 102, 0.2); border-radius: 8px'
                                    tooltipEl.innerHTML = '<div></div>';
                                    document.body.appendChild(tooltipEl);
                                }

                                const tooltipModel = context.tooltip;
                                if (tooltipModel.opacity === 0 || !label) {
                                    tooltipEl.style.opacity = 0;
                                    return;
                                }

                                tooltipEl.classList.remove('above', 'below', 'no-transform');
                                if (tooltipModel.yAlign) {
                                    tooltipEl.classList.add(tooltipModel.yAlign);
                                } else {
                                    tooltipEl.classList.add('no-transform');
                                }

                                function getBody(bodyItem) {
                                    return bodyItem.lines[0];
                                }

                                if (tooltipModel.body) {

                                    const titleLines = label;
                                    const bodyLines = tooltipModel.body.map(getBody);

                                    let innerHtml = '<div style="margin-bottom: 20px; font-size: 16px; font-weight: 700">';
                                    innerHtml += '<div>' + label + '</div>';
                                    innerHtml += '</div>';
                                    innerHtml += '<div>';

                                    bodyLines.reverse().forEach(function(body, i) {
                                        if (body.includes('bar')) {
                                            const dataValue = chartBarData[xValue]?.toString()
                                            const dataColor = barColors[xValue]?.toString()

                                            let leverage = ''

                                            if (dataColor === 'rgba(195, 102, 219, 1)') {
                                                leverage = '10'
                                            }
                                            if (dataColor === 'rgba(102, 163, 219, 1)') {
                                                leverage = '25'
                                            }
                                            if (dataColor === 'rgba(219, 180, 102, 1)') {
                                                leverage = '50'
                                            }
                                            if (dataColor === 'rgba(219, 126, 41, 1)') {
                                                leverage = '100'
                                            }

                                            let style = 'background:' + dataColor;

                                            const span = '<span style="' + style + '; display:inline-block; width:16px; height:16px; border-radius:50%; margin-right:10px;"></span>';
                                            if (dataValue) innerHtml += `<div>${span}${leverage}X Leverage ${formatNumber(Number(dataValue))}</div>`
                                        }
                                        if (body.includes('line')) {
                                            const data = body.replace(/\D/g, '')

                                            let style = ''
                                            let text = ''
                                            if (label > currentPrice) {
                                                text = ' Cumulative Short Liquidation Leverage '
                                                style = 'background:' + 'rgba(128, 255, 212, 1)';
                                            } else {
                                                text = ' Cumulative Long Liquidation Leverage '
                                                style = 'background:' + 'rgba(255, 103, 86, 1)';
                                            }
                                            const span = '<span style="' + style + '; display:inline-block; width:16px; height:16px; border-radius:50%; margin-right:10px;"></span>';
                                            console.log(data)
                                            innerHtml += '<div>' + span + text + formatNumber(Number(data)) + '</div>';
                                        }
                                    });
                                    innerHtml += '</div>';

                                    const tableRoot = tooltipEl.querySelector('div');
                                    tableRoot.innerHTML = innerHtml;
                                }

                                const position = context.chart.canvas.getBoundingClientRect();
                                tooltipEl.style.opacity = 1;
                                tooltipEl.style.position = 'absolute';
                                tooltipEl.style.left = position.left + window.pageXOffset + x + 15 + 'px';
                                tooltipEl.style.top = position.top + window.pageYOffset + y + 15 + 'px';
                                tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                                tooltipEl.style.pointerEvents = 'none';
                            }
                        },
                        zoom: {
                            pan: {
                                enabled: false,
                            },
                            zoom: {
                                animation: false,
                                onZoom: ({ chart }) => {
                                    chart.data.datasets[0].barPercentage =
                                        getBarPercentage(isMobile, (chart.boxes[3].max - chart.boxes[3].min))
                                    setRange([chart.boxes[3].min, chart.boxes[3].max])
                                      //   !isMobile ?
                                      // Math.max((chart.boxes[3].max - chart.boxes[3].min)/ 500, 1):
                                      // Math.max((chart.boxes[3].max - chart.boxes[3].min)/ 1500, 5)
                                },
                                wheel: {
                                    animation: false,
                                    enabled: true,
                                    speed: 0.2,
                                },

                                // min: ,
                                mode: 'x',
                            }
                        },
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false
                    }
                },
            })
        }
    }, [isLoader, isMobile, isTablet, range])

    return (
      <div className='liquidation-map'>
          <span className="liquidation-map__decor liquidation-map__decor-left"/>
          <span className="liquidation-map__decor liquidation-map__decor-right"/>
          <div className="container">
              <div className="liquidation-map__content">
                  {isLoader && <LiquidationMapLoader />}
                  <Header
                    isMobile={isMobile}
                    isLoading={isLoader}
                    period={period}
                    setPeriod={setPeriod}
                    platform={platform}
                    loadData={loadData}
                    setPlatform={setPlatform}
                    checkboxActions={{
                        lineSellActive,
                        setLineSellActive,
                        lineBuyActive,
                        setLineBuyActive,
                        hundredActive,
                        setHundredActive,
                        fiftyActive,
                        setFiftyActive,
                        twentyFiveActive,
                        setTwentyFiveActive,
                        tenActive,
                        setTenActive,
                    }}
                  />
                  <div className="liquidation-map__canvas-wrap">
                      <canvas ref={chartRef} />
                  </div>
                  {
                      !isLoader && <div style={{
                          paddingBottom: 10
                      }}>
                          <RangeSlider
                              min={0}
                              max={labelsData.length}
                              step={1}
                              range={range}
                              onChange={(item) => setRange(item)}
                          />
                      </div>
                  }
              </div>
          </div>
      </div>
    )
}

export default LiquidationMap
