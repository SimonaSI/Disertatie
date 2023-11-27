import React, { useState } from "react";
import "./Venit.scss";
import { toast } from "react-toastify";
import Modal from "react-modal";
import AdaugaVenitForm from "./AdaugaVenitForm";

const Venit = () => {
  const [venituri, setVenituri] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdaugaVenit = (nouVenit) => {
    setVenituri([...venituri, nouVenit]);
  };

  const totalVenituri = venituri.reduce(
    (total, venit) => total + parseFloat(venit.suma),
    0
  );

  return (
    <div className="venit-container">
      
      <h2>Lista Venituri</h2>
      <ul>
        {venituri.map((venit, index) => (
          <li key={index}>
            <strong>{venit.denumire}</strong>: {venit.suma} RON (Data: {venit.data})
          </li>
        ))}
      </ul>

      <h2>Total Venituri</h2>
      <p>{totalVenituri.toFixed(2)} RON</p>

      <button onClick={() => setIsModalOpen(true)}>Adaugă Venit</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Adaugă Venit"
        className="popup"
        overlayClassName="overlay"
      >
        <AdaugaVenitForm
          onClose={() => setIsModalOpen(false)}
          onAdaugaVenit={handleAdaugaVenit}
        />
      </Modal>
    </div>
  );
};

export default Venit;
