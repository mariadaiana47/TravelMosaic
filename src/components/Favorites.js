import React from 'react';
import { useFavorites } from './FavoritesContext';

const Favorites = () => {
  const { favorites } = useFavorites();

  const mockReviews = [
    { user: "Andrei Popescu", review: "Minunat! Recomand această destinație! ⭐⭐⭐⭐⭐" },
    { user: "Maria Ionescu", review: "O experiență de neuitat, foarte frumos! ⭐⭐⭐⭐" },
    { user: "Ioana Georgescu", review: "Peisaje de vis, dar mâncarea ar putea fi mai bună. ⭐⭐⭐" },
    { user: "Radu Mihai", review: "Perfect pentru relaxare și aventură. ⭐⭐⭐⭐⭐" },
    { user: "Alina Vasilescu", review: "Un loc de vis! Toată familia s-a simțit extraordinar. ⭐⭐⭐⭐⭐" },
    { user: "Cristian Dumitru", review: "Transportul local ar putea fi mai bine organizat, dar per total, o destinație frumoasă. ⭐⭐⭐⭐" },
    { user: "Gabriela Marin", review: "Istoria și cultura acestui loc sunt fascinante. Recomand! ⭐⭐⭐⭐⭐" },
    { user: "Bogdan Vasile", review: "Marea este incredibil de curată, iar atmosfera foarte relaxantă. ⭐⭐⭐⭐⭐" },
    { user: "Diana Ciobanu", review: "Un loc bun pentru escapade scurte, dar cam scump. ⭐⭐⭐⭐" },
    { user: "Marius Ene", review: "Servicii excelente și peisaje uluitoare! ⭐⭐⭐⭐⭐" },
  ];

  const getRandomReviews = () => {
    const shuffled = [...mockReviews].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3); // Afișăm 3 recenzii aleatorii
  };

  return (
    <div className="favorites-container">
      <h2>Destinațiile favorite</h2>
      <div className="favorites-list">
        {favorites.length === 0 ? (
          <p>Nu ai adăugat nicio destinație la favorite.</p>
        ) : (
          favorites.map((favorite, index) => (
            <div key={index} className="favorite-card">
              <img
                src={favorite.image}
                alt={favorite.name}
                className="favorite-image"
              />
              <h3>{favorite.name}</h3>
              <p>{favorite.description}</p>
              <p>Preț: {favorite.cost} € / săptămână</p>
              <div className="reviews">
                <h4>Recenzii utilizatori:</h4>
                {getRandomReviews().map((review, i) => (
                  <p key={i}>
                    <strong>Utilizator:</strong> {review.user} <br />
                    <strong>Review:</strong> {review.review}
                  </p>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
