import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { registerUser } from "../services/api";
import { FaTimes } from "react-icons/fa"; // Import X icon
import "../style/Register.css"; // Combined Login & Register styles

const Register = ({ closeRegister = () => {} }) => {  // Ensure closeRegister is defined
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const { data } = await registerUser(formData);
      if (data.success) {
        alert("Registration successful! Redirecting to login.");
        closeRegister(); // Close modal after successful registration
        navigate("/login"); // Navigate to login page
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "An error occurred"));
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        {/* X Button inside the container */}
        <button className="close-btn" onClick={closeRegister}>
          <FaTimes />
        </button>

        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <span className="register-link" onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
