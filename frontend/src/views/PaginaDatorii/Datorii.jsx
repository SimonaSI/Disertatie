import React, { useState, useEffect } from "react";
import "./Datorii.scss";
import { toast } from "react-toastify";
import Modal from "react-modal";
import axios from "axios";

const Datorii = () => {
  const [datorii, setDatorii] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [denumire, setDenumire] = useState("");
  const [suma, setSuma] = useState("");
  const [dataImprumut, setDataImprumut] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dataScadenta, setDataScadenta] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/debts/user/${userId}`
      );
      setDatorii(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (denumire && suma && dataImprumut && dataScadenta) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/debts/user/${userId}`,
          {
            name: denumire,
            amount: suma,
            dateIncurred: dataImprumut,
            dueDate: dataScadenta,
          }
        );
        setDatorii([...datorii, response.data]);
        toast.success("Datorie adăugată cu succes!", {
          toastId: "add-datorie-succes",
        });
        setDenumire("");
        setSuma("");
        setDataImprumut("");
        setDataScadenta("");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error adding debt:", error);
        toast.error("Eroare la adăugarea datoriei!", {
          toastId: "add-datorie-error",
        });
      }
    } else {
      toast.error("Toate câmpurile sunt obligatorii!", {
        toastId: "add-datorie-incomplet",
      });
    }
  };

  const handlePlatireDatorie = async (id) => {
    let datorieFound = datorii.find((el) => el.id === id);
    const updatedDatorie = { ...datorieFound, isPaid: true };

    try {
      await axios.put(
        `http://localhost:8080/api/debts/${updatedDatorie.id}`,
        updatedDatorie
      );
      setDatorii((prevDatorii) => {
        return prevDatorii.map((datorie, idx) => {
          if (datorie.id === id) {
            return updatedDatorie;
          }
          return datorie;
        });
      });
      toast.success("Datorie marcată ca plătită!", {
        toastId: "datorie-platita",
      });
    } catch (error) {
      console.error("Error updating debt:", error);
      toast.error("Eroare la marcarea datoriei ca plătită!", {
        toastId: "datorie-platita-error",
      });
    }
  };

  return (
    <div className="datorii-container d-flex flex-column justify-content-center align-items-center p-3 mb-2 bg-success text-white">
      <div className="butoane-container">
        <button onClick={() => setIsModalOpen(true)}>Adaugă Datorie</button>
      </div>

      <div className="vizualizare-datorii-container">
        {/* Tabel pentru datoriile plătite */}
        <h2>Datorii Plătite</h2>
        <table>
          <thead>
            <tr>
              <th>Denumire</th>
              <th>Suma</th>
              <th>Data Imprumut</th>
              <th>Data Scadenta</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(datorii) &&
              datorii
                .filter((datorie) => datorie.isPaid)
                .map((datorie, index) => (
                  <tr key={index}>
                    <td>{datorie.name}</td>
                    <td>{datorie.amount}</td>
                    <td>
                      {new Date(datorie.dateIncurred).toLocaleDateString(
                        "ro-RO"
                      )}
                    </td>
                    <td>
                      {new Date(datorie.dueDate).toLocaleDateString("ro-RO")}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {/* Tabel pentru datoriile neplătite */}
        <h2>Datorii Neplătite</h2>
        <table>
          <thead>
            <tr>
              <th>Denumire</th>
              <th>Suma</th>
              <th>Data Imprumut</th>
              <th>Data Scadenta</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(datorii) &&
              datorii
                .filter((datorie) => !datorie.isPaid)
                .map((datorie, index) => (
                  <tr key={index}>
                    <td>{datorie.name}</td>
                    <td>{datorie.amount}</td>
                    <td>
                      {new Date(datorie.dateIncurred).toLocaleDateString(
                        "ro-RO"
                      )}
                    </td>
                    <td>
                      {new Date(datorie.dueDate).toLocaleDateString("ro-RO")}
                    </td>
                    <td>
                      <button onClick={() => handlePlatireDatorie(datorie.id)}>
                        Marchează ca plătită
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Adaugă Datorie"
        className="popup"
        overlayClassName="overlay"
      >
        <div className="adauga-datorii-container">
          <h2>Adaugă Datorie</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="denumire">Denumire:</label>
            <input
              type="text"
              id="denumire"
              value={denumire}
              onChange={(e) => setDenumire(e.target.value)}
            />

            <label htmlFor="suma">Suma:</label>
            <input
              type="text"
              id="suma"
              value={suma}
              onChange={(e) => setSuma(e.target.value)}
            />

            <label htmlFor="dataImprumut">Data imprumut:</label>
            <input
              type="date"
              id="dataImprumut"
              value={dataImprumut}
              onChange={(e) => setDataImprumut(e.target.value)}
            />

            <label htmlFor="dataScadenta">Data scadenta:</label>
            <input
              type="date"
              id="dataScadenta"
              value={dataScadenta}
              onChange={(e) => setDataScadenta(e.target.value)}
            />

            <button type="submit">Adaugă Datorie</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Datorii;
