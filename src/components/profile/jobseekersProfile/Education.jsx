import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getMyEducation, getEducationByUserId } from "../../../api/EducationApi";
import EducationForm from "./EducationForm";

function Education({ userId, editable }) {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null | "new" | edu.id

  // ================= LOAD EDUCATION =================
  useEffect(() => {
    fetchEducation();
  }, [userId]);

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const data = userId
        ? await getEducationByUserId(userId)
        : await getMyEducation();
      setEducationList(data || []);
    } catch (err) {
      console.error("Error fetching education", err);
    } finally {
      setLoading(false);
    }
  };

  const eduToEdit = editingId === "new" ? null : educationList.find(e => e.id === editingId);

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

  if (loading) return <p className="p-3 text-gray-500">Loading education...</p>;

  return (
    <div className="bg-gray-100 shadow-sm rounded-lg p-4 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Education</h2>
        {editable && (
          <button
            onClick={() => setEditingId("new")}
            className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            + Add
          </button>
        )}
      </div>

      {/* No education */}
      {educationList.length === 0 && (
        <p className="text-gray-500">No education added.</p>
      )}

      {/* List */}
      <div className="space-y-3">
        {educationList.map((edu) => (
          <div
            key={edu.id}
            className="flex justify-between items-start p-4 bg-white rounded-md hover:shadow transition"
          >
            <div className="flex-1 space-y-1">
              {/* Heading + edit button same line */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 text-base">
                  {edu.degree} {edu.fieldOfStudy && `- ${edu.fieldOfStudy}`}
                </h3>
                {editable && (
                  <button
                    onClick={() => setEditingId(edu.id)}
                    className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                  >
                    <Pencil size={18} />
                  </button>
                )}
              </div>

              {edu.institutionName && <p className="text-indigo-600">{edu.institutionName}</p>}
              {(edu.startDate || edu.endDate) && (
                <p className="text-gray-600">
                  {edu.startDate} - {edu.endDate || "Present"}
                </p>
              )}
              {edu.grade && <p className="text-gray-600">Grade: {edu.grade}</p>}
              {edu.percentage && <p className="text-gray-600">Percentage: {edu.percentage}</p>}
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