import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/categoryPage.css";
import { API_URL, getImageUrl } from "../config/apiConfig";

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    console.log(`🔄 START: Loading category ${id} from ${API_URL}`);
    setLoading(true);
    
    // Fetch category details
    fetch(`${API_URL}/api/categories/${id}`)
      .then(res => {
        console.log(`📡 RESPONSE STATUS: ${res.status} ${res.statusText}`);
        console.log(`📡 RESPONSE OK: ${res.ok}`);
        console.log(`📡 RESPONSE URL: ${res.url}`);
        
        // Get raw response text first
        return res.text().then(text => {
          console.log(`📦 RAW RESPONSE TEXT:`, text);
          setRawData(text);
          
          try {
            const data = JSON.parse(text);
            console.log(`✅ PARSED JSON:`, data);
            console.log(`✅ Data type: ${typeof data}`);
            console.log(`✅ Has id?: ${!!data.id}`);
            console.log(`✅ Has name?: ${!!data.name}`);
            console.log(`✅ Is object?: ${typeof data === 'object'}`);
            console.log(`✅ Is array?: ${Array.isArray(data)}`);
            
            return data;
          } catch (e) {
            console.error(`❌ JSON PARSE ERROR:`, e);
            throw new Error(`Invalid JSON: ${text.substring(0, 100)}...`);
          }
        });
      })
      .then(data => {
        console.log('🎯 FINAL DATA TO PROCESS:', data);
        
        // Check EVERY possible format
        if (data === null || data === undefined) {
          console.log('❌ Data is null/undefined');
          setCategory(null);
        } else if (data.message === 'Category not found') {
          console.log('❌ API returned "not found" message');
          setCategory(null);
        } else if (data.id && data.name) {
          console.log(`✅ Found valid category: ${data.name} (ID: ${data.id})`);
          setCategory(data);
        } else if (data.rows && data.rows[0]) {
          console.log(`✅ Found PostgreSQL result, using rows[0]:`, data.rows[0]);
          setCategory(data.rows[0]);
        } else if (typeof data === 'object') {
          console.log('⚠️ Data is object but missing id/name:', data);
          // Try to use it anyway if it looks like a category
          setCategory(data);
        } else {
          console.error('❌ Unknown data format:', data);
          setCategory(null);
        }
        
        // Continue with other fetches...
        return fetch(`${API_URL}/api/subcategories/${id}`);
      })
      .then(res => res.json())
      .then(subcatData => {
        const subcategoriesArray = (subcatData && subcatData.rows) || subcatData || [];
        setSubcategories(subcategoriesArray);
        
        return fetch(`${API_URL}/api/places`);
      })
      .then(res => res.json())
      .then(allPlaces => {
        const placesArray = (allPlaces && allPlaces.rows) || allPlaces || [];
        const filteredPlaces = placesArray.filter(
          place => place.category_id && place.category_id.toString() === id
        );
        setPlaces(filteredPlaces);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ FINAL ERROR:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Loading Category {id}...</h2>
        <p>API: {API_URL}/api/categories/{id}</p>
        <p>Check browser console (F12) for details</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div style={{ 
        padding: "50px", 
        textAlign: "center",
        background: "#fff3cd",
        border: "1px solid #ffeaa7",
        borderRadius: "8px",
        margin: "50px",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        <h2 style={{ color: "#856404" }}>⚠️ Category Not Found</h2>
        <p><strong>Category ID:</strong> {id}</p>
        <p><strong>API Endpoint:</strong> {API_URL}/api/categories/{id}</p>
        
        <div style={{ 
          marginTop: "20px", 
          padding: "15px", 
          background: "#f8f9fa",
          borderRadius: "5px",
          textAlign: "left",
          fontFamily: "monospace",
          fontSize: "12px"
        }}>
          <h4>Raw API Response:</h4>
          <pre>{rawData || "No data received"}</pre>
        </div>
        
        <div style={{ marginTop: "20px" }}>
          <button 
            onClick={() => window.location.href = "/categories"}
            style={{
              padding: "10px 20px",
              background: "#2e7d32",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              margin: "5px"
            }}
          >
            Back to Categories
          </button>
          <button 
            onClick={() => window.open(`${API_URL}/api/categories/${id}`, '_blank')}
            style={{
              padding: "10px 20px",
              background: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              margin: "5px"
            }}
          >
            Test API in New Tab
          </button>
        </div>
      </div>
    );
  }

  // YOUR ORIGINAL RENDER CODE
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
          <h2>Sub-Categories</h2>
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
                                src={getImageUrl(place.image)} 
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
                        src={getImageUrl(place.image)} 
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