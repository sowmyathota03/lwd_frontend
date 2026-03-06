import { useState, useEffect } from "react";
import {
  getMyEducation,
  getEducationByUserId,
} from "../../api/EducationApi";
import { Section } from "./Helpers";
import EducationForm from "./EducationForm";

const Education = ({ userId, editable }) => {

  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  // ================= LOAD EDUCATION =================

  useEffect(() => {
    fetchEducation();
  }, [userId]);

  const fetchEducation = async () => {
    try {
      const res = userId
        ? await getEducationByUserId(userId)
        : await getMyEducation();

      setEducationList(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= ADD =================

  const handleAdd = () => {
    setSelectedEducation(null);
    setOpenForm(true);
  };

  // ================= EDIT =================

  const handleEdit = (edu) => {
    setSelectedEducation(edu);
    setOpenForm(true);
  };

  if (loading) return <div className="p-6 text-gray-500">Loading...</div>;

  return (
    <Section title="Education" editable={editable} onEdit={handleAdd}>

      {editable && (
        <button
          onClick={handleAdd}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          + Add Education
        </button>
      )}

      <div className="space-y-4">

        {educationList.length === 0 && (
          <p className="text-gray-400 text-sm">
            No education added
          </p>
        )}

        {educationList.map((edu) => (
          <div
            key={edu.id}
            className="bg-gray-50 p-4 rounded-lg hover:shadow"
          >
            <div className="flex justify-between">

              <div>
                <h3 className="font-semibold text-gray-800">
                  {edu.degree} {edu.fieldOfStudy && `- ${edu.fieldOfStudy}`}
                </h3>

                <p className="text-indigo-600 text-sm">
                  {edu.institutionName}
                </p>

                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate || "Present"}
                </p>

                {edu.grade && (
                  <p className="text-sm text-gray-500">
                    Grade: {edu.grade}
                  </p>
                )}
              </div>

              {editable && (
                <button
                  onClick={() => handleEdit(edu)}
                  className="text-blue-500"
                >
                  ✏️
                </button>
              )}

            </div>
          </div>
        ))}
      </div>

      {openForm && (
        <EducationForm
          education={selectedEducation}
          onClose={() => setOpenForm(false)}
          refresh={fetchEducation}
        />
      )}

    </Section>
  );
};

export default Education;
