import React, { useState, useEffect } from "react";
import "./Cheltuieli.scss";
import { toast } from "react-toastify";
import Modal from "react-modal";
import axios from 'axios';


const Cheltuieli = () => {
  const [cheltuieli, setCheltuieli] = useState([]);
  const [categorii, setCategorii] = useState([]);
  const [tipCheltuiala, setTipCheltuiala] = useState("");
  const [dataCheltuiala, setDataCheltuiala] = useState(getCurrentMonth()); // Initializează cu luna curentă
  const [valoareCheltuiala, setValoareCheltuiala] = useState("");
  const [tipCheltuialaModal, setTipCheltuialaModal] = useState("");
  const [dataCheltuialaModal, setDataCheltuialaModal] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await axios.get(`http://localhost:8080/api/users/${userId}/expenses`);
        setCheltuieli(Array.isArray(expensesResponse.data) ? expensesResponse.data : []);
  
        const categoriesResponse = await axios.get(`http://localhost:8080/api/categories/expense/${userId}`);
        setCategorii(Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []);
      } catch (error) {
        console.error("Eroare la încărcarea datelor:", error.message);
      }
    };
  
    fetchData();
  }, [userId]);
  
  const handleAdaugaCheltuiala = async () => {
    const nouaCheltuiala = {
      categoryId: tipCheltuialaModal,
      date: dataCheltuialaModal,
      amount: parseFloat(valoareCheltuiala),
    };
  
    try {
      const response = await axios.post(`http://localhost:8080/api/users/${userId}/expenses`, nouaCheltuiala);
      setCheltuieli([...cheltuieli, response.data]);
      toast.success("Cheltuiala adăugată cu succes!");
  
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Eroare la adăugarea cheltuielii");
    }
  };
  

  function getCurrentMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Adaugă un zero în față dacă este necesar
    return `${year}-${month}`;
  }


  
  

  const filterCheltuieli = () => {
    return cheltuieli.filter((cheltuiala) => {
      const cheltuialaDate = new Date(cheltuiala.date);
      const selectedDate = new Date(dataCheltuiala);
      const isSameMonth =
        selectedDate.getFullYear() === cheltuialaDate.getFullYear() &&
        selectedDate.getMonth() === cheltuialaDate.getMonth();

      return (
        (tipCheltuiala ? cheltuiala.categoryId == tipCheltuiala : true) &&
        (dataCheltuiala ? isSameMonth : true)
      );
    });
  };

  const getCategoryName = (categoryId) => {
    const category = categorii.find((categorie) => categorie.id === categoryId);
    return category ? category.name : "N/A";
  };

  const totalCheltuieli = filterCheltuieli().reduce((total, cheltuiala) => total + cheltuiala.amount, 0);

  return (
    <div className="container-chelt">
      <div className="lista-cheltuieli">
      <button onClick={() => setIsModalOpen(true)}>Adaugă Cheltuială</button>
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
              {categorii.map((categorie) => (
                <option key={categorie.id} value={categorie.id}>
                  {categorie.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filtru">
            <label className="filtru1">Filtrare după Data:</label>
            <input
              type="month"
              value={dataCheltuiala}
              onChange={(e) => setDataCheltuiala(e.target.value)}
            />
          </div>
        </div>

        <ul>
          {Array.isArray(cheltuieli) && filterCheltuieli().map((cheltuiala) => (
            <li key={cheltuiala.id}>
              {getCategoryName(cheltuiala.categoryId)} - {cheltuiala.amount} RON - {new Date(cheltuiala.date).toLocaleDateString("ro-RO")}

            
            </li>
          ))}
        </ul>
        <div className="total-cheltuieli">
          <strong>Total Cheltuieli: {totalCheltuieli.toFixed(2)}</strong>
        </div>
        
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Adaugă Cheltuială"
        className="popup"
        overlayClassName="overlay"
      >
        <div className="popup-content">
          <h2>Adaugă Cheltuială</h2>
          <label>
            Tip:
            <select
              value={tipCheltuialaModal}
              onChange={(e) => setTipCheltuialaModal(e.target.value)}
            >
              <option value="">Selectează un tip de cheltuiala</option>
              {categorii.map((categorie) => (
                <option key={categorie.id} value={categorie.id}>
                  {categorie.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Data:
            <input
              type="date"
              value={dataCheltuialaModal}
              onChange={(e) => setDataCheltuialaModal(e.target.value)}
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
          <button onClick={handleAdaugaCheltuiala}>Adaugă Cheltuială</button>
        </div>
      </Modal>
    </div>
  );
};

export default Cheltuieli;
