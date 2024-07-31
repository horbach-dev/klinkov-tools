import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Chart from 'chart.js/auto'
import zoomPlugin from 'chartjs-plugin-zoom'
import {customTicksPlugin, crosshairPlugin, rangeZoomPlugin, formatNumber, currentPricePlugin} from './plugins'
import {
    compareArraysForBar, compareForLine,
    createArrayBetweenNumbers, setParsedData,
    sumForBuyLine,
    sumForSellLine
} from "$components/LiquidationMap/utils";
import {Checkbox} from "antd";
import {client} from "$api/index";

const LiquidationMap = ({ isMobile = false }) => {
    const chartRef = useRef<HTMLCanvasElement>()
    const chartInstance = useRef<Chart>()
    const [tenData, setTenData] = useState([])
    // const [tenBuy, setTenBuy] = useState([])
    const [twentyFiveData, setTwentyFiveData] = useState([])
    // const [twentyFiveBuy, setTwentyFiveBuy] = useState([])
    const [fiftyData, setFiftyData] = useState([])
    // const [fiftyBuy, setFiftyBuy] = useState([])
    const [hundredData, setHundredData] = useState([])
    // const [hundredBuy, setHundredBuy] = useState([])
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
    const [period, setPeriod] = useState('week')

    useEffect(() => {
        Promise.all([
            client.get(`/liquidation/${period}/binance/BTCUSDT_top_n_100_depth_10x_Leveraged_sell.csv`)
                .then(setParsedData),
            client.get(`/liquidation/${period}/binance/BTCUSDT_top_n_100_depth_10x_Leveraged_buy.csv`)
                .then(setParsedData),
            client.get(`/liquidation/${period}/binance/BTCUSDT_top_n_100_depth_25x_Leveraged_sell.csv`)
                .then(setParsedData),
            client.get(`/liquidation/${period}/binance/BTCUSDT_top_n_100_depth_25x_Leveraged_buy.csv`)
                .then(setParsedData),
            client.get(`/liquidation/${period}/binance/BTCUSDT_top_n_100_depth_50x_Leveraged_sell.csv`)
                .then(setParsedData),
            client.get(`/liquidation/${period}/binance/BTCUSDT_top_n_100_depth_50x_Leveraged_buy.csv`)
                .then(setParsedData),
            client.get(`/liquidation/${period}/binance/BTCUSDT_top_n_100_depth_100x_Leveraged_sell.csv`)
                .then(setParsedData),
            client.get(`/liquidation/${period}/binance/BTCUSDT_top_n_100_depth_100x_Leveraged_buy.csv`)
                .then(setParsedData),
            client.get(`/liquidation/${period}/binance/BTCUSDT_top_n_100_depth_current_price.txt`)
                .then(res => res.data)
        ]).then(([tenSell, tenBuy, twentyFiveSell, twentyFiveBuy, fiftySell, fiftyBuy, hundredSell, hundredBuy, currentPrice]) => {
            console.log('data installed')
            setCurrentPrice(parseInt(currentPrice))
            const tenData = [...tenBuy, ...tenSell].map(item => [...item, '10']).filter(item => item[0])
            const twentyFiveData = [...twentyFiveBuy, ...twentyFiveSell].map(item => [...item, '25']).filter(item => item[0])
            const fiftyData = [...fiftyBuy, ...fiftySell].map(item => [...item, '50']).filter(item => item[0])
            const hundredData = [...hundredBuy, ...hundredSell].map(item => [...item, '100']).filter(item => item[0])

            setTenData(tenData)
            setTwentyFiveData(twentyFiveData)
            setFiftyData(fiftyData)
            setHundredData(hundredData)

            const sellData = [...tenSell, ...twentyFiveSell, ...fiftySell, ...hundredSell]
            const buyData = [...tenBuy, ...twentyFiveBuy, ...fiftyBuy, ...hundredBuy]

            const labelsData: number[] = [...tenData, ...twentyFiveData, ...fiftyData, ...hundredData].map(item => item[1])

            const labels = createArrayBetweenNumbers(
                Number(Math.min(...labelsData.filter(item => item))),
                Number(Math.max(...labelsData.filter(item => item))),
            )

            setCurrentPriceIndex(labels.findIndex(item => item === parseInt(currentPrice)))

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

            setLabelsData(labels)
            setBarColors(dataColors)
            setBarData(barValues)
            setLineData(lineValues)
        })
    }, [])

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

        const barPercentage = Math.max(labelsData.length / 1500, 1)

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
                            type: 'bar',
                            label: 'bar',
                            data: barData,
                            barPercentage,
                            backgroundColor: barColors,
                            pointRadius: 0,
                            yAxisID: 'y',
                        },
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
                    ]
                },
                plugins: [
                    zoomPlugin,
                    customTicksPlugin,
                    crosshairPlugin,
                    rangeZoomPlugin,
                    currentPricePlugin,
                ],
                options: {
                    layout: {
                        padding: {
                            top: 80,
                            right: 40,
                            left: 40,
                            bottom: 100,
                        }
                    },
                    animation: false,
                    // aspectRatio: aspectRatio,
                    // maintainAspectRatio: !isMobile,
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: 'rgba(54, 162, 235, 0)',
                                maxTicksLimit: 25,
                            },
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
                                            const dataValue = barData[xValue]?.toString()
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
                                            const data = body.substring(5, body.length).split(' ').join('')

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
                                animation: true,
                                onZoom: ({ chart }) => {
                                    chart.data.datasets[0].barPercentage = Math.max((chart.boxes[3].max - chart.boxes[3].min)/ 1500, 1)
                                },
                                wheel: {
                                    animation: true,
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
    }, [barData, barColors, labelsData, lineData, isMobile])

    if (isMobile) {
        return (
            <div>
                <div>
                    <button onClick={() => {
                        setTenActive(!tenActive)
                    }}>
                        ten
                    </button>
                    <button onClick={() => {
                        setTwentyFiveActive(!twentyFiveActive)
                    }}>
                        twentyFive
                    </button>
                    <button onClick={() => {
                        setFiftyActive(!fiftyActive)
                    }}>
                        fifty
                    </button>
                    <button onClick={() => {
                        setHundredActive(!hundredActive)
                    }}>
                        hundred
                    </button>
                    <button onClick={() => {
                        setLineBuyActive(!lineBuyActive)
                    }}>
                        buy
                    </button>
                    <button onClick={() => {
                        setLineSellActive(!lineSellActive)
                    }}>
                        sell
                    </button>
                </div>
                <canvas ref={chartRef} style={{width: '100%', height: '100%'}}></canvas>
            </div>
        )
    } else {
        return (
            <div>
                <div style={{
                    color: 'white'
                }}>
                    <button onClick={() => {
                        setTenActive(!tenActive)
                    }}>
                        ten
                    </button>
                    <button onClick={() => {
                        setTwentyFiveActive(!twentyFiveActive)
                    }}>
                        twentyFive
                    </button>
                    <button onClick={() => {
                        setFiftyActive(!fiftyActive)
                    }}>
                        fifty
                    </button>
                    <button onClick={() => {
                        setHundredActive(!hundredActive)
                    }}>
                        hundred
                    </button>
                    <button onClick={() => {
                        setLineBuyActive(!lineBuyActive)
                    }}>
                        buy
                    </button>
                    <button onClick={() => {
                        setLineSellActive(!lineSellActive)
                    }}>
                        sell
                    </button>
                </div>
                <canvas ref={chartRef}></canvas>
            </div>
        )
    }
}

export default LiquidationMap