// ./src/components/admin/FeatureForm.jsx
import { useState, useEffect } from "react";
import { createFeature, updateFeature } from "../../api/PricingFeatureApi";

export default function FeatureForm({ feature, planId, onSuccess, onCancel }) {
  /**
   * feature: optional object { id, code, planType, description }
   * planId: required for bulk association
   * onSuccess: callback after create/update
   * onCancel: callback to close modal
   */

  const [code, setCode] = useState(feature?.featureCode || "");
  const [planType, setPlanType] = useState(feature?.planType || "");
  const [description, setDescription] = useState(feature?.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (feature) {
      setCode(feature.featureCode || "");
      setPlanType(feature.planType || "");
      setDescription(feature.description || "");
    }
  }, [feature]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!code || !planType) {
      setError("Feature code and plan type are required.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        code: code.toUpperCase().replace(/\s+/g, "_"),
        planType,
        description,
      };

      if (feature?.id) {
        // Update existing feature
        await updateFeature(feature.id, payload);
      } else {
        // Create new feature
        await createFeature(payload);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lwd-card w-full max-w-md mx-auto">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="lwd-title text-lg font-semibold">
          {feature ? "Update Feature" : "Create Feature"}
        </h3>
        <p className="lwd-text mt-1">
          {feature ? "Edit feature details" : "Add a new pricing feature"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="lwd-label mb-1 block">Feature Code *</label>
          <input
            type="text"
            placeholder="e.g., APPLY_JOB"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="lwd-input"
            disabled={loading}
          />
          <p className="lwd-text text-xs mt-1">
            Will be automatically formatted as UPPERCASE with underscores
          </p>
        </div>

        <div>
          <label className="lwd-label mb-1 block">Plan Type *</label>
          <select
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
            className="lwd-input"
            disabled={loading}
          >
            <option value="">Select Plan Type</option>
            <option value="JOB_SEEKER">JOB_SEEKER</option>
            <option value="RECRUITER">RECRUITER</option>
          </select>
        </div>

        <div>
          <label className="lwd-label mb-1 block">Description (optional)</label>
          <input
            type="text"
            placeholder="What does this feature do?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="lwd-input"
            disabled={loading}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="lwd-btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </>
            ) : feature ? (
              "Update Feature"
            ) : (
              "Create Feature"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}