import React, { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";
import "../styles/home.css";
import saidaImage from '../assets/images/saida.png';
import { API_URL } from '../config/apiConfig';

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/places`)
      .then((res) => {
        console.log('Response status:', res.status);
        console.log('Response ok:', res.ok);
        return res.json();
      })
      .then((data) => {
        console.log('📦 Data received from /api/places:', data);
        console.log('📦 Data type:', typeof data);
        console.log('📦 Is array?', Array.isArray(data));
        
        // Check if data is actually an array
        if (Array.isArray(data)) {
          const newestPlaces = data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 6);
          setPlaces(newestPlaces);
        } else {
          console.error('❌ ERROR: Data is NOT an array:', data);
          setPlaces([]); // Set empty array
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Fetch error:', err);
        setLoading(false);
      });
  }, []);

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