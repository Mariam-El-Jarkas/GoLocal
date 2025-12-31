import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/subcategoryPlaces.css";

const SubcategoryPlacesPage = () => {
  const { id } = useParams();
  const [subcategory, setSubcategory] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Fetch subcategory details
    fetch(`http://localhost:5000/api/subcategories/${id}/details`)
      .then(res => res.json())
      .then(data => {
        setSubcategory(data);
        
        // Fetch all places and filter by subcategory_id
        return fetch("http://localhost:5000/api/places");
      })
      .then(res => res.json())
      .then(allPlaces => {
        const filteredPlaces = allPlaces.filter(
          place => place.subcategory_id && place.subcategory_id.toString() === id
        );
        setPlaces(filteredPlaces);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading subcategory:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!subcategory) return <div className="error">Subcategory not found</div>;

  return (
    <div className="subcategory-places-page">
      <h1>{subcategory.name} Places</h1>
      <p className="back-link">
        <Link to={`/category/${subcategory.category_id}`}>
          ← Back to {subcategory.category_name || "Category"}
        </Link>
      </p>
      
      {places.length > 0 ? (
        <div className="places-grid">
          {places.map(place => (
            <Link 
              key={place.id} 
              to={`/place/${place.id}`}
              className="place-card-link"
            >
              <div className="place-card">
                {place.image && (
                  <img 
                    src={`http://localhost:5000${place.image}`} 
                    alt={place.name}
                    className="place-image"
                  />
                )}
                <div className="place-content">
                  <h3>{place.name}</h3>
                  <p className="place-address">{place.address}</p>
                  <p className="place-desc">{place.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="no-places">No places in this subcategory yet</p>
      )}
    </div>
  );
};

export default SubcategoryPlacesPage;