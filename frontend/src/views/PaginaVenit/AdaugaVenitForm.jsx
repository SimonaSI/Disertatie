import React, { useState } from "react";
import { toast } from "react-toastify";

const AdaugaVenitForm = ({ onClose, onAdaugaVenit }) => {
  const [denumire, setDenumire] = useState("");
  const [suma, setSuma] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = () => {
    if (denumire && suma && data) {
      const nouVenit = {
        denumire,
        suma,
        data,
      };

      onAdaugaVenit(nouVenit);
      onClose();
      toast.success("Venit adăugat cu succes!");
      setDenumire("");
      setSuma("");
      setData("");
    } else {
      toast.error("Toate câmpurile sunt obligatorii!");
    }
  };

  return (
    <div className="popup-content">
      <h2>Adaugă Venit</h2>
      <label>
        Denumire:
        <input
          type="text"
          value={denumire}
          onChange={(e) => setDenumire(e.target.value)}
        />
      </label>
      <label>
        Suma:
        <input
          type="text"
          value={suma}
          onChange={(e) => setSuma(e.target.value)}
        />
      </label>
      <label>
        Data:
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Adaugă Venit</button>
    </div>
  );
};

export default AdaugaVenitForm;
