import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import {
  getMyExperience,
  getExperienceByUserId,
} from "../../../api/ExperienceApi";
import ExperienceForm from "./ExperienceForm";

/**
 * Experience component – displays a list of work experiences.
 * Supports viewing own or other user's experiences, with add/edit for own profile.
 *
 * @param {Object} props
 * @param {string|number} [props.userId] - ID of the user whose experiences are being viewed
 * @param {boolean} props.editable - Whether the current user can edit (if own profile)
 */
function Experience({ userId, editable }) {
  const [editingId, setEditingId] = useState(null); // null | "new" | exp.id

  // Fetch experiences
  const {
    data: experiences = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["experience", userId],
    queryFn: () => (userId ? getExperienceByUserId(userId) : getMyExperience()),
  });

  // Determine if the current user can add/edit
  const canEdit = editable && !userId; // editable and viewing own profile (no userId)

  // Get experience data for editing (null for new)
  const experienceToEdit =
    editingId === "new"
      ? null
      : experiences.find((exp) => exp.id === editingId);

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
          {canEdit && (
            <div className="h-9 w-20 bg-gray-200 rounded animate-pulse" />
          )}
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg p-4 space-y-2 animate-pulse"
            >
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
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Experience</h2>
        <p className="text-sm text-red-600">Failed to load experiences.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
      {/* Header with add button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
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
      {experiences.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">
            {canEdit
              ? "No experience added yet. Click 'Add' to get started."
              : "No experience listed."}
          </p>
        </div>
      )}

      {/* Experience list */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="group relative bg-gray-50 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            {/* Edit button (visible on hover) */}
            {canEdit && (
              <button
                onClick={() => setEditingId(exp.id)}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Edit experience"
              >
                <Pencil size={18} />
              </button>
            )}

            {/* Content */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800 text-base pr-8">
                {exp.jobTitle}
              </h3>

              <div className="text-gray-700 text-sm flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-medium">{exp.companyName}</span>
                {exp.location && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span>{exp.location}</span>
                  </>
                )}
                {exp.employmentType && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{exp.employmentType}</span>
                  </>
                )}
              </div>

              {(exp.startDate || exp.endDate || exp.currentlyWorking) && (
                <p className="text-gray-600 text-sm">
                  {exp.startDate} —{" "}
                  {exp.currentlyWorking ? "Present" : exp.endDate}
                </p>
              )}

              {exp.jobDescription && (
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {exp.jobDescription}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {editingId && (
        <ExperienceForm
          experience={experienceToEdit}
          onClose={() => setEditingId(null)}
          refetch={refetch}
        />
      )}
    </div>
  );
}

export default Experience;