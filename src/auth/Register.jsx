import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Registered Successfully (Frontend Only)");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-slate-50 flex items-center justify-center p-5 font-sans">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-10 rounded-2xl bg-white/75 backdrop-blur-lg shadow-xl flex flex-col"
      >
        <h2 className="text-center text-2xl font-semibold text-slate-900 mb-8">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="mb-4 px-4 py-3 rounded-lg border border-blue-200 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="mb-4 px-4 py-3 rounded-lg border border-blue-200 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="mb-4 px-4 py-3 rounded-lg border border-blue-200 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition"
        />

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          onChange={handleChange}
          required
          className="mb-4 px-4 py-3 rounded-lg border border-blue-200 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition"
        />

        <button
          type="submit"
          className="mt-2 py-3 rounded-lg bg-gradient-to-r from-sky-400 to-sky-500 text-white font-semibold text-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-400/40 transition duration-300"
        >
          Register
        </button>

        <div className="mt-6 text-center text-sm text-slate-500">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-sky-500 font-semibold cursor-pointer hover:text-sky-600 underline underline-offset-2"
            >
              Login here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;