import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";


// Temporary placeholder pages for testing
function Home() {
  return <h1 style={{ marginTop: "100px", textAlign: "center" }}>Home Page</h1>;
}
function About() {
  return <h1 style={{ marginTop: "100px", textAlign: "center" }}>About Page</h1>;
}
function Categories() {
  return <h1 style={{ marginTop: "100px", textAlign: "center" }}>Categories Page</h1>;
}
function Contact() {
  return <h1 style={{ marginTop: "100px", textAlign: "center" }}>Contact Page</h1>;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;

