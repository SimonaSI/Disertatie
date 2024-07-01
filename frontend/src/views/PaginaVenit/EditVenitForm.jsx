import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const EditVenitForm = ({ onClose, onEditVenit, itemToEdit }) => {
  const [amount, setAmount] = useState(
    itemToEdit?.amount ? itemToEdit?.amount : ""
  );
  const [date, setDate] = useState(
    itemToEdit?.date
      ? new Date(itemToEdit?.date)?.toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  ); // Initialize with current date
  const [tipuriVenituri, setTipuriVenituri] = useState([]);
  const [selectedTipVenit, setSelectedTipVenit] = useState(
    itemToEdit?.selectedTipVenit ? itemToEdit?.selectedTipVenit : ""
  );

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

  useEffect(() => {
    setSelectedTipVenit(
      tipuriVenituri?.find((el) => el.id === Number(itemToEdit?.categoryId))?.id
    );
  }, [tipuriVenituri, itemToEdit]);

  const handleSubmit = () => {
    if (selectedTipVenit && amount && date) {
      const editedVenit = {
        categoryId: selectedTipVenit, // Actualizează aici pentru a folosi id-ul categoriei
        amount,
        date,
      };

      onEditVenit(editedVenit);
      onClose();
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]); // Reset date to current date after submission
      setSelectedTipVenit("");
    } else {
      toast.error("Toate câmpurile sunt obligatorii!", {
        toastId: "edit-venit-succes",
      });
    }
  };

  return (
    <div className="popup-content">
      <h2>Editare Venit</h2>
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
          Editare
        </button>
      </div>
    </div>
  );
};

export default EditVenitForm;
