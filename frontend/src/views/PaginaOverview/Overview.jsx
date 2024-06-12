import React, { useState, useEffect } from "react";
import TotalVenituri from "./TotalVenituri";
import TotalCheltuieli from "./TotalCheltuieli";
import EvolutieVenituri from "./EvolutieVenituri";
import EvolutieCheltuieli from "./EvolutieCheltuieli";
import "./Overview.scss";
import { toast } from "react-toastify";
import axios from "axios";

const Overview = () => {
  const userId = localStorage.getItem("userId");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [expenseData, setExpenseData] = useState([]);
  const [totalAmountExpenses, setTotalAmountExpenses] = useState(0);

  const [incomeData, setIncomeData] = useState([]);
  const [totalAmountIncomes, setTotalAmountIncomes] = useState(0);

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value));
  };

  const months = [
    { value: 1, label: "Ianuarie" },
    { value: 2, label: "Februarie" },
    { value: 3, label: "Martie" },
    { value: 4, label: "Aprilie" },
    { value: 5, label: "Mai" },
    { value: 6, label: "Iunie" },
    { value: 7, label: "Iulie" },
    { value: 8, label: "August" },
    { value: 9, label: "Septembrie" },
    { value: 10, label: "Octombrie" },
    { value: 11, label: "Noiembrie" },
    { value: 12, label: "Decembrie" },
  ];

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/incomes/user/${userId}/sumByCategory`,
          {
            params: { month, year },
          }
        );
        setIncomeData(response.data);
        const total = response.data.reduce(
          (sum, income) => sum + income.totalAmount,
          0
        );
        setTotalAmountIncomes(total);
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };

    if (month && year) {
      fetchIncomeData();
    }
  }, [userId, month, year]);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/expenses/user/${userId}/sumByCategory`,
          {
            params: { month, year },
          }
        );
        setExpenseData(response.data);
        const total = response.data.reduce(
          (sum, expense) => sum + expense.totalAmount,
          0
        );
        setTotalAmountExpenses(total);
      } catch (error) {
        console.error("Error fetching expense data:", error);
      }
    };

    if (month && year) {
      fetchExpenseData();
    }
  }, [userId, month, year]);

  return (
    <div className="mx-auto mt-5" style={{ maxWidth: "90vw" }}>
      <div className="d-flex justify-content-between align-items-start w-100 pb-5">
        <div
          className="d-flex flex-column justify-content-center align-items-center w-100"
          style={{ maxWidth: "300px" }}
        >
          <label htmlFor="month-select">Selectează luna:</label>
          <select id="month-select" value={month} onChange={handleMonthChange}>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
            <p
              style={{ fontSize: "22px", fontWeight: "600", color: "#2ad82a" }}
            >
              Disponibil:{" "}
            </p>
            <p
              style={{ fontSize: "28px", fontWeight: "600", color: "#2ad82a" }}
            >
              {totalAmountIncomes - totalAmountExpenses} RON
            </p>
          </div>
        </div>

        <div className="chart-container">
          <TotalVenituri
            incomeData={incomeData}
            totalAmount={totalAmountIncomes}
          />
        </div>

        <div className="chart-container">
          <TotalCheltuieli
            expenseData={expenseData}
            totalAmount={totalAmountExpenses}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-start w-100 pt-5">
        <div className="chart-container">
          <EvolutieVenituri userId={userId} />
        </div>
        <div className="chart-container">
          <EvolutieCheltuieli userId={userId} />
        </div>
        <div></div>
        {/* la div mai sus pui notificari si alerte */}
      </div>
    </div>
  );
};

export default Overview;
