import React from 'react';

const DestinationCard = ({ name, image, description, cost, period = "/ săptămână" }) => {
  return (
    <div className="destination-card">
      <img src={image} alt={name} className="destination-image" />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Preț: {cost} € {period}</p>
    </div>
  );
};

export default DestinationCard;
