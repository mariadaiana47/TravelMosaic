import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './components/FavoritesContext';
import Navbar from './components/Navbar';
import Destinations from './components/Destinations';
import CostCalculator from './components/CostCalculator';
import Favorites from './components/Favorites';
import Recommendations from './components/Recommendations';
import Itinerary from './components/Itinerary';
import Home from './components/Home';
import './style.css'; 

const App = () => {
  return (
    <FavoritesProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/cost-calculator" element={<CostCalculator />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
