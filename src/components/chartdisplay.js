import React from "react";
import { Bar, Pie } from "react-chartjs-2";

const ChartDisplay = ({ data }) => {
    const distribution = data.distribution;

    const barData = {
        labels: Object.keys(distribution),
        datasets: [
            {
                label: "Sentiment Distribution",
                data: Object.values(distribution),
                backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
            },
        ],
    };

    const pieData = {
        labels: Object.keys(distribution),
        datasets: [
            {
                data: Object.values(distribution),
                backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
            },
        ],
    };

    return (
        <div>
            <h3>Sentiment Analysis Results</h3>
            <Bar data={barData} />
            <Pie data={pieData} />
        </div>
    );
};

export default ChartDisplay;
