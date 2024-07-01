import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const EditCheltuieliForm = ({ onClose, onEditCheltuiala, itemToEdit }) => {
  const [amount, setAmount] = useState(
    itemToEdit?.amount ? itemToEdit?.amount : ""
  );
  const [date, setDate] = useState(
    itemToEdit?.date
      ? new Date(itemToEdit?.date)?.toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  ); // Initialize with current date
  const [tipuriCheltuieli, setTipuriCheltuieli] = useState([]);
  const [selectedTipCheltuiala, setSelectedTipCheltuiala] = useState(
    itemToEdit?.selectedTipCheltuiala ? itemToEdit?.selectedTipCheltuiala : ""
  );

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Funție pentru a obține tipurile de venituri de la backend
    const getTipuriCheltuieli = async () => {
      try {
        const categoriesResponse = await axios.get(
          `http://localhost:8080/api/categories/expense/${userId}`
        );
        setTipuriCheltuieli(
          Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []
        );
      } catch (error) {
        console.error("Error getting income categories:", error);
      }
    };

    // Apelăm funcția pentru a obține tipurile de venituri când componenta este montată
    getTipuriCheltuieli();
  }, []);

  useEffect(() => {
    setSelectedTipCheltuiala(
      tipuriCheltuieli?.find((el) => el.id === Number(itemToEdit?.categoryId))
        ?.id
    );
  }, [tipuriCheltuieli, itemToEdit]);

  const handleSubmit = () => {
    if (selectedTipCheltuiala && amount && date) {
      const editedCheltuiala = {
        categoryId: selectedTipCheltuiala, // Actualizează aici pentru a folosi id-ul categoriei
        amount,
        date,
      };

      onEditCheltuiala(editedCheltuiala);
      onClose();
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]); // Reset date to current date after submission
      setSelectedTipCheltuiala("");
    } else {
      toast.error("Toate câmpurile sunt obligatorii!", {
        toastId: "edit-venit-succes",
      });
    }
  };

  return (
    <div className="popup-content">
      <h2>Editare Cheltuială</h2>
      <div className="d-flex justify-content-center align-items-start flex-column">
        <label>Tip:</label>
        <select
          value={selectedTipCheltuiala}
          onChange={(e) => setSelectedTipCheltuiala(e.target.value)}
        >
          <option value="">Selectează un tip de cheltuiala</option>
          {tipuriCheltuieli.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.name}
            </option>
          ))}
        </select>

        <label className="mt-3">Data:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Valoare:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button onClick={handleSubmit}>Editare Cheltuială</button>
      </div>
    </div>
  );
};

export default EditCheltuieliForm;
