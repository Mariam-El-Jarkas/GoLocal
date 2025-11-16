import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Core components
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

// Pages
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Categories from "./pages/categories.js";
import Contact from "./pages/Contact.js";
import PlaceDetails from "./pages/PlaceDetails.js";

// Category-specific pages
import Food from "./pages/categories/Food.js";
import BoardGames from "./pages/categories/BoardGames.js";
import Culture from "./pages/categories/Culture.js";
import History from "./pages/categories/History.js";
import CoffeeShops from "./pages/categories/CoffeeShops.js";
import Shopping from "./pages/categories/Shopping.js";
import Parks from "./pages/categories/Parks.js";

/*
  App Component

  This is the main entry point of the GoLocal application.
  - Wraps the entire app in React Router for client-side routing.
  - Includes the Navbar at the top and Footer at the bottom of every page.
  - Sets up routes for all pages including home, about, contact, categories, 
    individual category pages, and dynamic place detail pages.
*/

function App() {
  return (
    <Router>
      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Main content rendered according to the route */}
      <main>
        <Routes>
          {/* General pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/contact" element={<Contact />} />

          {/* Category-specific pages */}
          <Route path="/category/food" element={<Food />} />
          <Route path="/category/board-games" element={<BoardGames />} />
          <Route path="/category/culture" element={<Culture />} />
          <Route path="/category/history" element={<History />} />
          <Route path="/category/coffee-shops" element={<CoffeeShops />} />
          <Route path="/category/shopping" element={<Shopping />} />
          <Route path="/category/parks" element={<Parks />} />

          {/* Dynamic route for individual place details */}
          <Route path="/place/:id" element={<PlaceDetails />} />
        </Routes>
      </main>

      {/* Footer visible on all pages */}
      <Footer />
    </Router>
  );
}

export default App;
