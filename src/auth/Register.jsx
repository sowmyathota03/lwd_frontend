import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerJobSeeker } from "../api/AuthApi";

function RegisterJobSeeker() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    setSuccessMessage("");

    try {
      const response = await registerJobSeeker(formData);
      console.log("Job Seeker Registered:", response);

      setSuccessMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setError(error.response?.data || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lwd-page flex justify-center items-center px-4">

      <div className="lwd-card w-full max-w-md p-8 backdrop-blur-xl">

        {/* Title */}
        <h2 className="lwd-title text-2xl text-center mb-6">
          Register as Job Seeker
        </h2>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-center p-3 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Success */}
        {successMessage && (
          <div className="mb-4 text-sm text-center p-3 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Name */}
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

          {/* Contact */}
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
            disabled={loading || successMessage}
            className="w-full lwd-btn-primary disabled:opacity-70"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login Link */}
          <div className="mt-4 text-center text-sm lwd-text">
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
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

export default RegisterJobSeeker;