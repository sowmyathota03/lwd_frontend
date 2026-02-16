import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRecruiter } from "../api/AuthApi";
import "./Register.css"

function RegisterRecruiter() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerRecruiter(formData);
      console.log("Recruiter Registered:", response);
      alert("Recruiter Registration Successful!");
       // Redirect to login page
      navigate("/login");
    } catch (error) {
      alert(error.response?.data || "Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register as Recruiter</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
        <div className="login-redirect">
          <p>Already have an account?</p>
          <button
            type="button"
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login Here
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterRecruiter;
