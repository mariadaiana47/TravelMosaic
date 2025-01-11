import React from 'react';
import './style.css';

const DestinationFilter = ({ budget, setBudget, onFilter }) => {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Introduceți bugetul maxim (€)"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="budget-input"
      />
      <button onClick={onFilter} className="budget-button">
        Filtrează
      </button>
    </div>
  );
};

export default DestinationFilter;
