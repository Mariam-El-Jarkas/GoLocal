//imports
import React, { useState } from "react";
import "../styles/contact.css";

function Contact() {
  // State to store the form inputs (name, email, message)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // I use this to update the form values whenever the user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Temporary submit function (just shows an alert for now)
  // Later this can be replaced with API/email integration
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted! (Functionality to be implemented later)");

    // Clear form after submitting
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>
        Have questions, suggestions, or feedback? Send us a message using the form below.
      </p>

      {/* Contact form section */}
      <form className="contact-form" onSubmit={handleSubmit}>

        {/* Name input */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Email input */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Message text box */}
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        {/* Submit button */}
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
