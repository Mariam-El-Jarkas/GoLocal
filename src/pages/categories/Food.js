//impports
import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/food.css";

function Food() {

  // Filter the data to include only places in the "Food" category
  const foodPlaces = placesData.filter(place => place.category === "Food");

  const subCategories = {}; //empty object 


  foodPlaces.forEach(place => {
    const sub = place.subCategory || "General"; // Default group if no subcategory is defined
    if (!subCategories[sub]) {
      subCategories[sub] = [];
    }
    subCategories[sub].push(place);
  });

  return (
    <div className="food-page">
      <h1>Food Categories</h1>

      {/* Display all the food subcategories and their top places */}
      <div className="food-grid">
        {/* Object.keys() returns an array of all the keys in the object. */}
        {Object.keys(subCategories).map((sub, index) => (
          
          // Section representing a single food subcategory
          <div className="food-card" key={index}>
            <h2>{sub}</h2>

            {/* Show up to two places from each subcategory */}
            <div className="store-list">
              {subCategories[sub].slice(0, 2).map(store => (

                // Each store links to its detailed page
                <Link 
                  to={`/place/${store.id}`} 
                  key={store.id} 
                  className="store-card"
                >
                  <img src={store.image} alt={store.name} />

                  {/* Store name and address */}
                  <div className="store-info">
                    <h4>{store.name}</h4>
                    <p>{store.address}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}

export default Food;

