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
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-sky-100 to-blue-50 flex justify-center items-center px-4">

      <div className="w-full max-w-md p-10 rounded-2xl bg-white/75 backdrop-blur-xl shadow-2xl">

        <h2 className="text-2xl font-semibold text-center text-slate-900 mb-6">
          Register 
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm text-center p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="mb-4">
            <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-200 transition"/>
          </div>

          {/* Email */}
          <div className="mb-4">
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-200 transition"/>
          </div>

          {/* Password */}
          <div className="mb-4">
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-200 transition"/>
          </div>

          {/* Contact Number */}
          <div className="mb-4">
            <input type="text" name="contactNumber" placeholder="Contact Number" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-200 transition"/>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-sky-400 to-blue-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 disabled:opacity-70">
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login Redirect */}
          <div className="mt-4 text-center text-sm">
            <p>
              Already have an account?{" "}
              <span
                className="text-sky-500 cursor-pointer hover:underline"
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