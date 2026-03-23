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

  // Update token in formData if it changes (e.g., URL updates)
  useEffect(() => {
    if (token) {
      setFormData((prev) => ({ ...prev, token }));
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error when user starts typing
    if (name === "confirmPassword" && fieldErrors.confirmPassword) {
      setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
    // Clear general error when any field changes
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
      setSuccessMessage(res || "Password reset successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data || "Invalid or expired token. Please request a new password reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-linear-to-br from-sky-100 to-blue-50 flex justify-center items-center px-4">
      <div className="w-full max-w-md p-10 rounded-2xl bg-white/75 backdrop-blur-xl shadow-2xl">
        <h2 className="text-2xl font-semibold text-center text-slate-900 mb-6">
          Reset Password
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
            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-slate-700">
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
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-200 transition"
              aria-invalid={!!fieldErrors.confirmPassword}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-slate-700">
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
              className={`w-full px-4 py-3 rounded-lg border transition ${
                fieldErrors.confirmPassword
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-slate-300 focus:border-sky-400 focus:ring-sky-200"
              } focus:outline-none focus:ring-4`}
              aria-invalid={!!fieldErrors.confirmPassword}
              aria-describedby={fieldErrors.confirmPassword ? "confirm-error" : undefined}
            />
            {fieldErrors.confirmPassword && (
              <p id="confirm-error" className="mt-1 text-xs text-red-600">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white bg-linear-to-r from-sky-400 to-blue-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}