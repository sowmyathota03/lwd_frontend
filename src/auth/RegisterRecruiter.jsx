import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRecruiter } from "../api/AuthApi";

function RegisterRecruiter() {
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
      const response = await registerRecruiter(formData);
      console.log("Recruiter Registered:", response);

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
    <div className="min-h-[80vh] bg-linear-to-br lwd-page flex justify-center items-center px-4">
      <div className="w-full max-w-md p-10 rounded-2xl lwd-card backdrop-blur-xl shadow-2xl">
        <h2 className="text-2xl font-semibold text-center lwd-title lwd-text mb-6">
          Register as Recruiter
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm text-center p-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-600 text-sm text-center p-2 rounded-lg mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="w-full px-2 py-2 rounded-lg text-sm border border-slate-300 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-200 transition"
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full px-2 py-2 rounded-lg text-sm border border-slate-300 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-200 transition"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full px-2 py-2 rounded-lg text-sm border border-slate-300 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-200 transition"
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              required
              onChange={handleChange}
              className="w-full px-2 py-2 rounded-lg text-sm border border-slate-300 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-200 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading || successMessage}
            className="w-full py-2 rounded-lg text-sm text-white bg-linear-to-r from-sky-400 to-blue-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 disabled:opacity-70"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="mt-5 text-center text-sm">
            <p className="text-slate-600">Already have an account?</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-2 text-sky-500 hover:underline font-medium"
            >
              Login Here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterRecruiter;