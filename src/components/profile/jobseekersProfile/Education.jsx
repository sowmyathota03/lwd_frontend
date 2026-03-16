import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getMyEducation, getEducationByUserId } from "../../../api/EducationApi";
import EducationForm from "./EducationForm";

/**
 * Education component – displays a list of educational qualifications.
 * Supports viewing own or other user's education, with add/edit for own profile.
 *
 * @param {Object} props
 * @param {string|number} [props.userId] - ID of the user whose education is being viewed
 * @param {boolean} props.editable - Whether the current user can edit (if own profile)
 */
function Education({ userId, editable }) {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // null | "new" | edu.id

  // Determine if the current user can add/edit (own profile and editable)
  const canEdit = editable && !userId;

  // Fetch education data
  useEffect(() => {
    const fetchEducation = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = userId
          ? await getEducationByUserId(userId)
          : await getMyEducation();
        setEducationList(data || []);
      } catch (err) {
        console.error("Error fetching education", err);
        setError("Failed to load education details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, [userId]);

  // Get education data for editing
  const eduToEdit = editingId === "new" ? null : educationList.find(e => e.id === editingId);

  // Handle save from form (optimistic update)
  const handleSave = (savedEdu) => {
    if (editingId === "new") {
      setEducationList([savedEdu, ...educationList]);
    } else {
      setEducationList(
        educationList.map(e => (e.id === savedEdu.id ? savedEdu : e))
      );
    }
    setEditingId(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Education</h2>
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
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Education</h2>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
      {/* Header with add button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Education</h2>
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
      {educationList.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">
            {canEdit
              ? "No education added yet. Click 'Add' to get started."
              : "No education listed."}
          </p>
        </div>
      )}

      {/* Education list */}
      <div className="space-y-4">
        {educationList.map((edu) => (
          <div
            key={edu.id}
            className="group relative bg-gray-50 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            {/* Edit button (visible on hover) */}
            {canEdit && (
              <button
                onClick={() => setEditingId(edu.id)}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Edit education"
              >
                <Pencil size={18} />
              </button>
            )}

            {/* Content */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800 text-base pr-8">
                {edu.degree}
                {edu.fieldOfStudy && ` - ${edu.fieldOfStudy}`}
              </h3>

              {edu.institutionName && (
                <p className="text-blue-600 font-medium text-sm">
                  {edu.institutionName}
                </p>
              )}

              {edu.university && (
                <p className="text-gray-700 text-sm">{edu.university}</p>
              )}

              {(edu.startDate || edu.endDate) && (
                <p className="text-gray-600 text-sm">
                  {edu.startDate} — {edu.endDate || "Present"}
                </p>
              )}

              {(edu.grade || edu.percentage) && (
                <p className="text-gray-600 text-sm">
                  {edu.grade && `Grade: ${edu.grade}`}
                  {edu.grade && edu.percentage && " | "}
                  {edu.percentage && `Percentage: ${edu.percentage}%`}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {editingId && (
        <EducationForm
          education={eduToEdit}
          onClose={() => setEditingId(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Education;