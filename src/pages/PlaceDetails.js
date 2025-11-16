import React from "react";
// useParams allows accessing dynamic parameters from the URL
import { useParams } from "react-router-dom";
// Import the dataset containing all places
import placesData from "../components/placesData.js";
// Import CSS for styling this page
import "../styles/details.css";

function PlaceDetails() {
  // Extract the 'id' parameter from the URL
  const { id } = useParams();

  // Find the place with the matching id from the dataset
  const place = placesData.find((p) => p.id.toString() === id);

  // Render the details of the place
  return (
    <div className="details-page">
      {/* Display the place name */}
      <h1>{place.name}</h1>

      {/* Display the image of the place */}
      <img src={place.image} alt={place.name} className="place-image" />

      {/* Display the category */}
      <p className="place-category">
        <strong>Category:</strong> {place.category}
      </p>

      {/* Display the address */}
      <p className="place-address">
        <strong>Address:</strong> {place.address}
      </p>

      {/* Display the description */}
      <p className="place-description">{place.description}</p>
    </div>
  );
}

// Export the page for use in routes
export default PlaceDetails;
