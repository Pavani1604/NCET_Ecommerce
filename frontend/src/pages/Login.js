import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { FaTimes } from "react-icons/fa"; // Import close (X) icon
import "../style/Register.css"; // Shared styles

const Login = ({ closeLogin = () => {} }) => {  // Ensure closeLogin is defined
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const { data } = await loginUser(formData);

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.userData));

        if (data.userData.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }

        closeLogin(); // Close modal on successful login
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Invalid credentials or an error occurred.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        {/* Close button inside container */}
        <button className="close-btn" onClick={closeLogin}>
          <FaTimes />
        </button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <span className="register-link" onClick={() => navigate("/register")}>Create here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
