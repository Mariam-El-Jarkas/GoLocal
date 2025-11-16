//imports
import React from "react";
import PlaceCard from "../components/PlaceCard.js";
import placesData from "../components/placesData.js";
import { FaUtensils, FaChess,FaLandmark,FaHistory, FaCoffee,FaShoppingBag, FaTree} from "react-icons/fa";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-page">

      {/* 
        Saida introduction section.
        This shows a large image on the left and a paragraph on the right.
        Just meant to give a quick description of the city.
      */}
      <section className="saida-intro">
        <div className="intro-container">

          {/* Saida image */}
          <img
            src={require("../assets/images/saida.png")}
            alt="Saida"
            className="intro-image"
          />

          {/* Text description next to the image */}
          <div className="intro-text">
            <h1>Welcome to Saida</h1>
            <p>
              Saida (Sidon) is one of Lebanon’s oldest coastal cities.
              It has a long history that goes back thousands of years,
              starting with the Phoenicians. The city grew under many civilizations
              including the Crusaders and Ottomans. Today, Saida is known for
              its Sea Castle, old souks, traditional food, and its beautiful coastal atmosphere.
            </p>
          </div>

        </div>
      </section>


      {/* 
        Top Places section.
        I only show the first 6 places from the data file.
        Each place is rendered using the PlaceCard component.
      */}
      <section className="places-preview">
        <h2>Top Places</h2>

        <div className="place-cards">
          {placesData.slice(0, 6).map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;
