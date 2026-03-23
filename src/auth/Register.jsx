import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerJobSeeker } from "../api/AuthApi";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await registerJobSeeker(formData);
      console.log("Job Seeker Registered:", response);
      alert("Job Seeker Registration Successful!");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lwd-page flex justify-center items-center px-4">

      <div className="lwd-card w-full max-w-md p-10">

        {/* Title */}
        <h2 className="lwd-title text-center text-2xl mb-6">
          Register
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm text-center p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="lwd-input"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="lwd-input"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="lwd-input"
            />
          </div>

          {/* Contact Number */}
          <div className="mb-4">
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              required
              onChange={handleChange}
              className="lwd-input"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full lwd-btn-primary disabled:opacity-70"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login Redirect */}
          <div className="mt-4 text-center text-sm">
            <p className="lwd-text">
              Already have an account?{" "}
              <span
                className="lwd-link"
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Register;