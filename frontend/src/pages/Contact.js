import React, { useState } from "react";
import "../styles/contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/contacts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      alert(data.message);

      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    }
  };

  return (
<div className="contact-page">
  <h1>Contact Us</h1>
  <p>Have questions, suggestions, or feedback? Send us a message using the form below.</p>
  <form className="contact-form" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Your Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <input
      type="email"
      placeholder="Your Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <textarea
      placeholder="Your Message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button type="submit">Send Message</button>
  </form>
</div>

  );
};

export default Contact;
