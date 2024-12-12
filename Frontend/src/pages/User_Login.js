import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for admin credentials before making the API call
    if (formData.email === "admin@gmail.com" && formData.password === "admin") {
      window.location.href = "/view-tickets"; 
      return; 
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/customers/signin",
        formData
      );
  
      if (response.status === 200) {
        const { userId, token, isAdmin } = response.data;
  
        localStorage.setItem("authToken", token);
  
        // If the user is an admin, navigate to the 'View Tickets' page
        if (isAdmin) {
          window.location.href = "/view-tickets"; 
        } else {
          window.location.href = `/avilable-tickets`; 
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "Something went wrong!");
      } else {
        setErrorMessage("Network error. Please try again.");
      }
      setSuccessMessage("");
    }
  };
  

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={{textAlign:'center'}}>Sign In</h2>

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            Please Enter Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Please Enter Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton}>
          Login Now
        </button>

        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
        {successMessage && (
          <div style={styles.successMessage}>{successMessage}</div>
        )}
        {/* Register Link */}
      <div style={styles.registerLink}>
        Don't have an account?{" "}
        <a href="/signup" style={styles.registerLinkAnchor}>
          Register
        </a>
      </div>
      </form>
    </div>
  );
};

// CSS-in-JS styling
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "url('https://img.freepik.com/premium-photo/evening-rock-concert-front-large-audience-club_254257-122.jpg?w=826')", 
    backgroundSize: "cover", 
    backgroundPosition: "center", 
    backgroundRepeat: "no-repeat", 
  },
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", 
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  errorMessage: {
    marginTop: "20px",
    textAlign: "center",
    color: "red",
    fontSize: "14px",
  },
  successMessage: {
    marginTop: "20px",
    textAlign: "center",
    color: "green",
    fontSize: "14px",
  },
  registerLink: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#555",
  },
  registerLinkAnchor: {
    color: "#4CAF50",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default SignIn;
