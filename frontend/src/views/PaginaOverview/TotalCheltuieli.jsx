// TotalCheltuieli.jsx

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const TotalCheltuieli = ({ userId, month, year }) => {
  const [expenseData, setExpenseData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/expenses/user/${userId}/sumByCategory`, {
          params: { month, year }
        });
        setExpenseData(response.data);
        const total = response.data.reduce((sum, expense) => sum + expense.totalAmount, 0);
        setTotalAmount(total);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };

    if (month && year) {
      fetchExpenseData();
    }
  }, [userId, month, year]);

  const chartData = {
    labels: expenseData.map(expense => expense.Category.name),
    datasets: [{
      label: 'Total Cheltuieli pe Categorie',
      data: expenseData.map(expense => expense.totalAmount),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="chart-container">
      <h2>Total Cheltuieli pe Categorie</h2>
      <div className="total-amount-label">
        Total Cheltuieli: {totalAmount.toFixed(2)} RON
      </div>
      <Bar data={chartData} options={{
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }} />
    </div>
  );
};

export default TotalCheltuieli;
