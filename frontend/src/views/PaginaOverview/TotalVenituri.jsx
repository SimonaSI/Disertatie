import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalVenituri = ({ userId, month, year }) => {
  const [incomeData, setIncomeData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/incomes/user/${userId}/sumByCategory`, {
          params: { month, year }
        });
        setIncomeData(response.data);
        const total = response.data.reduce((sum, income) => sum + income.totalAmount, 0);
        setTotalAmount(total);
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };

    if (month && year) {
      fetchIncomeData();
    }
  }, [userId, month, year]);

  const chartData = {
    labels: incomeData.map(income => income.Category.name),
    datasets: [{
      label: 'Venit',
      data: incomeData.map(income => income.totalAmount),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="chart-container">
      <h2>Total Venituri pe Categorie</h2>
      <div className="total-amount-label">
        Total Venituri: {totalAmount.toFixed(2)} RON
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

export default TotalVenituri;
