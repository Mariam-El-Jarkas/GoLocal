import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import "../styles/placeDetails.css";

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/places")
      .then((res) => res.json())
      .then((data) => {
        const foundPlace = data.find((p) => p.id === parseInt(id));
        setPlace(foundPlace);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!place) return <div>Loading...</div>;

  return (
    <div className="place-details-container">
      <h1>{place.name}</h1>
      <img src={place.image} alt={place.name} />
      <p>{place.description}</p>
      <p>{place.address}</p>
    </div>
  );
};

export default PlaceDetails;
