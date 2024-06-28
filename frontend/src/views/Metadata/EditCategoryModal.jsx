import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const EditCategoryModal = ({ show, category, onSave, onClose }) => {
  const [name, setName] = useState(category?.name ? category?.name : "");
  const [newName, setNewName] = useState(category?.name ? category?.name : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName === name) {
      toast.info("Nu ati facut nicio modificare!", {
        toastId: "nicio-modificare",
      });
      return;
    }
    onSave({ ...category, name: newName });
    onClose();
  };

  useEffect(() => {
    setName(category?.name ? category?.name : "");
    setNewName(category?.name ? category?.name : "");
  }, [category]);

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      contentLabel="Editare metadata"
      className="popup"
      overlayClassName="overlay"
      appElement={document.getElementById("root")}
    >
      <div className="d-flex flex-column justify-content-start align-items-center edit-metadata-modal">
        <span
          className="close-edit-category-modal align-self-end"
          onClick={onClose}
        >
          &times;
        </span>
        <h2>Modificare {category?.type}</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <label htmlFor="name">Nume categorie:</label>
          <input
            type="text"
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button type="submit" className="mb-4 mt-3 edit-metadata-btn">
            Salvează
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;
