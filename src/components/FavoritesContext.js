import React, { createContext, useContext, useState, useEffect } from 'react';

// Creăm contextul
const FavoritesContext = createContext();

// Funcție pentru utilizarea contextului
export const useFavorites = () => useContext(FavoritesContext);

// Provider-ul pentru gestiunea favorite
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Funcție pentru a adăuga o destinație la favorite
  const addFavorite = (destination) => {
    if (!favorites.some((fav) => fav.name === destination.name)) {
      const updatedFavorites = [...favorites, destination];
      setFavorites(updatedFavorites);
      sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      alert(`${destination.name} a fost adăugat la favorite!`);
    } else {
      alert(`${destination.name} este deja în lista de favorite!`);
    }
  };  

  useEffect(() => {
    const storedFavorites = sessionStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);  

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
