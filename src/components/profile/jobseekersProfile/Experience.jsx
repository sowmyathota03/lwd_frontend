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
      setError(null);

      const response = userId
        ? await getExperienceByUserId(userId)
        : await getMyExperience();

      setExperiences(response || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load experiences.");
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

  const handleSave = (savedExp) => {
    if (editingId === "new") {
      setExperiences([savedExp, ...experiences]);
    } else {
      setExperiences(
        experiences.map((exp) =>
          exp.id === savedExp.id ? savedExp : exp
        )
      );
    }
    setEditingId(null);
  };

  // ======================
  // Loading
  // ======================
  if (loading) {
    return (
      <div className="lwd-card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="lwd-title">Experience</h2>
          {canEdit && <div className="lwd-skeleton h-9 w-20" />}
        </div>

        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="lwd-skeleton p-4 space-y-2">
              <div className="h-4 w-1/3 bg-gray-300 dark:bg-slate-600 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-300 dark:bg-slate-600 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ======================
  // Error
  // ======================
  if (error) {
    return (
      <div className="lwd-card">
        <h2 className="lwd-title mb-2">Experience</h2>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="lwd-card space-y-5">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="lwd-title">Experience</h2>

        {canEdit && (
          <button
            onClick={() => setEditingId("new")}
            className="lwd-btn-primary"
          >
            Add
          </button>
        )}
      </div>

      {/* Empty */}
      {experiences.length === 0 && (
        <div className="text-center py-8">
          <p className="lwd-text">
            {canEdit
              ? "No experience added yet. Click 'Add' to get started."
              : "No experience listed."}
          </p>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="lwd-card lwd-card-hover group relative"
          >
            {/* Edit button */}
            {canEdit && (
              <button
                onClick={() => setEditingId(exp.id)}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition"
              >
                <Pencil size={18} />
              </button>
            )}

            <div className="space-y-2">
              <h3 className="lwd-title pr-8 text-base">
                {exp.jobTitle}
              </h3>

              <div className="lwd-text flex flex-wrap items-center gap-x-2">
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
                <p className="lwd-text">
                  {exp.startDate} —{" "}
                  {exp.currentlyWorking ? "Present" : exp.endDate}
                </p>
              )}

              {exp.jobDescription && (
                <p className="lwd-text">
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
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Experience;