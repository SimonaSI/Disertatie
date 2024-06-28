import React, { useState, useEffect } from "react";
import EditCategoryModal from "./EditCategoryModal";
import "./Metadata.scss";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Metadata = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tipVenit, setTipVenit] = useState("");
  const [dataIncasare, setDataIncasare] = useState("");
  const [denumireCheltuiala, setDenumireCheltuiala] = useState("");
  const [valoareMaxima, setValoareMaxima] = useState(0);
  const [venituri, setVenituri] = useState([]);
  const [cheltuieli, setCheltuieli] = useState([]);

  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const responseVenituri = await axios.get(
          `http://localhost:8080/api/categories/income/${userId}`
        );
        setVenituri(responseVenituri.data);

        const responseCheltuieli = await axios.get(
          `http://localhost:8080/api/categories/expense/${userId}`
        );
        setCheltuieli(responseCheltuieli.data);
      } catch (error) {
        console.error(
          "Error fetching categories:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchCategories();
  }, []);

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedCategory(null);
  };

  const saveEditedCategory = async (updatedCategory) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/categories/${updatedCategory.id}`,
        updatedCategory
      );
      // După ce categoria a fost actualizată cu succes, actualizează lista de venituri sau cheltuieli
      if (updatedCategory.type === "venit") {
        const updatedVenituri = venituri.map((venit) =>
          venit.id === updatedCategory.id ? response.data : venit
        );
        setVenituri(updatedVenituri);
      } else if (updatedCategory.type === "cheltuiala") {
        const updatedCheltuieli = cheltuieli.map((cheltuiala) =>
          cheltuiala.id === updatedCategory.id ? response.data : cheltuiala
        );
        setCheltuieli(updatedCheltuieli);
      }
      toast.success("Categoria a fost actualizată cu succes!", {
        toastId: "update-categorie-succes",
      });
    } catch (error) {
      console.error(
        "Error updating category:",
        error.response ? error.response.data : error.message
      );
      toast.error("Eroare la actualizarea categoriei!", {
        toastId: "update-categorie-eroare",
      });
    }
  };

  const createCategory = async (data) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `http://localhost:8080/api/categories/user/${userId}`,
        data
      );
      // După ce categoria a fost adăugată cu succes, actualizează lista de venituri sau cheltuieli
      if (data.type === "venit") {
        const updatedVenituri = [...venituri, response.data];
        setVenituri(updatedVenituri);
      } else if (data.type === "cheltuiala") {
        const updatedCheltuieli = [...cheltuieli, response.data];
        setCheltuieli(updatedCheltuieli);
      }
      return response.data;
    } catch (error) {
      console.error(
        "Error creating category:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const handleAdaugaTipVenit = async () => {
    if (tipVenit && dataIncasare) {
      try {
        await createCategory({ name: tipVenit, type: "venit" });
        toast.success("Tip de venit adăugat cu succes!", {
          toastId: "add-venit-succes",
        });
        setTipVenit("");
        setDataIncasare("");
        setIsModal1Open(!isModal1Open);
      } catch (error) {
        toast.error("Eroare la adăugarea tipului de venit!", {
          toastId: "add-venit-eroare",
        });
      }
    } else {
      toast.error("Completați toate câmpurile pentru tipul de venit!", {
        toastId: "add-venit-incomplet",
      });
    }
  };

  const handleAdaugaTipCheltuiala = async () => {
    if (denumireCheltuiala) {
      try {
        await createCategory({
          name: denumireCheltuiala,
          type: "cheltuiala",
          maxValue: valoareMaxima,
        });
        toast.success("Tip de cheltuială adăugat cu succes!", {
          toastId: "add-cheltuiala-succes",
        });
        setDenumireCheltuiala("");
        setValoareMaxima(0);
        setIsModal2Open(!isModal2Open);
      } catch (error) {
        toast.error("Eroare la adăugarea tipului de cheltuială!", {
          toastId: "add-cheltuiala-eroare",
        });
      }
    } else {
      toast.error("Completați denumirea pentru tipul de cheltuială!", {
        toastId: "add-cheltuiala-incomplet",
      });
    }
  };

  return (
    <div className="container-pp mt-5">
      <Modal
        isOpen={isModal1Open}
        onRequestClose={() => setIsModal1Open(false)}
        contentLabel="Adaugă tip venit"
        className="popup"
        overlayClassName="overlay"
        appElement={document.getElementById("root")}
      >
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
          <h2>Adaugă tip venit</h2>
          <div className="adauga-tip-venit">
            <div className="adauga">
              <label className="labele">Denumire:</label>
              <input
                className="inpute"
                type="text"
                value={tipVenit}
                onChange={(e) => setTipVenit(e.target.value)}
              />
            </div>
            <div className="adauga">
              <label className="labele">Data Posibilă a Incasării:</label>
              <input
                className="inpute"
                type="date"
                value={dataIncasare}
                onChange={(e) => setDataIncasare(e.target.value)}
              />
            </div>
            <button className="btn-add" onClick={handleAdaugaTipVenit}>
              Adaugă
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isModal2Open}
        onRequestClose={() => setIsModal2Open(false)}
        contentLabel="Adaugă tip cheltuiala"
        className="popup"
        overlayClassName="overlay"
        appElement={document.getElementById("root")}
      >
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
          <h2>Adaugă tip cheltuiala</h2>
          <div className="adauga-tip-cheltuiala">
            <div className="adauga">
              <label className="labele">Denumire:</label>
              <input
                className="inpute"
                type="text"
                value={denumireCheltuiala}
                onChange={(e) => setDenumireCheltuiala(e.target.value)}
              />
            </div>
            <div className="adauga">
              <label className="labele">Valoare Maximă:</label>
              <input
                className="inpute"
                type="number"
                value={valoareMaxima}
                onChange={(e) => setValoareMaxima(e.target.value)}
              />
            </div>
            <button className="btn-add" onClick={handleAdaugaTipCheltuiala}>
              Adaugă
            </button>
          </div>
        </div>
      </Modal>

      <EditCategoryModal
        show={showEditModal}
        category={selectedCategory}
        onSave={saveEditedCategory}
        onClose={handleCloseEditModal}
      />

      <div className="px-5">
        <div className="met-container d-flex flex-column justify-content-center align-items-center p-3 mb-2 text-white">
          <h1>Adauga tipuri</h1>
          <p>
            Aceasta sectiune este dedicata adaugarii de noi tipuri de venit si
            cheltuieli folosite de dvs.{" "}
          </p>
        </div>

        <div className="d-flex flex-row justify-content-start align-items-center mt-4">
          <div className="w-50 px-4">
            <button
              className="btn-met"
              onClick={() => setIsModal1Open(!isModal1Open)}
            >
              Adaugă Tip Venit
            </button>
          </div>
          <div className="w-50 px-4">
            <button
              className="btn-met"
              onClick={() => setIsModal2Open(!isModal2Open)}
            >
              Adaugă Tip Cheltuială
            </button>
          </div>
        </div>

        <div className="d-flex flex-row justify-content-center align-items-start mt-4 w-100">
          <div className="w-50 px-4">
            <h2>Lista tipuri venituri</h2>
            <ul className="list-group">
              {venituri.map((venit) => (
                <li
                  key={venit.id}
                  className="list-group-item"
                  onClick={() => handleEditCategory(venit)}
                >
                  {venit.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-50 px-4">
            <h2>Lista tipuri cheltuieli</h2>
            <ul className="list-group">
              {cheltuieli.map((cheltuiala) => (
                <li
                  key={cheltuiala.id}
                  className="list-group-item"
                  onClick={() => handleEditCategory(cheltuiala)}
                >
                  {cheltuiala.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metadata;
