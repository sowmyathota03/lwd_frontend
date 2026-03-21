// src/components/admin/AdminPlanFeatures.jsx

import { useEffect, useState } from "react";
import { getPlanFeatures, upsertFeaturesBulk } from "../../api/pricingApi";

const LIMIT_TYPES = ["TOTAL", "DAILY", "MONTHLY"];

// 🔹 Format feature code → UI label
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

  // ===============================
  // FETCH FEATURES
  // ===============================
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

  // ===============================
  // UPDATE STATE
  // ===============================
  const updateFeature = (index, updates) => {
    setFeatures((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...updates };
      return copy;
    });

    setStatus({ type: null, message: "" });
  };

  // ===============================
  // SAVE
  // ===============================
  const handleSave = async () => {
    if (!planId) return;

    setSaving(true);
    setStatus({ type: null, message: "" });

    try {
      await upsertFeaturesBulk(planId, { features });

      setStatus({
        type: "success",
        message: "Features updated successfully",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Failed to update features",
      });
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // EMPTY STATE
  // ===============================
  if (!planId) {
    return (
      <div className="mt-6 p-6 text-center bg-white border border-gray-200 rounded-xl shadow-sm text-gray-500">
        Select a plan to manage features
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Feature Management
          </h2>
          <p className="text-sm text-gray-500">
            Enable features and configure limits
          </p>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Loading...</span>
          </div>
        )}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider sticky top-0">
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
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* Feature */}
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {formatFeatureName(feature.featureCode)}
                  </td>

                  {/* Enabled */}
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={!!feature.enabled}
                      onChange={(e) =>
                        updateFeature(index, {
                          enabled: e.target.checked,
                          limitValue: e.target.checked
                            ? feature.limitValue
                            : null,
                        })
                      }
                      className="w-4 h-4 accent-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                    />
                  </td>

                  {/* Limit */}
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="0"
                      value={feature.limitValue ?? ""}
                      disabled={disabled}
                      onChange={(e) =>
                        updateFeature(index, {
                          limitValue: e.target.value
                            ? Number(e.target.value)
                            : null,
                        })
                      }
                      className={`w-28 px-3 py-1.5 border rounded-md text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        ${
                          disabled
                            ? "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200"
                            : "bg-white border-gray-300 hover:border-gray-400"
                        }`}
                      placeholder="No limit"
                    />
                  </td>

                  {/* Limit Type */}
                  <td className="px-6 py-4">
                    <select
                      value={feature.limitType || "TOTAL"}
                      disabled={disabled}
                      onChange={(e) =>
                        updateFeature(index, {
                          limitType: e.target.value,
                        })
                      }
                      className={`px-3 py-1.5 border rounded-md text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        ${
                          disabled
                            ? "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200"
                            : "bg-white border-gray-300 hover:border-gray-400"
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
                <td colSpan="4" className="py-8 text-center text-gray-400">
                  No features found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* STATUS */}
      {status.message && (
        <div
          className={`px-6 py-3 text-sm border-t transition-colors duration-150
            ${
              status.type === "error"
                ? "bg-red-50 text-red-600 border-red-100"
                : "bg-green-50 text-green-600 border-green-100"
            }`}
        >
          {status.message}
        </div>
      )}

      {/* FOOTER */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Saving...</span>
            </div>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
}