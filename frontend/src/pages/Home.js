import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import "../styles/home.css";
import saidaImage from '../assets/images/saida.png';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-page">
      {/* Static welcome section */}
      <section className="saida-intro">
        <div className="intro-container">
          {/* <img src="../assets/images/saida.jpg" alt="Saida" className="intro-image" /> */}
          <img src={saidaImage} alt="Saida" className="intro-image" />
          <div className="intro-text">
            <h1>Welcome to Saida</h1>
            <p>
              Saida (Sidon) is one of Lebanon’s oldest coastal cities. It has a long
              history that goes back thousands of years, starting with the Phoenicians.
              The city grew under many civilizations including the Crusaders and Ottomans.
              Today, Saida is known for its Sea Castle, old souks, traditional food, and
              its beautiful coastal atmosphere.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic categories section */}
      <section className="categories-preview">
        <h2>Top Places</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
        {/* Optional see-all button if needed */}
        {/* <div className="see-all-container">
          <a href="/categories" className="see-all-btn">See All</a>
        </div> */}
      </section>
    </div>
  );
};

export default Home;
