import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaArrowLeft } from "react-icons/fa";

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    fetch(`http://localhost:5000/api/places/${id}`)
      .then(res => res.json())
      .then(placeData => {
        setPlace(placeData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading place:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <>
      <Navbar />
      <div style={{ 
        minHeight: "50vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <p>Loading place details...</p>
      </div>
      <Footer />
    </>
  );
  
  if (!place) return (
    <>
     
      <div style={{ 
        minHeight: "50vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        flexDirection: "column" 
      }}>
        <h2 style={{ color: "#dc3545", marginBottom: "20px" }}>Place not found</h2>
        <Link to="/" style={{
          padding: "12px 24px",
          background: "#2e7d32",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px"
        }}>
          Back to Home
        </Link>
      </div>
  
    </>
  );

  return (
    <>
      <Navbar />
      <div style={{ 
        minHeight: "calc(100vh - 160px)", 
        background: "#f8f9fa", 
        padding: "40px 20px" 
      }}>
        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto" 
        }}>
          {/* Back Button */}
          <Link to="/" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            color: "#2e7d32",
            textDecoration: "none",
            marginBottom: "30px",
            padding: "10px 20px",
            background: "#e8f5e9",
            borderRadius: "8px"
          }}>
            <FaArrowLeft /> Back to Home
          </Link>

          {/* Place Name */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
       <h1 style={{ 
  color: "#2e7d32",  // ⬅️ CHANGED TO GREEN
  fontSize: "2.8rem", 
  margin: "10px 0",
  fontWeight: "700" 
}}>
  {place.name}
</h1>
          </div>

          {/* Main Content */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr", 
            gap: "40px",
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}>
            {/* Image */}
            {place.image && (
              <div style={{ 
                borderRadius: "12px", 
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }}>
                <img 
                  src={`http://localhost:5000${place.image}`} 
                  alt={place.name}
                  style={{ 
                    width: "100%", 
                    height: "400px", 
                    objectFit: "cover",
                    display: "block" 
                  }}
                />
              </div>
            )}

            {/* Details */}
            <div>
              {/* Description */}
              {place.description && (
                <div style={{ marginBottom: "30px" }}>
                  <h3 style={{ 
                    color: "#2e7d32", 
                    fontSize: "1.4rem", 
                    marginBottom: "15px"
                  }}>
                    About this place
                  </h3>
                  <p style={{ 
                    color: "#555", 
                    lineHeight: "1.7", 
                    fontSize: "1.1rem",
                    textAlign: "justify"
                  }}>
                    {place.description}
                  </p>
                </div>
              )}

              {/* Address */}
              {place.address && (
                <div>
                  <h3 style={{ 
                    color: "#2e7d32", 
                    fontSize: "1.4rem", 
                    marginBottom: "15px"
                  }}>
                    Location
                  </h3>
                  <p style={{ 
                    color: "#666", 
                    fontSize: "1.1rem",
                    padding: "15px",
                    background: "#f8f9fa",
                    borderRadius: "8px"
                  }}>
                    {place.address}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
   
    </>
  );
};

export default PlaceDetails;