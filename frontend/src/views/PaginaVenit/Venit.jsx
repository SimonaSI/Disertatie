import React, { useState, useEffect } from "react";
import "./Venit.scss";
import { toast } from "react-toastify";
import Modal from "react-modal";
import AdaugaVenitForm from "./AdaugaVenitForm";
import axios from "axios";

Modal.setAppElement('#root');

const Venit = () => {
  const [venituri, setVenituri] = useState([]);
  const [categorii, setCategorii] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchVenituri();
    fetchCategorii();
  }, [selectedMonth]);

  const fetchVenituri = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/incomes/user/${userId}`);
      const filteredVenituri = response.data.filter(venit => {
        const venitDate = new Date(venit.date);
        const selectedDate = new Date(selectedMonth);
        return venitDate.getFullYear() === selectedDate.getFullYear() && venitDate.getMonth() === selectedDate.getMonth();
      });
      setVenituri(filteredVenituri);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };
  

  const fetchCategorii = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      setCategorii(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAdaugaVenit = async (nouVenit) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/incomes/user/${userId}`, nouVenit);
      setVenituri([...venituri, response.data]);
      toast.success("Venit adăugat cu succes!");
      
      const categoriiResponse = await axios.get("http://localhost:8080/api/categories");
      setCategorii(categoriiResponse.data);
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

  function getCurrentMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  }

  return (
    <div className="container-venit">
    <div className="venit-container">
      <div className="header-filtre">
        <h2>Lista Venituri</h2>
        <div className="filters">
          
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
      </div>

      <button onClick={() => setIsModalOpen(true)}>Adaugă Venit</button>
  
      <ul>
        {venituri.map((venit) => (
          <li key={venit.id}>
            {getCategoryNameById(venit.categoryId)} - {venit.amount} RON - Data: {new Date(venit.date).toLocaleDateString("ro-RO")}
          </li>
        ))}
      </ul>
  
      <h2>Total Venituri</h2>
      <p>{totalVenituri.toFixed(2)} RON</p>
  
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Adaugă Venit"
        className="popup"
        overlayClassName="overlay"
        appElement={document.getElementById('root')}
      >
        <AdaugaVenitForm
          onClose={() => setIsModalOpen(false)}
          onAdaugaVenit={handleAdaugaVenit}
        />
      </Modal>
    </div>
    </div>
  );
};

export default Venit;
