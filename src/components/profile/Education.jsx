import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getMyEducation, getEducationByUserId } from "../../api/EducationApi";
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

  if (loading) return <p className="p-6 text-gray-500">Loading education...</p>;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Education</h2>
        {editable && (
          <button
            onClick={() => setEditingId("new")}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            + Add
          </button>
        )}
      </div>

      {/* List */}
      {educationList.length === 0 && (
        <p className="text-gray-500 text-sm">No education added.</p>
      )}

      <div className="space-y-3 hover:shadow transition">
        {educationList.map((edu) => (
          <div
            key={edu.id}
            className="p-4 rounded-lg flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold text-gray-800">
                {edu.degree} {edu.fieldOfStudy && `- ${edu.fieldOfStudy}`}
              </h3>
              <p className="text-indigo-600 text-sm">{edu.institutionName}</p>
              <p className="text-gray-500 text-sm">
                {edu.startDate} - {edu.endDate || "Present"}
              </p>
              {edu.grade && <p className="text-gray-500 text-sm">Grade: {edu.grade}</p>}
              {edu.percentage && <p className="text-gray-500 text-sm">Percentage: {edu.percentage}</p>}
            </div>

            {editable && (
              <button
                onClick={() => setEditingId(edu.id)}
                className="p-1.5 rounded-lg text-gray-600 hover:bg-blue-50 transition"
              >
                <Pencil size={16} />
              </button>
            )}
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
