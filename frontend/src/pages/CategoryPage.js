import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/categoryPage.css";

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Fetch category details
    fetch(`http://localhost:5000/api/categories/${id}`)
      .then(res => res.json())
      .then(data => {
        setCategory(data);
        
        // Fetch subcategories for this category
        return fetch(`http://localhost:5000/api/subcategories/${id}`);
      })
      .then(res => res.json())
      .then(subcatData => {
        setSubcategories(subcatData);
        
        // Fetch all places
        return fetch("http://localhost:5000/api/places");
      })
      .then(res => res.json())
      .then(allPlaces => {
        // Filter places for this category
        const filteredPlaces = allPlaces.filter(
          place => place.category_id && place.category_id.toString() === id
        );
        setPlaces(filteredPlaces);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading category:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!category) return <div className="error">Category not found</div>;

  return (
    <div className="category-page" style={{ marginTop: "100px" }}>
      {/* Category Header WITHOUT Icon */}
      <div className="category-header">
        <h1 style={{ 
          textAlign: "center", 
          color: "#2e7d32",
          margin: "0 0 30px 0",
          fontSize: "2.5rem",
          fontWeight: "600"
        }}>
          {category.name}
        </h1>
      </div>

      {/* If category has subcategories */}
      {subcategories.length > 0 ? (
        <div className="subcategories-section">
       <h2 >
  Sub-Categories
</h2>
          <div className="subcategories-grid">
            {subcategories.map(subcat => {
              // Get places for this subcategory
              const subcatPlaces = places.filter(
                place => place.subcategory_id && place.subcategory_id === subcat.id
              );
              
              return (
                <div key={subcat.id} className="subcategory-card">
                  <h3>
                    {subcat.name}
                  </h3>
                  
                  {/* Show places under this subcategory */}
                  <div className="subcategory-places">
                    {subcatPlaces.length > 0 ? (
                      subcatPlaces.map(place => (
                        <a 
                          key={place.id} 
                          href={`/place/${place.id}`}
                          className="place-link"
                        >
                          <div className="place-item">
                            {place.image && (
                              <img 
                                src={`http://localhost:5000${place.image}`} 
                                alt={place.name}
                                className="place-thumb"
                              />
                            )}
                            <div className="place-info">
                              <h4>{place.name}</h4>
                              <p className="place-address">
                                {place.address || "No address provided"}
                              </p>
                            </div>
                          </div>
                        </a>
                      ))
                    ) : (
                      <p style={{ 
                        textAlign: "center", 
                        color: "#888", 
                        fontStyle: "italic",
                        padding: "20px",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "6px"
                      }}>
                        No places in this subcategory yet
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* If no subcategories, show places directly */
        <div className="places-section">
          <h2 style={{
            color: "#333",
            borderBottom: "2px solid #2e7d32",
            paddingBottom: "10px",
            marginBottom: "30px",
            fontSize: "1.8rem"
          }}>
            Places
          </h2>
          
          {places.length > 0 ? (
            <div className="places-grid">
              {places.map(place => (
                <a 
                  key={place.id} 
                  href={`/place/${place.id}`}
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
                      {place.address && (
                        <p style={{ 
                          margin: "0 0 10px 0", 
                          color: "#666",
                          fontSize: "0.95rem"
                        }}>
                          📍 {place.address}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="no-places">
              <span 
                className="material-icons"
                style={{
                  fontSize: "48px",
                  color: "#ccc",
                  marginBottom: "15px",
                  display: "block"
                }}
              >
                location_off
              </span>
              <p style={{ 
                color: "#888", 
                fontStyle: "italic",
                fontSize: "1.1rem",
                margin: "0"
              }}>
                No places in this category yet
              </p>
              <p style={{ 
                color: "#aaa",
                fontSize: "0.9rem",
                marginTop: "10px"
              }}>
                Add some places from the admin dashboard
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;