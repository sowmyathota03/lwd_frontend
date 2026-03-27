// ./src/components/admin/ManagePricingFeatures.jsx
import { useEffect, useState } from "react";
import {
  getAllFeatures,
  deleteFeature,
} from "../../api/pricingFeatureApi";
import FeatureForm from "./FeatureForm"; // The create/update form we built earlier

const formatFeatureName = (code) =>
  code
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function ManagePricingFeatures() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null); // feature to edit

  // ===============================
  // FETCH ALL FEATURES
  // ===============================
  const fetchFeatures = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllFeatures();
      setFeatures(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load features.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  // ===============================
  // DELETE FEATURE
  // ===============================
  const handleDelete = async (featureId, code) => {
    if (!confirm(`Are you sure you want to delete "${code}"?`)) return;

    try {
      await deleteFeature(featureId);
      setSuccess(`Feature "${code}" deleted successfully!`);
      fetchFeatures();
    } catch (err) {
      console.error(err);
      setError("Error deleting feature.");
    }
  };

  // ===============================
  // OPEN MODAL FOR EDIT
  // ===============================
  const handleEdit = (feature) => {
    setEditingFeature(feature);
    setModalOpen(true);
  };

  return (
    <div className="lwd-card mt-6 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="lwd-title text-lg font-bold">Manage Plan Features</h1>
          <p className="lwd-text text-sm">Create, edit, and remove pricing features</p>
        </div>
        <button
          className="lwd-btn-primary"
          onClick={() => {
            setEditingFeature(null); // create new
            setModalOpen(true);
          }}
        >
          + Add Feature
        </button>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg text-sm text-green-600 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
          {success}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <svg className="animate-spin h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="ml-2 lwd-text">Loading features...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="lwd-table min-w-full">
            <thead className="lwd-table-header bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="lwd-th px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Feature Code
                </th>
                <th className="lwd-th px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Plan Type
                </th>
                <th className="lwd-th px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Description
                </th>
                <th className="lwd-th px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {features.map((f) => (
                <tr key={f.id} className="lwd-table-row hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                  <td className="lwd-td px-6 py-4 text-sm font-medium">
                    {formatFeatureName(f.featureCode)}
                  </td>
                  <td className="lwd-td px-6 py-4 text-sm capitalize">
                    {f.planType}
                  </td>
                  <td className="lwd-td px-6 py-4 text-sm">
                    {f.description || "-"}
                  </td>
                  <td className="lwd-td px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(f)}
                      className="lwd-btn-primary-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(f.id, f.featureCode)}
                      className="lwd-btn-danger-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {features.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center lwd-text">
                    No features found. Click "Add Feature" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Feature Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm dark:bg-black/70">
          <div className="relative">
            <FeatureForm
              feature={editingFeature}
              onSuccess={() => {
                setModalOpen(false);
                fetchFeatures();
              }}
              onCancel={() => setModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}