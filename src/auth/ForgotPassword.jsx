import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/PasswordApi";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Clear errors when user starts typing
    if (error) setError("");
    if (emailError) setEmailError(validateEmail(value));
  };

  const handleBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await forgotPassword(email);
      setSuccessMessage(res || "Password reset email sent successfully. Check your inbox.");
      setEmail(""); // Clear email field after success
      setEmailError(""); // Clear any email errors
    } catch (err) {
      setError(err.response?.data || "Failed to send reset email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-linear-to-br from-sky-100 to-blue-50 flex justify-center items-center px-4">
      <div className="w-full max-w-md p-10 rounded-2xl bg-white/75 backdrop-blur-xl shadow-2xl">
        <h2 className="text-2xl font-semibold text-center text-slate-900 mb-6">
          Forgot Password
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm text-center p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-600 text-sm text-center p-3 rounded-lg mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleBlur}
              required
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "email-error" : undefined}
              className={`w-full px-4 py-3 rounded-lg border transition ${
                emailError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-slate-300 focus:border-sky-400 focus:ring-sky-200"
              } focus:outline-none focus:ring-4`}
            />
            {emailError && (
              <p id="email-error" className="mt-1 text-xs text-red-600">
                {emailError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !!emailError}
            className="w-full py-3 rounded-lg font-semibold text-white bg-linear-to-r from-sky-400 to-blue-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sky-500 hover:underline focus:outline-none"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}