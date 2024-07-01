import React, { useState, useEffect } from "react";
import "./Cheltuieli.scss";
import { toast } from "react-toastify";
import Modal from "react-modal";
import axios from "axios";
import EditCheltuieliForm from "./EditCheltuieliForm";

const Cheltuieli = () => {
  const [cheltuieli, setCheltuieli] = useState([]);
  const [categorii, setCategorii] = useState([]);
  const [tipCheltuiala, setTipCheltuiala] = useState("");
  const [dataCheltuiala, setDataCheltuiala] = useState(getCurrentMonth());
  const [valoareCheltuiala, setValoareCheltuiala] = useState("");
  const [tipCheltuialaModal, setTipCheltuialaModal] = useState("");
  const [dataCheltuialaModal, setDataCheltuialaModal] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const userId = localStorage.getItem("userId");

  const fetchCheltuieli = async () => {
    try {
      const expensesResponse = await axios.get(
        `http://localhost:8080/api/users/${userId}/expenses`
      );
      setCheltuieli(
        Array.isArray(expensesResponse.data) ? expensesResponse.data : []
      );
    } catch (error) {
      console.error("Eroare la încărcarea datelor:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCheltuieli();
      try {
        const categoriesResponse = await axios.get(
          `http://localhost:8080/api/categories/expense/${userId}`
        );
        setCategorii(
          Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []
        );
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
      const response = await axios.post(
        `http://localhost:8080/api/users/${userId}/expenses`,
        nouaCheltuiala
      );
      setCheltuieli([...cheltuieli, response.data]);
      toast.success("Cheltuiala adăugată cu succes!", {
        toastId: "add-cheltuiala-succes",
      });
      setValoareCheltuiala("");
      setDataCheltuialaModal(new Date().toISOString().split("T")[0]); // Reset date to current date after submission
      setTipCheltuialaModal("");

      setIsModalOpen(false);
    } catch (error) {
      toast.error("Eroare la adăugarea cheltuielii", {
        toastId: "add-cheltuiala-error",
      });
    }
  };

  const handleEditCheltuiala = async (editedCheltuiala) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/expenses/${itemToEdit.id}`,
        editedCheltuiala
      );
      setCheltuieli([...cheltuieli, response.data]);
      toast.success("Cheltuiala editat cu succes!", {
        toastId: "edit-cheltuiala-succes",
      });
      fetchCheltuieli();
    } catch (error) {
      console.error("Error editing income:", error);
      toast.error("Eroare la editare cheltuielii!", {
        toastId: "edit-cheltuiala-error",
      });
    }
  };

  function getCurrentMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
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
    const category = categorii.find(
      (categorie) => categorie.id === Number(categoryId)
    );
    return category ? category.name : "N/A";
  };

  const totalCheltuieli = filterCheltuieli().reduce(
    (total, cheltuiala) => total + cheltuiala.amount,
    0
  );

  return (
    <div className="container-chelt">
      <div className="lista-cheltuieli">
        <div className="header-filtre">
          <h2 className="tot">Listă Cheltuieli</h2>
          <div className="filtre-container">
            <div className="filtru">
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
              <input
                type="month"
                value={dataCheltuiala}
                onChange={(e) => setDataCheltuiala(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button className="mb-4" onClick={() => setIsModalOpen(true)}>
          Adaugă Cheltuială
        </button>

        <ul>
          {Array.isArray(cheltuieli) &&
            filterCheltuieli().map((cheltuiala) => (
              <li
                key={cheltuiala.id}
                onClick={() => {
                  setItemToEdit(cheltuiala);
                  setIsEditModalOpen(!isEditModalOpen);
                }}
                style={{ cursor: "pointer" }}
              >
                {getCategoryName(cheltuiala.categoryId)} - {cheltuiala.amount}{" "}
                RON - {new Date(cheltuiala.date).toLocaleDateString("ro-RO")}
              </li>
            ))}
        </ul>

        <h2 className="tot">Total Cheltuieli</h2>
        <p>{totalCheltuieli.toFixed(2)} RON</p>
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
          <div className="d-flex justify-content-center align-items-start flex-column">
            <label>Tip:</label>
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

            <label className="mt-3">Data:</label>
            <input
              type="date"
              value={dataCheltuialaModal}
              onChange={(e) => setDataCheltuialaModal(e.target.value)}
            />
            <label>Valoare:</label>
            <input
              type="number"
              value={valoareCheltuiala}
              onChange={(e) => setValoareCheltuiala(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button onClick={handleAdaugaCheltuiala}>Adaugă Cheltuială</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(!isEditModalOpen)}
        contentLabel="Editare Venit"
        className="popup"
        overlayClassName="overlay"
        appElement={document.getElementById("root")}
      >
        <EditCheltuieliForm
          onClose={() => setIsEditModalOpen(!isEditModalOpen)}
          onEditCheltuiala={handleEditCheltuiala}
          itemToEdit={itemToEdit}
        />
      </Modal>
    </div>
  );
};

export default Cheltuieli;
