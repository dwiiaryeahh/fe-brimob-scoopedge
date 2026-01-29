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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                data: [12, 19, 3, 5, 8],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
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
    }

    return (
        <BaseCard.Form>
            <div className="h-[216px] p-2">
                <h1 className="mb-2 -mt-5 font-">Last Activity</h1>
                <Bar data={data} options={options} />
            </div>
        </BaseCard.Form>

    )
}
