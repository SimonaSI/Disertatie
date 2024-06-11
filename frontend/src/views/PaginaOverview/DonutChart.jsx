import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = ({ totalVenituri, totalCheltuieli }) => {
  const chartData = {
    labels: ['Total Venituri', 'Total Rămas'],
    datasets: [
      {
        data: [totalVenituri, totalVenituri - totalCheltuieli],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Total Venituri și Total Rămas</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default DonutChart;
