
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin-login.css";
import Navbar from "../components/Navbar";
import { API_URL } from '../config/apiConfig';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields required!");
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store a simple token in localStorage
        localStorage.setItem("adminToken", "authenticated");
        localStorage.setItem("adminEmail", email);
        
        alert("✅ Login successful!");
        navigate("/admin/dashboard");
      } else {
        alert(`❌ ${data.message || "Invalid credentials"}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error connecting to server. Make sure backend is running on port 5000.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-page">
        <form onSubmit={handleSubmit} className="admin-login-form">
          <h2>Admin Login</h2>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
