import React, { useState, useEffect } from "react";
import "./Venit.scss";
import { toast } from "react-toastify";
import Modal from "react-modal";
import AdaugaVenitForm from "./AdaugaVenitForm";
import axios from "axios";

const Venit = () => {
  const [venituri, setVenituri] = useState([]);
  const [categorii, setCategorii] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchVenituri();
    fetchCategorii();
  }, []);

  const fetchVenituri = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/incomes/user/1");
      setVenituri(response.data);
      console.log(response.data, "venituri");
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const fetchCategorii = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      setCategorii(response.data);
      console.log(response.data, "categorii");
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAdaugaVenit = async (nouVenit) => {
    console.log(nouVenit);
    try {
      const response = await axios.post("http://localhost:8080/api/incomes/user/1", nouVenit);
      setVenituri([...venituri, response.data]);
      toast.success("Venit adăugat cu succes!");
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Eroare la adăugarea venitului!");
    }
  };

  const totalVenituri = venituri.reduce(
    (total, venit) => total + parseFloat(venit.amount),
    0
  );

  const getCategoryNameById = (id) => {
    const category = categorii.find((cat) => cat.id === id);
    return category ? category.name : "Categorie necunoscută";
  };

  return (
    <div className="venit-container">
      <h2>Lista Venituri</h2>
      <ul>
        {venituri.map((venit) => (
          <li key={venit.id}>
            {venit.amount} RON (Data: {new Date(venit.date).toLocaleDateString("ro-RO")}) - {getCategoryNameById(venit.categoryId)}
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
