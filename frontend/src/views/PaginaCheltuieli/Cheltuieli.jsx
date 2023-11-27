import React, { useState, useEffect } from "react";
import "./Cheltuieli.scss";
import { toast } from "react-toastify";
import Modal from "react-modal";

const AdaugaCheltuialaForm = ({ onClose, onAdaugaCheltuiala }) => {
  const [tipCheltuiala, setTipCheltuiala] = useState("");
  const [dataCheltuiala, setDataCheltuiala] = useState("");
  const [valoareCheltuiala, setValoareCheltuiala] = useState("");

  const handleSubmit = () => {
    const nouaCheltuiala = {
      tip: tipCheltuiala,
      data: dataCheltuiala,
      valoare: valoareCheltuiala,
    };

    onAdaugaCheltuiala(nouaCheltuiala);
    onClose();
    toast.success("Cheltuiala adăugată cu succes!");
  };

  return (
    <div className="popup-content">
      <h2>Adaugă Cheltuială</h2>
      <label>
        Tip:
        <select
          value={tipCheltuiala}
          onChange={(e) => setTipCheltuiala(e.target.value)}
        >
          <option value="Mâncare">Mâncare</option>
          <option value="Chirie">Chirie</option>
          <option value="Transport">Transport</option>
        </select>
      </label>
      <label>
        Data:
        <input
          type="date"
          value={dataCheltuiala}
          onChange={(e) => setDataCheltuiala(e.target.value)}
        />
      </label>
      <label>
        Valoare:
        <input
          type="number"
          value={valoareCheltuiala}
          onChange={(e) => setValoareCheltuiala(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Adaugă Cheltuială</button>
    </div>
  );
};

const Cheltuieli = () => {
  const [cheltuieli, setCheltuieli] = useState([]);
  const [tipCheltuiala, setTipCheltuiala] = useState("");
  const [dataCheltuiala, setDataCheltuiala] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("url_api/cheltuieli");
        const data = await response.json();
        setCheltuieli(data);
      } catch (error) {
        console.error("Eroare la încărcarea cheltuielilor:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleAdaugaCheltuiala = (nouaCheltuiala) => {
    setCheltuieli([...cheltuieli, nouaCheltuiala]);
  };

  const filterCheltuieli = () => {
    return cheltuieli.filter((cheltuiala) =>
      (tipCheltuiala ? cheltuiala.tip === tipCheltuiala : true) &&
      (dataCheltuiala ? cheltuiala.data === dataCheltuiala : true)
    );
  };

  return (
    <div className="container-chelt">
      <div className="lista-cheltuieli">
        <h2>Listă Cheltuieli</h2>
        <div className="filtre-container">
          <div className="filtru">
            <label className="filtru1">Filtrare după Tip:</label>
            <select
              className="filtru1"
              value={tipCheltuiala}
              onChange={(e) => setTipCheltuiala(e.target.value)}
            >
              <option value="">Toate</option>
              <option value="Mâncare">Mâncare</option>
              <option value="Chirie">Chirie</option>
              <option value="Transport">Transport</option>
            </select>
          </div>

          <div className="filtru">
            <label className="filtru1">Filtrare după Data:</label>
            <input
              type="date"
              value={dataCheltuiala}
              onChange={(e) => setDataCheltuiala(e.target.value)}
            />
          </div>
        </div>


        <ul>
          {filterCheltuieli().map((cheltuiala, index) => (
            <li key={index}>
              {cheltuiala.tip} - {cheltuiala.data} - {cheltuiala.valoare}
            </li>
          ))}
        </ul>
        <button onClick={() => setIsModalOpen(true)}>Adaugă Cheltuială</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Adaugă Cheltuială"
        className="popup"
        overlayClassName="overlay"
      >
        <AdaugaCheltuialaForm
          onClose={() => setIsModalOpen(false)}
          onAdaugaCheltuiala={handleAdaugaCheltuiala}
        />
      </Modal>
    </div>
  );
};

export default Cheltuieli;
