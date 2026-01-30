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
            <div className="-mt-5 h-56 p-2 pb-5 flex flex-col gap-2 mb-2">
                <Text size='16px'>Last Activity</Text>
                <Bar data={data} options={options} />
            </div>
        </BaseCard.Form>

    )
}
