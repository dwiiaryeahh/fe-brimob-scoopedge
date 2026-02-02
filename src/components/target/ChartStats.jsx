import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import BaseCard from '../BaseCard'
import Text from '../Text'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export default function ChartStats() {
    const data = {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun',],
        datasets: [
            {
                label: 'Blacklist',
                data: [5800, 5000, 1800, 5400, 2500],
                backgroundColor: 'rgba(0, 0, 0, 1)', // hitam
                barPercentage: 0.3,
                categoryPercentage: 0.6,
            },
            {
                label: 'Whitelist',
                data: [2000, 300, 7200, 2000, 500],
                backgroundColor: 'rgba(43, 255, 117, 1)', // green terang
                barPercentage: 0.3,
                categoryPercentage: 0.6,
            },
            
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        size: 10,
                        weight: 'bold',
                    },
                },
            },
            y: {
                stacked: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.3)',
                    borderDash: [5, 5],
                    drawBorder: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    callback: function(value) {
                        return value >= 1000 ? (value / 1000) + 'k' : value;
                    },
                },
            },
        },
    }

    return (
        <BaseCard.Form>
            <div className="-mt-5 h-56 p-2 pb-5 flex flex-col gap-2 mb-2">
                <Text size='16px'>Last Activity</Text>
                <Bar data={data} options={options} />
            </div>
        </BaseCard.Form>
    )
}