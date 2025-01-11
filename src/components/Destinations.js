import React, { useState } from 'react';
import { useFavorites } from './FavoritesContext';
import DestinationCard from './DestinationCard';
import { destinationsData } from '../data/data';

const Destinations = () => {
  const [budget, setBudget] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState(destinationsData);
  const { addFavorite } = useFavorites(); // Accesăm funcția din context

  const handleFilter = () => {
    const filtered = destinationsData.filter(
      (destination) => destination.cost <= parseInt(budget, 10)
    );
    setFilteredDestinations(filtered);
  };

  return (
    <div className="destination-page">
      <div className="destination-container">
        {filteredDestinations.map((destination, index) => (
          <div key={index} className="destination-card-wrapper">
            <DestinationCard
              name={destination.name}
              image={destination.image}
              description={destination.description}
              cost={destination.cost}
            />
            <button
              className="destination-button"
              onClick={() => addFavorite(destination)} // Adăugăm destinația la favorite
            >
              Adaugă la favorite
            </button>
          </div>
        ))}
      </div>

      <div className="filter-container">
        <input
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Introduceți bugetul maxim"
          className="budget-input"
        />
        <button onClick={handleFilter} className="budget-button">
          Filtrează
        </button>
      </div>
    </div>
  );
};

export default Destinations;
