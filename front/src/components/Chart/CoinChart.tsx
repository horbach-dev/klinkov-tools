import React, {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js/auto';

const CoinChart = ({ data, label, timeUnit}) => {
    const chartRef = useRef();
    const chartInstance = useRef(null);

    useEffect(() => {
        if(!data) return;
        const labels = Object.keys(data).map(timestamp => parseInt(timestamp) * 1000);
        const values = Object.values(data).map(item => item.v[0]);

        if (chartInstance.current) {
            chartInstance.current?.destroy(); // Уничтожаем предыдущий экземпляр графика
        }

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current =  new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: label,
                        data: values,
                        borderColor: 'rgba(219, 180, 102, 1)',
                        borderWidth: 1,
                        fill: true,
                        pointRadius: 0,
                    }]
                },
                options: {
                    aspectRatio:3,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: parseRange[timeUnit]
                            }
                        },
                        y: {
                            display: true,
                            beginAtZero: false,
                        },
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