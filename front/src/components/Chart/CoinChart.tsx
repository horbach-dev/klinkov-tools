import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CoinChart = ({ data, label, timeUnit, isMobile }) => {
    const chartRef = useRef();
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!data) return;
        const labels = Object.keys(data).map(timestamp => parseInt(timestamp) * 1000);
        const values = Object.values(data).map(item => item.v[0]);

        if (chartInstance.current) {
            chartInstance.current.destroy(); // Уничтожаем предыдущий экземпляр графика
        }

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            const aspectRatio = isMobile ? window.innerHeight / window.innerWidth : 3;
            const gradient = ctx.createLinearGradient(0, 0, 0, isMobile ? window.innerHeight : 240)

            gradient.addColorStop(0, 'rgba(219, 180, 102, 0.5)')
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        data: values,
                        borderColor: 'rgba(219, 180, 102, 1)',
                        borderWidth: 1,
                        fill: true,
                        pointRadius: 0,
                        backgroundColor: gradient
                    }]
                },
                options: {
                    aspectRatio: aspectRatio,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: parseRange[timeUnit]
                            },
                            ticks: {
                                display: false,
                            }
                        },
                        y: {
                            display: true,
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(200, 200, 200, 0.1)',
                                borderWidth: 1,
                                drawTicks: false,
                                drawBorder: false,
                                drawOnChartArea: true,
                                zeroLineWidth: 2,
                                zeroLineColor: 'rgba(200, 200, 200, 0.1)',
                            },
                            ticks: {
                                padding:10,
                                callback: (value) => {
                                    if (value >= 1) {
                                        return value.toFixed(0);
                                    } else {
                                        return value.toFixed(6);
                                    }
                                }
                            },

                        },
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y >= 1) {
                                        label += context.parsed.y.toFixed(3);
                                    } else {
                                        label += context.parsed.y.toFixed(5);
                                    }

                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        }
    }, [data, timeUnit, isMobile]);

    if (isMobile) {
        return (
            <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
        );
    } else {
        return (
            <canvas style={{ minHeight: '300px' }} ref={chartRef}></canvas>
        );
    }

};

const parseRange = {
    '1H': 'hour',
    '7D': 'day',
    '1M': 'day',
    '1Y': 'month',
}

export default CoinChart;
