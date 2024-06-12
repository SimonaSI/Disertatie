import React from "react";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalVenituri = ({ incomeData, totalAmount }) => {
  const chartData = {
    labels: incomeData.map((income) => income.Category.name),
    datasets: [
      {
        label: "Venit",
        data: incomeData.map((income) => income.totalAmount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Total Venituri pe Categorie</h2>
      <div className="total-amount-label">
        Total Venituri: {totalAmount.toFixed(2)} RON
      </div>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default TotalVenituri;
