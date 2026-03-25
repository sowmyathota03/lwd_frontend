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
      setSuccessMessage(
        res || "Password reset email sent successfully. Check your inbox."
      );
      setEmail("");
      setEmailError("");
    } catch (err) {
      setError(
        err.response?.data ||
        "Failed to send reset email. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lwd-page flex justify-center items-center px-4">

      <div className="lwd-card w-full max-w-md p-8 backdrop-blur-xl">

        {/* Title */}
        <h2 className="lwd-title text-2xl text-center mb-6">
          Forgot Password
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

        <form onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="lwd-label block mb-2">
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
              className={`lwd-input ${emailError
                  ? "border-red-500 focus:border-red-500 dark:border-red-500"
                  : ""
                }`}
            />

            {emailError && (
              <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                {emailError}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading || !!emailError}
            className="w-full lwd-btn-primary disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {/* Back */}
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Back to Login
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}