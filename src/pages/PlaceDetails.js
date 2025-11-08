import React from "react";
import { useParams } from "react-router-dom";
import placesData from "../components/placesData.js";
import "../styles/details.css";

function PlaceDetails() {
  const { id } = useParams();
  const place = placesData.find((p) => p.id.toString() === id);

  if (!place) {
    return <p className="details-page">Place not found.</p>;
  }

  return (
    <div className="details-page">
      <h1>{place.name}</h1>
      <img src={place.image} alt={place.name} className="place-image" />
      <p className="place-category"><strong>Category:</strong> {place.category}</p>
      <p className="place-address"><strong>Address:</strong> {place.address}</p>
      <p className="place-description">{place.description}</p>
    </div>
  );
}

export default PlaceDetails;
