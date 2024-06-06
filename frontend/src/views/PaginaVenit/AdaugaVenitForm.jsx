import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AdaugaVenitForm = ({ onClose, onAdaugaVenit }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [tipuriVenituri, setTipuriVenituri] = useState([]);
  const [selectedTipVenit, setSelectedTipVenit] = useState("");

  useEffect(() => {
    // Funție pentru a obține tipurile de venituri de la backend
    const getTipuriVenituri = async () => {
      try {
        console.log('sunt aici')
        const response = await axios.get("http://localhost:8080/api/categories/income/1");
        setTipuriVenituri(response.data);
        console.log(response.data)
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
      toast.success("Venit adăugat cu succes!");
      setAmount("");
      setDate("");
      setSelectedTipVenit("");
    } else {
      toast.error("Toate câmpurile sunt obligatorii!");
    }
  };
  
  

  return (
    <div className="popup-content">
      <h2>Adaugă Venit</h2>
      
      <label>
        Tip Venit:
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

      </label>
      <label>
        Suma:
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <label>
        Data:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Adaugă Venit</button>
    </div>
  );
};

export default AdaugaVenitForm;
