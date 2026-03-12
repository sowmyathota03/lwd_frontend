import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  getMyExperience,
  getExperienceByUserId,
} from "../../../api/ExperienceApi";

import ExperienceForm from "./ExperienceForm";
import { Pencil } from "lucide-react";

function Experience({ userId, editable }) {
  const [editingId, setEditingId] = useState(null); // null | "new" | exp.id

  /* ================= FETCH EXPERIENCE LIST ================= */
  const {
    data: experiences = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["experience", userId],
    queryFn: () => (userId ? getExperienceByUserId(userId) : getMyExperience()),
  });

  if (isLoading) {
    return <p className="p-3 text-gray-500">Loading experience...</p>;
  }

  /* ================= GET EXPERIENCE DATA FOR EDIT ================= */
  const experienceToEdit =
    editingId === "new"
      ? null
      : experiences.find((exp) => exp.id === editingId);

  return (
    <div className="bg-gray-100 shadow-sm rounded-lg p-4 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Experience</h2>

        {editable && (
          <button
            className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => setEditingId("new")}
          >
            + Add
          </button>
        )}
      </div>

      {/* No experience */}
      {experiences.length === 0 && (
        <p className="text-gray-500 text-sm">No experience added.</p>
      )}

      {/* Experience List */}
      <div className="space-y-3">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="flex justify-between items-start bg-white rounded-md p-4 hover:shadow transition"
          >
            <div className="flex-1 space-y-1">
              {/* Heading + Edit button same line */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 text-base">{exp.jobTitle}</h3>
                {editable && (
                  <button
                    onClick={() => setEditingId(exp.id)}
                    className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                  >
                    <Pencil size={18} />
                  </button>
                )}
              </div>

              <div className="text-gray-700 text-sm flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>{exp.companyName}</span>
                {exp.location && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span>{exp.location}</span>
                  </>
                )}
              </div>

              {(exp.startDate || exp.endDate) && (
                <p className="text-gray-600 text-sm">
                  {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                </p>
              )}

              {exp.jobDescription && <p className="text-gray-600 text-sm">{exp.jobDescription}</p>}
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