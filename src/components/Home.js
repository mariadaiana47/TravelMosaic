import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';


const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bine ai venit la <span className="highlight">TravelMosaic</span>!</h1>
        <p>Alege o destinație, calculează costurile și organizează-ți itinerariul!</p>
        <Link to="/destinations" className="cta-button">Explorează Destinațiile</Link>
      </header>
      <section className="features-section">
        <h2>De ce să alegi TravelMosaic?</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Planificare rezervateapidă</h3>
            <p>Organizează-ți călătoria cu doar câteva clicuri.</p>
          </div>
          <div className="feature-card">
            <h3>Recomandări personalizate</h3>
            <p>Descoperă destinații potrivite bugetului tău.</p>
          </div>
          <div className="feature-card">
            <h3>Gestionare eficientă</h3>
            <p>Păstrează notițele și favoritele la un loc.</p>
          </div>
        </div>
      </section>
      <section className="popular-destinations">
        <h2>Destinații populare</h2>
        <div className="destination-cards">
          <div className="destination-card">
            <h3>Paris</h3>
            <p>Orașul Luminilor</p>
          </div>
          <div className="destination-card">
            <h3>Tokyo</h3>
            <p>Amestec de tradiție și tehnologie</p>
          </div>
          <div className="destination-card">
            <h3>New York</h3>
            <p>Admirați zgârie-norii</p>
          </div>
        </div>
      </section>
      <footer className="home-footer">
        <p>© 2024 TravelMosaic. Toate drepturile rezervate.</p>
      </footer>
    </div>
  );
};

export default Home;
