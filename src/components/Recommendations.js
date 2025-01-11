import React from 'react';

const Recommendations = ({ filteredDestinations, favorites, budget }) => {
  // Verificăm dacă bugetul este valid
  if (!budget || isNaN(budget) || Number(budget) <= 0) {
    return (
      <div className="recommendations-container">
        <h2>Recomandări pentru tine</h2>
        <p>Introduceți un buget pentru a primi recomandări.</p>
      </div>
    );
  }

  // Filtrăm destinațiile care nu sunt deja în favorite
  const recommendedDestinations = filteredDestinations.filter(
    (destination) => !favorites.some((fav) => fav.name === destination.name)
  );

  return (
    <div className="recommendations-container">
      <h2>Recomandări pentru tine</h2>
      {recommendedDestinations.length > 0 ? (
        <ul className="recommendations-list">
          {recommendedDestinations.map((destination, index) => (
            <li key={index}>
              {destination.name} - {destination.cost} €
            </li>
          ))}
        </ul>
      ) : (
        <p>Nu avem recomandări bazate pe bugetul introdus.</p>
      )}
    </div>
  );
};

export default Recommendations;
