import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getMyEducation, getEducationByUserId } from "../../../api/EducationApi";
import EducationForm from "./EducationForm";

function Education({ userId, editable }) {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const canEdit = editable && !userId;

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

  const eduToEdit =
    editingId === "new"
      ? null
      : educationList.find((e) => e.id === editingId);

  const handleSave = (savedEdu) => {
    if (editingId === "new") {
      setEducationList([savedEdu, ...educationList]);
    } else {
      setEducationList(
        educationList.map((e) =>
          e.id === savedEdu.id ? savedEdu : e
        )
      );
    }
    setEditingId(null);
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="lwd-card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="lwd-title">Education</h2>
          {canEdit && <div className="lwd-skeleton h-9 w-20" />}
        </div>

        {[1, 2].map((i) => (
          <div key={i} className="lwd-skeleton h-20 w-full" />
        ))}
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="lwd-card">
        <h2 className="lwd-title mb-2">Education</h2>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="lwd-card space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="lwd-title">Education</h2>

        {canEdit && (
          <button
            onClick={() => setEditingId("new")}
            className="lwd-btn-primary flex items-center gap-1 text-sm px-3 py-1.5"
          >
            +
            Add
          </button>
        )}
      </div>

      {/* Empty */}
      {educationList.length === 0 && (
        <p className="lwd-text text-center py-6">
          {canEdit
            ? "No education added yet. Click 'Add' to get started."
            : "No education listed."}
        </p>
      )}

      {/* List */}
      <div className="space-y-4">
        {educationList.map((edu) => (
          <div
            key={edu.id}
            className="relative group p-4 rounded-lg bg-gray-50 dark:bg-slate-700 hover:shadow-md transition"
          >
            {canEdit && (
              <button
                onClick={() => setEditingId(edu.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600"
              >
                <Pencil size={18} />
              </button>
            )}

            <div className="space-y-1">
              <h3 className="lwd-title text-base">
                {edu.degree}
                {edu.fieldOfStudy && ` - ${edu.fieldOfStudy}`}
              </h3>

              {edu.institutionName && (
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                  {edu.institutionName}
                </p>
              )}

              {edu.university && (
                <p className="lwd-text">{edu.university}</p>
              )}

              {(edu.startDate || edu.endDate) && (
                <p className="lwd-text">
                  {edu.startDate} — {edu.endDate || "Present"}
                </p>
              )}

              {(edu.grade || edu.percentage) && (
                <p className="lwd-text">
                  {edu.grade && `Grade: ${edu.grade}`}
                  {edu.grade && edu.percentage && " | "}
                  {edu.percentage && `Percentage: ${edu.percentage}%`}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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