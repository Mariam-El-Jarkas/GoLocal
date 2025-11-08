import React from "react";
import "../styles/about.css";

function About() {
  return (
    <div className="about-page">
      <h1>About GoLocal</h1>
      <p>
        GoLocal is a city-focused discovery web app designed to help locals and visitors explore Saida's top gems.
        From the best food and cafes to historical and cultural spots, GoLocal makes it easy to navigate the city
        and discover hidden treasures without losing time or money.
      </p>
      <p>
        This project started from personal experience: many visitors and locals from other cities struggle to
        find authentic places. GoLocal provides recommendations sourced from trusted local opinions and online
        sources, ensuring a genuine experience of Saida.
      </p>
      <p>
        In the future, we plan to expand GoLocal to cover all Lebanese cities and add dynamic features like maps
        and real-time updates.
      </p>
    </div>
  );
}

export default About;
