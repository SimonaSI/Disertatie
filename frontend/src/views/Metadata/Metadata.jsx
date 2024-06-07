import React, { useState, useEffect } from "react";
import "./Metadata.scss";
import { toast } from "react-toastify";
import axios from "axios";

const Metadata = () => {
  const [tipAdaugare, setTipAdaugare] = useState("");
  const [tipVenit, setTipVenit] = useState("");
  const [dataIncasare, setDataIncasare] = useState("");
  const [denumireCheltuiala, setDenumireCheltuiala] = useState("");
  const [valoareMaxima, setValoareMaxima] = useState(0);
  const [venituri, setVenituri] = useState([]);
  const [cheltuieli, setCheltuieli] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const responseVenituri = await axios.get(`http://localhost:8080/api/categories/income/${userId}`);
        setVenituri(responseVenituri.data);

        const responseCheltuieli = await axios.get(`http://localhost:8080/api/categories/expense/${userId}`);
        setCheltuieli(responseCheltuieli.data);
      } catch (error) {
        console.error('Error fetching categories:', error.response ? error.response.data : error.message);
      }
    };
    fetchCategories();
  }, []);

  const createCategory = async (data) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(`http://localhost:8080/api/categories/user/${userId}`, data);
      // După ce categoria a fost adăugată cu succes, actualizează lista de venituri sau cheltuieli
      if (data.type === 'venit') {
        const updatedVenituri = [...venituri, response.data];
        setVenituri(updatedVenituri);
      } else if (data.type === 'cheltuiala') {
        const updatedCheltuieli = [...cheltuieli, response.data];
        setCheltuieli(updatedCheltuieli);
      }
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const handleAdaugaTipVenit = async () => {
    if (tipVenit && dataIncasare) {
      try {
        await createCategory({ name: tipVenit, type: 'venit' });
        toast.success("Tip de venit adăugat cu succes!");
        setTipVenit("");
        setDataIncasare("");
        setTipAdaugare("");
      } catch (error) {
        toast.error("Eroare la adăugarea tipului de venit!");
      }
    } else {
      toast.error("Completați toate câmpurile pentru tipul de venit!");
    }
  };

  const handleAdaugaTipCheltuiala = async () => {
    if (denumireCheltuiala) {
      try {
        await createCategory({ name: denumireCheltuiala, type: 'cheltuiala' });
        toast.success("Tip de cheltuială adăugat cu succes!");
        setDenumireCheltuiala("");
        setValoareMaxima(0);
        setTipAdaugare("");
      } catch (error) {
        toast.error("Eroare la adăugarea tipului de cheltuială!");
      }
    } else {
      toast.error("Completați denumirea pentru tipul de cheltuială!");
    }
  };

  return (
    <div className="container-pp mt-5">
      <div className="met-container d-flex flex-column justify-content-center align-items-center p-3 mb-2 text-white">
        <h1>Adauga tipuri</h1>
        <p>Aceasta sectiune este dedicata adaugarii de noi tipuri de venit si cheltuieli folosite de dvs. </p>
      </div>

      <div className="d-flex flex-row justify-content-center align-items-center m-2">
        <button className="btn-met m-2" onClick={() => setTipAdaugare("venit")}>Adaugă Tip Venit</button>
       
        <button className="btn-met m-2" onClick={() => setTipAdaugare("cheltuiala")}>Adaugă Tip Cheltuială</button>
      </div>

      <div className="d-flex flex-row justify-content-center align-items-center m-2 w-100">
        <div className="w-50">
          <h2>Lista tipuri venituri</h2>
          <ul className="list-group">
            {venituri.map(venit => (
              <li key={venit.id} className="list-group-item">{venit.name}</li>
            ))}
          </ul>
        </div>
        <div className="w-50">
          <h2>Lista tipuri cheltuieli</h2>
          <ul className="list-group">
            {cheltuieli.map(cheltuiala => (
              <li key={cheltuiala.id} className="list-group-item">{cheltuiala.name}</li>
            ))}
          </ul>
        </div>
      </div>

      {tipAdaugare === "venit" && (
        <div className="w-100 d-flex flex-row justify-content-center align-items-center m-2">
          <div className="adauga-tip-venit">
            <div className="adauga">
              <label className="labele">
                Denumire:
              </label>
              <input className="inpute"
                type="text"
                value={tipVenit}
                onChange={(e) => setTipVenit(e.target.value)}
              />
            </div>
            <div className="adauga">
              <label className="labele">
                Data Posibilă a Incasării:
              </label>
              <input className="inpute"
                type="date"
                value={dataIncasare}
                onChange={(e) => setDataIncasare(e.target.value)}
              />
            </div>
            <button className="btn-add" onClick={handleAdaugaTipVenit}>Adaugă Tip</button>
          </div>
        </div>
      )}

      {tipAdaugare === "cheltuiala" && (
        <div className="w-100 d-flex flex-row justify-content-center align-items-center m-2">
          <div className="adauga-tip-cheltuiala">
            <div className="adauga">
              <label className="labele">
                Denumire:
              </label>
              <input className="inpute"
                type="text"
                value={denumireCheltuiala}
                onChange={(e) => setDenumireCheltuiala(e.target.value)}
              />
            </div>
            <div className="adauga">
              <label className="labele">
                Valoare Maximă:
              </label>
              <input className="inpute"
                type="number"
                value={valoareMaxima}
                onChange={(e) => setValoareMaxima(e.target.value)}
              />
            </div>
            <button className="btn-add" onClick={handleAdaugaTipCheltuiala}>Adaugă Tip</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Metadata;
