// TotalCheltuieli.jsx

import React from "react";
import { Bar } from "react-chartjs-2";

const TotalCheltuieli = ({ expenseData, totalAmount }) => {
  const chartData = {
    labels: expenseData.map((expense) => expense.Category.name),
    datasets: [
      {
        label: "Cheltuieli",
        data: expenseData.map((expense) => expense.totalAmount),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Total Cheltuieli pe Categorie</h2>
      <div className="total-amount-label">
        Total Cheltuieli: {totalAmount.toFixed(2)} RON
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

export default TotalCheltuieli;
