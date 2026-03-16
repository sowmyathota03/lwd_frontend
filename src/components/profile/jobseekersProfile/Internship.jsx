import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getMyInternships, getInternshipsByUserId } from "../../../api/InternshipApi";
import InternshipForm from "./InternshipForm";

/**
 * Internship component – displays a list of internships.
 * Supports viewing own or other user's internships, with add/edit for own profile.
 *
 * @param {Object} props
 * @param {string|number} [props.userId] - ID of the user whose internships are being viewed
 * @param {boolean} props.editable - Whether the current user can edit (if own profile)
 */
function Internship({ userId, editable }) {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // null | "new" | internship.id

  // Determine if the current user can add/edit (own profile and editable)
  const canEdit = editable && !userId;

  // Fetch internships data
  useEffect(() => {
    const fetchInternships = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = userId
          ? await getInternshipsByUserId(userId)
          : await getMyInternships();
        setInternships(data || []);
      } catch (err) {
        console.error("Error fetching internships", err);
        setError("Failed to load internships.");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [userId]);

  // Get internship data for editing
  const internshipToEdit =
    editingId === "new"
      ? null
      : internships.find((i) => i.id === editingId);

  // Handle save from form (optimistic update)
  const handleSave = (savedInternship) => {
    if (editingId === "new") {
      setInternships([savedInternship, ...internships]);
    } else {
      setInternships(
        internships.map((i) =>
          i.id === savedInternship.id ? savedInternship : i
        )
      );
    }
    setEditingId(null);
  };

  // Loading state with skeleton
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Internships</h2>
          {canEdit && <div className="h-9 w-20 bg-gray-200 rounded animate-pulse" />}
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-2 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Internships</h2>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
      {/* Header with add button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Internships</h2>
        {canEdit && (
          <button
            onClick={() => setEditingId("new")}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add
          </button>
        )}
      </div>

      {/* Empty state */}
      {internships.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">
            {canEdit
              ? "No internships added yet. Click 'Add' to get started."
              : "No internships listed."}
          </p>
        </div>
      )}

      {/* Internship list */}
      <div className="space-y-4">
        {internships.map((internship) => (
          <div
            key={internship.id}
            className="group relative bg-gray-50 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            {/* Edit button (visible on hover) */}
            {canEdit && (
              <button
                onClick={() => setEditingId(internship.id)}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Edit internship"
              >
                <Pencil size={18} />
              </button>
            )}

            {/* Content */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800 text-base pr-8">
                {internship.role}
              </h3>

              <div className="text-gray-700 text-sm flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-medium">{internship.companyName}</span>
                {internship.location && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span>{internship.location}</span>
                  </>
                )}
                {internship.employmentType && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{internship.employmentType}</span>
                  </>
                )}
              </div>

              {(internship.startDate || internship.endDate) && (
                <p className="text-gray-600 text-sm">
                  {internship.startDate} — {internship.endDate || "Present"}
                </p>
              )}

              {internship.description && (
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {internship.description}
                </p>
              )}

              {internship.skills && (
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Skills:</span> {internship.skills}
                </p>
              )}

              {internship.stipend && (
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Stipend:</span> ₹{internship.stipend}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {editingId && (
        <InternshipForm
          internship={internshipToEdit}
          onClose={() => setEditingId(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Internship;