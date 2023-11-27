import React, { useState, useEffect } from "react";
import "./Datorii.scss";
import { toast } from "react-toastify";
import Modal from "react-modal";

const Datorii = () => {
    const [datorii, setDatorii] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [denumire, setDenumire] = useState("");
    const [suma, setSuma] = useState("");
    const [dataImprumut, setDataImprumut] = useState("");
    const [dataScadenta, setDataScadenta] = useState("");

    useEffect(() => {
        adaugaDatorieExemplu();
        // Logica pentru încărcarea inițială a datelor, dacă este necesar
    }, []);

    const adaugaDatorieExemplu = () => {
        const datoriiExemplu = [
            {
                denumire: "Chirie",
                suma: "1500",
                dataImprumut: "2023-01-01",
                dataScadenta: "2023-01-31",
                status: true,
            },
            {
                denumire: "Credit Card",
                suma: "500",
                dataImprumut: "2023-02-01",
                dataScadenta: "2023-02-28",
                status: false,
            },
            {
                denumire: "Imprumut de la prieten",
                suma: "200",
                dataImprumut: "2023-03-01",
                dataScadenta: "2023-03-15",
                status: true,
            },
            {
                denumire: "Mancare",
                suma: "200",
                dataImprumut: "2023-03-01",
                dataScadenta: "2023-03-15",
                status: false,
            },
            {
                denumire: "Scoala",
                suma: "200",
                dataImprumut: "2023-03-01",
                dataScadenta: "2023-03-15",
                status: true,
            },
            {
                denumire: "PC",
                suma: "200",
                dataImprumut: "2023-03-01",
                dataScadenta: "2023-03-15",
                status: false,
            },
        ];

        setDatorii([...datorii, ...datoriiExemplu]);
        toast.success("Datorii de exemplu adăugate cu succes!");
    };

    const handleAdaugaDatorii = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validare și adăugare datorie în starea 'datorii'
        if (denumire && suma && dataImprumut && dataScadenta) {
            const nouaDatorie = {
                denumire,
                suma,
                dataImprumut,
                dataScadenta,
                status: false,
            };

            setDatorii([...datorii, nouaDatorie]);
            toast.success("Datorie adăugată cu succes!");
            // Resetarea valorilor din formular
            setDenumire("");
            setSuma("");
            setDataImprumut("");
            setDataScadenta("");
            // Închide modalul după adăugare
            handleCloseModal();
        } else {
            toast.error("Toate câmpurile sunt obligatorii!");
        }
    };

    // Funcție pentru marcarea datoriei ca plătită
    const handlePlatireDatorie = (index) => {
        const datoriePlatita = datorii[index];
        datoriePlatita.status = true;

        // Actualizează starea cu datoria marcată ca plătită
        setDatorii([...datorii.slice(0, index), datoriePlatita, ...datorii.slice(index + 1)]);
    };

    return (
        <div className="datorii-container d-flex flex-column justify-content-center align-items-center p-3 mb-2 bg-success text-white">
            <div className="butoane-container">
                <button onClick={handleAdaugaDatorii}>Adaugă Datorii</button>
            </div>

            <div className="vizualizare-datorii-container">
                <h2>Datorii Plătite</h2>
                {/* Tabel pentru datoriile plătite */}
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
                        {datorii
                            .filter((datorie) => datorie.status)
                            .map((datorie, index) => (
                                <tr key={index}>
                                    <td>{datorie.denumire}</td>
                                    <td>{datorie.suma}</td>
                                    <td>{datorie.dataImprumut}</td>
                                    <td>{datorie.dataScadenta}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <h2>Datorii Neplătite</h2>
                {/* Tabel pentru datoriile neplătite */}
                <table>
                    <thead>
                        <tr>
                            <th>Denumire</th>
                            <th>Suma</th>
                            <th>Data Imprumut</th>
                            <th>Data Scadenta</th>
                            <th>Acțiuni</th> {/* Adăugată coloană pentru acțiuni */}
                        </tr>
                    </thead>
                    <tbody>
                        {datorii
                            .filter((datorie) => !datorie.status)
                            .map((datorie, index) => (
                                <tr key={index}>
                                    <td>{datorie.denumire}</td>
                                    <td>{datorie.suma}</td>
                                    <td>{datorie.dataImprumut}</td>
                                    <td>{datorie.dataScadenta}</td>
                                    <td>
                                        <button onClick={() => handlePlatireDatorie(index)}>
                                            Marchează ca plătită
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Adaugă Datorie"
                    className="popup"
                    overlayClassName="overlay"
                >
                    <div className="adauga-datorii-container">
                        <h2>Adaugă Datorii</h2>
                        {/* Formular pentru adăugarea de datorii */}
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
                            <button type="button" onClick={handleCloseModal}>
                                Închide
                            </button>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Datorii;
