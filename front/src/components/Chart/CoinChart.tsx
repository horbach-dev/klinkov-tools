import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';

const CoinChart = ({ data, label, timeUnit }) => {
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
            const gradient = ctx.createLinearGradient(0, 0, 0, 240)

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
                        backgroundColor:gradient
                    }]
                },
                options: {
                    aspectRatio: 3,
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
                                display: false // Убираем отображение дат снизу графика
                            }
                        },
                        y: {
                            display: true,
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(200, 200, 200, 0.1)', // серый цвет для линий сетки
                                borderWidth: 1, // ширина линии
                                drawTicks: false, // не отображать деления
                                drawBorder: false, // не отображать границы
                                drawOnChartArea: true, // рисовать на области графика
                            },
                            ticks: {
                                callback: (value) => {
                                    if (value >= 1) {
                                        return value.toFixed(0);
                                    } else {
                                        return value.toFixed(6);
                                    }
                                },
                                stepSize: 1, // шаг деления
                            },

                        },
                    },
                    plugins: {
                        legend: {
                            display: false // Скрываем легенду
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
    }, [data, timeUnit]);

    return (
        <canvas ref={chartRef}></canvas>
    );
};

const parseRange = {
    '1H': 'hour',
    '7D': 'day',
    '1M': 'day',
    '1Y': 'month',
}

export default CoinChart;