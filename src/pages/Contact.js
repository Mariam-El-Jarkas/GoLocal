// imports
import React, { useState } from "react";
import "../styles/contact.css";

function Contact() {
  // Separate state variables for each input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // we defines a function named handleSubmit using an arrow function.
  // It takes one parameter e, which is the event object automatically
  //  passed when the form is submitted.

  // Handle submit when form is submitted
  const handleSubmit = (e) => {

    // Temporary alert (replace later with API/email integration)
    alert("Message submitted! (Functionality to be implemented later)");

    // Clear form after submitting
    handleReset();
  };

  // Reset form fields to empty
  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
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
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email input */}
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Message text box */}
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        {/* Submit button */}
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
