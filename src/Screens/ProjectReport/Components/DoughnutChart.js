import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {
    CircularProgress,
} from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({ tasksStatus }) => {
    const data = {
        labels: ['CompleteOnTime', 'CompletedLate', 'InCompleteOngoing', 'InComplete Late'],
        datasets: [
            {
                label: 'No of Task',
                data: tasksStatus,
                backgroundColor: [
                    '#DBEAE0',
                    '#DFECF0',
                    '#DFDFEE',
                    '#EEDCDC',
                ],
                borderColor: [
                    '#2BC155',
                    '#4CCFF8',
                    '#4A4BE3',
                    '#E52F2F',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        tasksStatus?.length == 0 ?
            <CircularProgress sx={{ color: "#0096FF" }} /> :
            <Doughnut data={data} />
    )
}

export default DoughnutChart