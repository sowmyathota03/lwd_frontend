// src/components/admin/AdminPlans.jsx
import { useEffect, useState } from "react";
import {
  createPlan,
  updatePlan,
  getAllPlans,
  togglePlan,
} from "../../api/PricingApi";
import AdminPlansForm from "./AdminPlansForm";
import { useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  type: "JOB_SEEKER",
  price: "",
  durationDays: "",
};

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const data = await getAllPlans();
      setPlans(data);
    } catch (error) {
      console.error("Failed to fetch plans", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (editingId) {
        await updatePlan(editingId, formData);
      } else {
        await createPlan(formData);
      }
      setForm(initialForm);
      setEditingId(null);
      setIsModalOpen(false);
      await fetchPlans();
    } catch (error) {
      console.error("Failed to save plan", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setForm(plan);
    setEditingId(plan.id);
    setIsModalOpen(true);
  };

  const handleToggle = async (id, active) => {
    setLoading(true);
    try {
      await togglePlan(id, !active);
      await fetchPlans();
    } catch (error) {
      console.error("Failed to toggle plan", error);
    } finally {
      setLoading(false);
    }
  };

  const openNewPlanModal = () => {
    setForm(initialForm);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm(initialForm);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header with New Plan button */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Plan Management
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Create and manage subscription plans for candidates and
              recruiters.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 mt-4 sm:mt-0">
            <button
              onClick={() => navigate(`/admin/plans/features`)}
              className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-sm dark:focus:ring-offset-gray-900"
            >
              Manage Features →
            </button>

            <button
              onClick={openNewPlanModal}
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm dark:focus:ring-offset-gray-900"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              New Plan
            </button>
          </div>
        </div>

        {/* Plans Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-900/50 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Existing Plans
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Features
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {loading && plans.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      Loading plans...
                    </td>
                  </tr>
                ) : plans.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No plans found. Create one above.
                    </td>
                  </tr>
                ) : (
                  plans.map((plan) => (
                    <tr
                      key={plan.id}
                      className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-700/50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {plan.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {plan.type === "JOB_SEEKER"
                          ? "Job Seeker"
                          : "Recruiter"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        ₹{Number(plan.price).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {plan.durationDays} days
                      </td>
                      <td className="px-6 py-4 text-sm text-center">
                        <button
                          onClick={() =>
                            navigate(`/admin/plans/${plan.id}/features`)
                          }
                          className="text-blue-600 font-medium hover:underline dark:text-blue-400"
                        >
                          Manage Features →
                        </button>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            plan.active
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          }`}
                        >
                          {plan.active ? "Active" : "Disabled"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(plan)}
                          className="text-blue-600 hover:text-blue-900 mr-3 transition-colors dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggle(plan.id, plan.active)}
                          className={`${
                            plan.active
                              ? "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              : "text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          } transition-colors`}
                        >
                          {plan.active ? "Disable" : "Enable"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <AdminPlansForm
        isOpen={isModalOpen}
        formData={form}
        onChange={(updatedForm) => setForm(updatedForm)}
        onSubmit={handleSubmit}
        onCancel={closeModal}
        loading={loading}
        editingId={editingId}
      />
    </div>
  );
}