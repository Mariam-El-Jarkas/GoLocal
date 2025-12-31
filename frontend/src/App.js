import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Core components
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

// Admin components
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// Pages
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Categories from "./pages/categories.js";
import Contact from "./pages/Contact.js";
import PlaceDetails from "./pages/PlaceDetails.js";

// NEW: Dynamic Category Page (REPLACES all hardcoded pages)
import CategoryPage from "./pages/CategoryPage.js";

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

          {/* DYNAMIC Category Page - ONE route for ALL categories */}
          <Route path="/category/:id" element={<CategoryPage />} />

          {/* Dynamic route for individual place details */}
          <Route path="/place/:id" element={<PlaceDetails />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />


          <Route path="/place/:id" element={<PlaceDetails />} />
        </Routes>
      </main>

      {/* Footer visible on all pages */}
      <Footer />
    </Router>
  );
}

export default App;