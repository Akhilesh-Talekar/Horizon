"use client"
import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({accounts}:DoughnutChartProps) => {
    let accountNames = accounts?.map((account) => account.name);
    let accountBalances = accounts?.map((account) => account.currentBalance);
    let data = {
        datasets: [
            {
                   label: 'Amount',
                   data: accountBalances,
                   backgroundColor: ['#0747b6', '#2265d8', '#2f91fa', '#4dbdff', '#7ad7ff', '#b3f0ff', '#e6faff', '#f0f8ff', '#f8fcff', '#ffffff' ],
            }
        ],

        labels: accountNames
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
