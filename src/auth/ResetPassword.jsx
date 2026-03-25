import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api/PasswordApi";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    token: token || "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    confirmPassword: "",
  });

  useEffect(() => {
    if (token) {
      setFormData((prev) => ({ ...prev, token }));
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "confirmPassword" && fieldErrors.confirmPassword) {
      setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }

    if (error) setError("");
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { confirmPassword: "" };

    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (formData.newPassword.length < 6) {
      errors.confirmPassword = "Password must be at least 6 characters";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await resetPassword({
        token: formData.token,
        newPassword: formData.newPassword,
      });

      setSuccessMessage(
        res || "Password reset successful. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data ||
        "Invalid or expired token. Please request a new password reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lwd-page flex justify-center items-center px-4">

      <div className="lwd-card w-full max-w-md p-8">

        {/* Title */}
        <h2 className="lwd-title text-2xl text-center mb-6">
          Reset Password
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

          {/* New Password */}
          <div className="mb-4">
            <label htmlFor="newPassword" className="lwd-label block mb-2">
              New Password
            </label>

            <input
              id="newPassword"
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              required
              value={formData.newPassword}
              onChange={handleChange}
              className="lwd-input"
              aria-invalid={!!fieldErrors.confirmPassword}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="lwd-label block mb-2">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`lwd-input ${fieldErrors.confirmPassword
                  ? "border-red-500 focus:border-red-500 dark:border-red-500"
                  : ""
                }`}
              aria-invalid={!!fieldErrors.confirmPassword}
              aria-describedby={
                fieldErrors.confirmPassword ? "confirm-error" : undefined
              }
            />

            {fieldErrors.confirmPassword && (
              <p
                id="confirm-error"
                className="mt-1 text-xs text-red-600 dark:text-red-400"
              >
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full lwd-btn-primary disabled:opacity-70"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>
      </div>
    </div>
  );
}