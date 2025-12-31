import React, { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";
import "../styles/home.css";
import saidaImage from '../assets/images/saida.png';

const API_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true); // ADD THIS

  useEffect(() => {
    setLoading(true); // ADD THIS
    fetch(`${API_URL}/api/places`)
      .then((res) => res.json())
      .then((data) => {
        const newestPlaces = data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 6);
        setPlaces(newestPlaces);
        setLoading(false); // ADD THIS
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // ADD THIS
      });
  }, []);

  // ADD THIS LOADING CHECK
  if (loading) {
    return (
      <div className="home-page">
        <section className="saida-intro">
          <div className="intro-container">
            <img src={saidaImage} alt="Saida" className="intro-image" />
            <div className="intro-text">
              <h1>Welcome to Saida</h1>
              <p>
                Saida (Sidon) is one of Lebanon's oldest coastal cities. It has a long
                history that goes back thousands of years, starting with the Phoenicians.
                The city grew under many civilizations including the Crusaders and Ottomans.
                Today, Saida is known for its Sea Castle, old souks, traditional food, and
                its beautiful coastal atmosphere.
              </p>
            </div>
          </div>
        </section>
        
        <section className="categories-preview">
          <h2>Top Places</h2>
          <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>
            Loading places...
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="home-page">
      <section className="saida-intro">
        <div className="intro-container">
          <img src={saidaImage} alt="Saida" className="intro-image" />
          <div className="intro-text">
            <h1>Welcome to Saida</h1>
            <p>
              Saida (Sidon) is one of Lebanon's oldest coastal cities. It has a long
              history that goes back thousands of years, starting with the Phoenicians.
              The city grew under many civilizations including the Crusaders and Ottomans.
              Today, Saida is known for its Sea Castle, old souks, traditional food, and
              its beautiful coastal atmosphere.
            </p>
          </div>
        </div>
      </section>

      <section className="categories-preview">
        <h2>Top Places</h2>
        <div className="categories-grid">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;