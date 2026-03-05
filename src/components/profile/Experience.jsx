import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  getMyExperience,
  getExperienceByUserId,
} from "../../api/ExperienceApi";

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
    return <p>Loading experience...</p>;
  }

  /* ================= GET EXPERIENCE DATA FOR EDIT ================= */
  const experienceToEdit =
    editingId === "new"
      ? null
      : experiences.find((exp) => exp.id === editingId);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Experience</h2>

        {editable && (
          <button
            className="text-white bg-blue-500 px-3 py-1 rounded"
            onClick={() => setEditingId("new")}
          >
            + Add
          </button>
        )}
      </div>

      {/* Experience List */}
      {experiences.length === 0 && (
        <p className="text-gray-500">No experience added.</p>
      )}

      {experiences.map((exp) => (
        <div key={exp.id} className="py-3 flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{exp.jobTitle}</h3>
            <div className="text-sm flex items-center text-gray-600">
              <span>{exp.companyName}</span>

              {exp.location && (
                <>
                  <span className="mx-2 text-gray-400">•</span>
                  <span>{exp.location}</span>
                </>
              )}
            </div>

            <p className="text-sm text-gray-500">
              {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
            </p>
            {exp.jobDescription && (
              <p className="text-sm text-gray-600 mt-1">{exp.jobDescription}</p>
            )}
          </div>

          {/* Edit Button */}
          {editable && (
            <button
              onClick={() => setEditingId(exp.id)}
              className="p-1.5 rounded-lg text-gray-600 hover:bg-blue-50 transition"
            >
              <Pencil size={16} />
            </button>
          )}
        </div>
      ))}

      {/* ================= RENDER MODAL FORM ================= */}
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
