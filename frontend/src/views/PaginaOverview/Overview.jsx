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
  const [categorii, setCategorii] = useState([]);
  const [venituri, setVenituri] = useState([]);

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

  const fetchCategorii = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      setCategorii(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchVenituri = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/incomes/user/${userId}`
      );

      setVenituri(response.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const getVenituriPtNotificari = () => {
    const array = [];

    venituri?.map((venit) => {
      let today = new Date();
      let venitDate = new Date(venit.date);

      // Create a date that is 4 days after the current date
      const fourDaysLater = new Date(today);
      fourDaysLater.setDate(today.getDate() + 4);

      // Compare given date with fourDaysLater date
      if (venitDate > fourDaysLater) {
        array.push(venit);
      }
    });
    return array;
  };

  const getCheltuieliPtNotificari = () => {
    const array = [];

    expenseData?.map((expense) => {
      const getCategoryMaxValue = categorii?.find(
        (el) => Number(el.id) === Number(expense.categoryId)
      )?.maxValue;
      if (getCategoryMaxValue < expense.totalAmount) {
        array.push(expense);
      }
    });
    return array;
  };

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

  useEffect(() => {
    fetchCategorii();
    fetchVenituri();
  }, []);

  const getCategoryById = (id) => {
    const category = categorii.find((cat) => cat.id === Number(id));
    return category ? category : "Categorie necunoscută";
  };

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
        <div className="notificari-container">
          {/* la div mai sus pui notificari si alerte */}
          <p className="mb-0" style={{ color: "#1838eb" }}>
            <strong>Notificari: </strong>{" "}
          </p>
          <ul>
            {getVenituriPtNotificari()?.length > 0 ? (
              <li style={{ color: "#1838eb" }}>
                {" "}
                In curand vei incasa{" "}
                {getVenituriPtNotificari()?.map(
                  (venit, index) =>
                    `${venit.amount} lei din ${
                      getCategoryById(venit.categoryId)?.name
                    }${
                      getVenituriPtNotificari()?.length > 1 &&
                      index < getVenituriPtNotificari()?.length - 1
                        ? ", "
                        : ""
                    }`
                )}
              </li>
            ) : null}
          </ul>
          <p className="mb-0" style={{ color: "#e90707" }}>
            <strong>Alerte: </strong>{" "}
          </p>
          <ul style={{ color: "#e90707" }}>
            <li>
              Data scadenta pentru datoria "Imprumut Claudia" a fost depasita.
            </li>
            {getCheltuieliPtNotificari()?.length === 1 ? (
              <li>
                Ai grija, pentru categoria{" "}
                {
                  <strong>
                    {
                      getCategoryById(
                        getCheltuieliPtNotificari()[0]?.categoryId
                      )?.name
                    }
                  </strong>
                }{" "}
                ai cheltuit o valoare mai mare decat ti-ai propus!
              </li>
            ) : getCheltuieliPtNotificari()?.length > 1 ? (
              <li>
                Ai grija, pentru categoriile{" "}
                {getCheltuieliPtNotificari()?.map((cheltuiala, index) => (
                  <span key={index}>
                    <strong>{cheltuiala?.Category?.name}</strong>

                    <span>
                      {index < getCheltuieliPtNotificari()?.length - 1
                        ? ", "
                        : ""}
                    </span>
                  </span>
                ))}{" "}
                ai cheltuit o valoare mai mare decat ti-ai propus!
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
