import React from 'react';
import { Link } from 'react-router-dom';
import planeLogo from '../assets/plane.png';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        TravelMosaic
        <img src={planeLogo} alt="Logo avion" className="navbar-logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/">Acasă</a>
        </li>
        <li>
          <a href="/destinations">Destinații</a>
        </li>
        <li>
          <a href="/cost-calculator">Calculator costuri</a>
        </li>
        <li>
          <a href="/favorites">Favorite</a>
        </li>
        <li>
          <a href="/itinerary">Itinerariu</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;


