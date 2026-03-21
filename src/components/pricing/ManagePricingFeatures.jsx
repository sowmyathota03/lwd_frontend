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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Manage Plan Features</h1>
          <p className="text-sm text-gray-500">Create, edit, and remove pricing features</p>
        </div>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg text-sm text-green-600">
          {success}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="ml-2 text-gray-500">Loading features...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {features.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatFeatureName(f.featureCode)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 capitalize">{f.planType}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{f.description || "-"}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(f)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(f.id, f.featureCode)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {features.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-sm text-gray-400">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
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