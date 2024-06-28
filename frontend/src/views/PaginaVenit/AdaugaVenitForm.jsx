import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AdaugaVenitForm = ({ onClose, onAdaugaVenit }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Initialize with current date
  const [tipuriVenituri, setTipuriVenituri] = useState([]);
  const [selectedTipVenit, setSelectedTipVenit] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Funție pentru a obține tipurile de venituri de la backend
    const getTipuriVenituri = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/categories/income/${userId}`
        );
        setTipuriVenituri(response.data);
      } catch (error) {
        console.error("Error getting income categories:", error);
      }
    };

    // Apelăm funcția pentru a obține tipurile de venituri când componenta este montată
    getTipuriVenituri();
  }, []);

  const handleSubmit = () => {
    if (selectedTipVenit && amount && date) {
      const nouVenit = {
        categoryId: selectedTipVenit, // Actualizează aici pentru a folosi id-ul categoriei
        amount,
        date,
      };

      onAdaugaVenit(nouVenit);
      onClose();
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]); // Reset date to current date after submission
      setSelectedTipVenit("");
    } else {
      toast.error("Toate câmpurile sunt obligatorii!", {
        toastId: "add-venit-succes",
      });
    }
  };

  return (
    <div className="popup-content">
      <h2>Adaugă Venit</h2>
      <div className="d-flex justify-content-center align-items-start flex-column">
        <label>Tip Venit:</label>
        <select
          value={selectedTipVenit}
          onChange={(e) => setSelectedTipVenit(e.target.value)}
        >
          <option value="">Selectează un tip de venit</option>
          {tipuriVenituri.map((venit) => (
            <option key={venit.id} value={venit.id}>
              {venit.name}
            </option>
          ))}
        </select>

        <label className="mt-3">Suma:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label>Data:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button className="" onClick={handleSubmit}>
          Adaugă Venit
        </button>
      </div>
    </div>
  );
};

export default AdaugaVenitForm;
