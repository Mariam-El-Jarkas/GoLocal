import React, { useEffect, useState } from "react";
import PlaceCard from "../../components/PlaceCard";
import "../../styles/food.css";

const Food = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/places")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p) => p.category_id === 1); // Food category ID
        setPlaces(filtered);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="food-container">
      <h1>Food Places</h1>
      <div className="places-grid">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
};

export default Food;

