//imports
import React from "react";
import "../styles/about.css";

function About() {
  return (
    <div className="about-page">
      <h1>About GoLocal</h1>

      {/* Main description explaining what GoLocal is and what it offers */}
      <p>
        GoLocal is a city-focused discovery web app built to help users explore Saida’s top locations.
        It highlights food spots, cafés, historical sites, cultural centers, parks, and more. 
        The platform provides a simple way to navigate the city and find quality recommendations quickly.
      </p>

      {/* Background context explaining why the project exists */}
      <p>
        The idea behind GoLocal comes from the common challenge visitors and residents face when trying 
        to find authentic and reliable places. The app gathers recommendations from trusted local sources 
        and online information to deliver accurate and useful guidance.
      </p>

      {/* Future plans for the project */}
      <p>
        Future updates aim to expand GoLocal across additional Lebanese cities and integrate new features 
        such as interactive maps, filtering options, and real-time updates.
      </p>
    </div>
  );
}

export default About;
