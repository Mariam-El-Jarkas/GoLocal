import React from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import IntroSection from "../components/IntroSection.js";
import CategoryCard from "../components/CategoryCard.js";
import PlaceCard from "../components/PlaceCard.js";
import { categories, places } from "../components/placesData.js";

function TestPage() {
  return (
    <>
      <Navbar />
      <IntroSection />

      <section style={{ padding: "2rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ color: "#0a3d62", marginBottom: "1rem" }}>Sample Categories</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          {categories.map((cat, idx) => (
            <CategoryCard key={idx} title={cat.title} image={cat.image} />
          ))}
        </div>
      </section>

      <section style={{ padding: "2rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ color: "#0a3d62", marginBottom: "1rem" }}>Sample Places</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          {places.map((place, idx) => (
            <PlaceCard
              key={idx}
              name={place.name}
              image={place.image}
              description={place.description}
            />
          ))}
        </div>
      </section>

      {/* <section style={{ padding: "2rem", textAlign: "center" }}>
        <Button text="Click Me" />
      </section> */}

      <Footer />
    </>
  );
}

export default TestPage;
