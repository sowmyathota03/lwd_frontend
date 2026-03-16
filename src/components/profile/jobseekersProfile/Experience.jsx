import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import {
  getMyExperience,
  getExperienceByUserId,
} from "../../../api/ExperienceApi";
import ExperienceForm from "./ExperienceForm";

function Experience({ userId, editable }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const canEdit = editable && !userId;

  const fetchExperiences = async () => {
    try {
      setLoading(true);

      const response = userId
        ? await getExperienceByUserId(userId)
        : await getMyExperience();

      setExperiences(response || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [userId]);

  const experienceToEdit =
    editingId === "new"
      ? null
      : experiences.find((exp) => exp.id === editingId);

  // Loading
  if (loading) {
    return (
      <div className="lwd-card p-6 space-y-4">
        <h2 className="text-lg font-semibold">Experience</h2>

        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg p-4 space-y-2 animate-pulse"
            >
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="lwd-card p-6">
        <h2 className="text-lg font-semibold mb-2">Experience</h2>
        <p className="text-red-500 text-sm">Failed to load experiences.</p>
      </div>
    );
  }

  return (
    <div className="lwd-card p-6 space-y-5">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Experience</h2>

        {canEdit && (
          <button
            onClick={() => setEditingId("new")}
            className="lwd-btn-primary flex items-center gap-1"
          >
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
            className="group relative bg-gray-50 dark:bg-slate-800 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            {canEdit && (
              <button
                onClick={() => setEditingId(exp.id)}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition"
              >
                <Pencil size={18} />
              </button>
            )}

            <div className="space-y-2">
              <h3 className="font-semibold text-base pr-8">
                {exp.jobTitle}
              </h3>

              <div className="text-sm flex flex-wrap items-center gap-x-2">
                <span className="font-medium">{exp.companyName}</span>

                {exp.location && (
                  <>
                    <span>•</span>
                    <span>{exp.location}</span>
                  </>
                )}

                {exp.employmentType && (
                  <>
                    <span>•</span>
                    <span>{exp.employmentType}</span>
                  </>
                )}
              </div>

              {(exp.startDate || exp.endDate || exp.currentlyWorking) && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {exp.startDate} —{" "}
                  {exp.currentlyWorking ? "Present" : exp.endDate}
                </p>
              )}

              {exp.jobDescription && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {exp.jobDescription}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      {editingId && (
        <ExperienceForm
          experience={experienceToEdit}
          onClose={() => setEditingId(null)}
          refetch={fetchExperiences}
        />
      )}
    </div>
  );
}

export default Experience;
