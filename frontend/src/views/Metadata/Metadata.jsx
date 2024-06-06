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
        const response = await axios.get('http://localhost:8080/api/categories'); // Ajustează URL-ul la adresa backend-ului tău
        const venituriData = response.data.filter(category => category.type === 'venit');
        const cheltuieliData = response.data.filter(category => category.type === 'cheltuiala');
        setVenituri(venituriData);
        setCheltuieli(cheltuieliData);
      } catch (error) {
        console.error('Error fetching categories:', error.response ? error.response.data : error.message);
      }
    };
    fetchCategories();
  }, []);

  const createCategory = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/categories', data); // Ajustează URL-ul la adresa backend-ului tău
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const handleAdaugaTipVenit = async () => {
    if (tipAdaugare === "venit") {
      if (tipVenit && dataIncasare) {
        try {
          await createCategory({ name: tipVenit, type: 'venit', userId: 1 }); // Setează userId corespunzător
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
    }
  };

  const handleAdaugaTipCheltuiala = async () => {
    if (tipAdaugare === "cheltuiala") {
      if (denumireCheltuiala) {
        try {
          await createCategory({ name: denumireCheltuiala, type: 'cheltuiala', userId: 1 }); // Setează userId corespunzător
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
            <button className="btn-close" onClick={() => setTipAdaugare("")}>×</button>
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
            <button className="btn-close" onClick={() => setTipAdaugare("")}>×</button>
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
