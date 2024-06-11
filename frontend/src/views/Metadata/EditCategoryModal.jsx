import React, { useState } from 'react';

const EditCategoryModal = ({ category, onSave, onClose }) => {
  const [name, setName] = useState(category.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...category, name });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Modificare categorie</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nume categorie:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Salvează</button>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
