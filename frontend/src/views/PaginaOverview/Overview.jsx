// Overview.jsx

import React, { useState } from 'react';
import TotalVenituri from './TotalVenituri';
import TotalCheltuieli from './TotalCheltuieli';
import { toast } from "react-toastify";

const Overview = () => {
  const userId = localStorage.getItem("userId");
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Luna curentă
  const [year, setYear] = useState(new Date().getFullYear()); // Anul curent

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
    { value: 12, label: "Decembrie" }
  ];

  return (
    <div className="container">
      <h1>Pagina Home</h1>
      <div>
        <label htmlFor="month-select">Selectează luna:</label>
        <select id="month-select" value={month} onChange={handleMonthChange}>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
      <TotalVenituri userId={userId} month={month} year={year} />
      <TotalCheltuieli userId={userId} month={month} year={year} />
    </div>
  );
};

export default Overview;
