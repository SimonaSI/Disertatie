import React, { useState } from "react";
import "./Metadata.scss";
import { toast } from "react-toastify";

const Metadata = () => {
  const [tipAdaugare, setTipAdaugare] = useState("");
  const [tipVenit, setTipVenit] = useState("");
  const [dataIncasare, setDataIncasare] = useState("");
  const [denumireCheltuiala, setDenumireCheltuiala] = useState("");
  const [cheltuialaPeriodica, setCheltuialaPeriodica] = useState(false);
  const [dataAchitarii, setDataAchitarii] = useState("");
  const [valoareMaxima, setValoareMaxima] = useState(0);

  const handleAdaugaTipVenit = () => {
    if (tipAdaugare === "venit") {
      // Logica pentru adăugarea unui nou tip de venit
      if (tipVenit && dataIncasare) {
        toast.success("Tip de venit adăugat cu succes!");
        setTipVenit("");
        setDataIncasare("");
      } else {
        toast.error("Completați toate câmpurile pentru tipul de venit!");
      }
    }
  };

  const handleAdaugaTipCheltuiala = () => {
    if (tipAdaugare === "cheltuiala") {
      if (denumireCheltuiala) {
        toast.success("Tip de cheltuială adăugat cu succes!");
        setDenumireCheltuiala("");
        setCheltuialaPeriodica(false);
        setDataAchitarii("");
        setValoareMaxima(0);
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

      {tipAdaugare === "venit" && (
        <div className="w-100 d-flex flex-row justify-content-center align-items-center m-2">
          <div className="adauga-tip-venit">
            <div className="adauga">
              <label className="labele" >
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

            <div className="adauga">
              <label className="labele">
                Cheltuială Periodică:

              </label>

              <input className="inpute"
                type="checkbox"
                checked={cheltuialaPeriodica}
                onChange={(e) => setCheltuialaPeriodica(e.target.checked)}
              />

            </div>

            {cheltuialaPeriodica && (
              <>
                <div className="adauga">
                  <label className="labele">
                    Data Achitării:

                  </label>
                  <input className="inpute"
                    type="date"
                    value={dataAchitarii}
                    onChange={(e) => setDataAchitarii(e.target.value)}
                  />
                </div>

              </>

            )}
            <button className="btn-add" onClick={handleAdaugaTipCheltuiala}>Adaugă Tip</button>
          </div>
        </div>

      )}


    </div>
  );
};

export default Metadata;
