import { useEffect, useState } from "react";
import { getPlanFeatures, upsertFeaturesBulk } from "../../api/pricingApi";

const LIMIT_TYPES = ["TOTAL", "DAILY", "MONTHLY"];

// Format feature code → UI label
const formatFeatureName = (code) =>
  code
    ?.toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export default function AdminPlanFeatures({ planId }) {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  // Fetch features
  const fetchFeatures = async () => {
    if (!planId) return;
    setLoading(true);
    setStatus({ type: null, message: "" });
    try {
      const data = await getPlanFeatures(planId);
      setFeatures(data || []);
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Failed to load features" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, [planId]);

  // Update state
  const updateFeature = (index, updates) => {
    setFeatures((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...updates };
      return copy;
    });
    setStatus({ type: null, message: "" });
  };

  // Save changes
  const handleSave = async () => {
    if (!planId) return;
    setSaving(true);
    setStatus({ type: null, message: "" });
    try {
      await upsertFeaturesBulk(planId, { features });
      setStatus({ type: "success", message: "Features updated successfully" });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Failed to update features" });
    } finally {
      setSaving(false);
    }
  };

  // Empty state
  if (!planId) {
    return (
      <div className="lwd-card mt-6 p-6 text-center lwd-text">
        Select a plan to manage features
      </div>
    );
  }

  return (
    <div className="lwd-card mt-6 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div>
          <h2 className="lwd-title">Feature Management</h2>
          <p className="lwd-text">Enable features and configure limits</p>
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Loading...</span>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Feature</th>
              <th className="px-6 py-3 text-center font-medium">Enabled</th>
              <th className="px-6 py-3 text-left font-medium">Limit</th>
              <th className="px-6 py-3 text-left font-medium">Limit Type</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => {
              const disabled = !feature.enabled;
              return (
                <tr
                  key={feature.featureCode}
                  className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                    {formatFeatureName(feature.featureCode)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={!!feature.enabled}
                      onChange={(e) =>
                        updateFeature(index, {
                          enabled: e.target.checked,
                          limitValue: e.target.checked ? feature.limitValue : null,
                        })
                      }
                      className="w-4 h-4 accent-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="0"
                      value={feature.limitValue ?? ""}
                      disabled={disabled}
                      onChange={(e) =>
                        updateFeature(index, {
                          limitValue: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                      className={`lwd-input w-28 text-sm ${
                        disabled ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                      placeholder="No limit"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={feature.limitType || "TOTAL"}
                      disabled={disabled}
                      onChange={(e) => updateFeature(index, { limitType: e.target.value })}
                      className={`lwd-input w-32 text-sm ${
                        disabled ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    >
                      {LIMIT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
            {!loading && features.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center lwd-text">
                  No features found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Status message */}
      {status.message && (
        <div
          className={`px-6 py-3 text-sm border-t ${
            status.type === "error"
              ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
              : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
          }`}
        >
          {status.message}
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="lwd-btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
}