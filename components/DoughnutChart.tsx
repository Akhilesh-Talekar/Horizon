"use client"
import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({accounts}:DoughnutChartProps) => {
    let data = {
        datasets: [
            {
                   label: 'Amount',
                   data: [55000, 25000, 45000],
                   backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
            }
        ],

        labels: ['HDFC', "SBI", "RBI"]
    }
  return (
    <Doughnut data={data}
    options={{
        cutout: '60%',
        plugins:{
            legend:{
                display:false
            }
        }
    }}
    />
  )
}

export default DoughnutChart
