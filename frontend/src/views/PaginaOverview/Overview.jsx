import React, { useState, useEffect } from 'react';
import TotalVenituri from './TotalVenituri';
import TotalCheltuieli from './TotalCheltuieli';
import EvolutieVenituri from './EvolutieVenituri';
import EvolutieCheltuieli from './EvolutieCheltuieli';
import './Overview.scss';
import { toast } from 'react-toastify';

const Overview = () => {
  const userId = localStorage.getItem('userId');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value));
  };

  const months = [
    { value: 1, label: 'Ianuarie' },
    { value: 2, label: 'Februarie' },
    { value: 3, label: 'Martie' },
    { value: 4, label: 'Aprilie' },
    { value: 5, label: 'Mai' },
    { value: 6, label: 'Iunie' },
    { value: 7, label: 'Iulie' },
    { value: 8, label: 'August' },
    { value: 9, label: 'Septembrie' },
    { value: 10, label: 'Octombrie' },
    { value: 11, label: 'Noiembrie' },
    { value: 12, label: 'Decembrie' },
  ];

  return (
    <div className="container">

      <div className="chart-container">
        <TotalVenituri userId={userId} month={month} year={year} />
      </div>

      <div className="chart-container">
        <TotalCheltuieli userId={userId} month={month} year={year} />
      </div>

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

      <div className="chart-container">
        <EvolutieVenituri userId={userId} />
      </div>

      <div className="chart-container">
        <EvolutieCheltuieli userId={userId} />
      </div>
    </div>
  );
};

export default Overview;
