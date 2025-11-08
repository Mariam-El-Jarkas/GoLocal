import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Categories from "./pages/categories.js";
import Contact from "./pages/Contact.js";
import PlaceDetails from "./pages/PlaceDetails.js";


function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
