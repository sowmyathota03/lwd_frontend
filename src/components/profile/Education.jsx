import { useState, useEffect } from "react";
import { getMyEducation, getEducationByUserId } from "../../api/EducationApi";
import { Section, Grid, Input, Buttons } from "./Helpers";

const Education = ({ userId, editable }) => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [forms, setForms] = useState([]); // forms being edited/added

  const initialForm = {
    degree: "",
    fieldOfStudy: "",
    institutionName: "",
    startYear: "",
    endYear: "",
    grade: "",
  };

  // Load education
  useEffect(() => {
    const loadEducation = async () => {
      try {
        const res = !userId ? await getMyEducation() : await getEducationByUserId(userId);
        setEducationList(res || []);
      } catch (err) {
        console.error("Education load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadEducation();
  }, [userId]);

  const handleEditAll = () => {
    const allForms = educationList.map((edu) => ({
      id: edu.id,
      data: { ...edu },
    }));
    setForms(allForms);
    setEditing(true);
  };

  const handleAddForm = () => {
    setForms([...forms, { id: Date.now(), data: initialForm }]);
    setEditing(true);
  };

  const handleChange = (id, e) => {
    setForms(
      forms.map((f) =>
        f.id === id ? { ...f, data: { ...f.data, [e.target.name]: e.target.value } } : f
      )
    );
  };

  const handleSave = (id) => {
    const form = forms.find((f) => f.id === id);
    if (!form) return;

    const exists = educationList.find((edu) => edu.id === id);
    if (exists) {
      setEducationList(
        educationList.map((edu) => (edu.id === id ? { ...edu, ...form.data } : edu))
      );
    } else {
      setEducationList([...educationList, { ...form.data, id }]);
    }

    const remainingForms = forms.filter((f) => f.id !== id);
    setForms(remainingForms);
    if (remainingForms.length === 0) setEditing(false);
  };

  const handleCancel = (id) => {
    const remainingForms = forms.filter((f) => f.id !== id);
    setForms(remainingForms);
    if (remainingForms.length === 0) setEditing(false);
  };

  if (loading) return <div className="p-6 text-gray-500">Loading education...</div>;

  return (
    <Section
      title="Education"
      editable={editable}
      editing={editing}
      onEdit={handleEditAll}
    >
      {editable && (
        <button
          onClick={handleAddForm}
          className="mb-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
        >
          + Add Education
        </button>
      )}

      <div className="space-y-4">
        {/* Render forms first */}
        {forms.map((f) => (
          <div key={f.id} className="p-4 border rounded-lg bg-gray-50">
            <Grid mdCols={2} lgCols={3} className="gap-4">
              <Input
                label="Degree"
                name="degree"
                value={f.data.degree}
                onChange={(e) => handleChange(f.id, e)}
              />
              <Input
                label="Field of Study"
                name="fieldOfStudy"
                value={f.data.fieldOfStudy}
                onChange={(e) => handleChange(f.id, e)}
              />
              <Input
                label="Institution Name"
                name="institutionName"
                value={f.data.institutionName}
                onChange={(e) => handleChange(f.id, e)}
              />
              <Input
                label="Grade / CGPA"
                name="grade"
                value={f.data.grade}
                onChange={(e) => handleChange(f.id, e)}
              />
              <Input
                label="Start Year"
                name="startYear"
                value={f.data.startYear}
                onChange={(e) => handleChange(f.id, e)}
              />
              <Input
                label="End Year"
                name="endYear"
                value={f.data.endYear}
                onChange={(e) => handleChange(f.id, e)}
              />
            </Grid>
            <Buttons
              onCancel={() => handleCancel(f.id)}
              onSave={() => handleSave(f.id)}
              loading={false}
            />
          </div>
        ))}

        {/* Render read-only education cards */}
        {educationList
          .filter((edu) => !forms.some((f) => f.id === edu.id))
          .map((edu) => (
            <div
              key={edu.id}
              className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {edu.degree} {edu.fieldOfStudy && `- ${edu.fieldOfStudy}`}
              </h3>
              <p className="text-indigo-600 font-medium">{edu.institutionName}</p>
              <p className="text-sm text-gray-500 mt-1">
                {edu.startYear} - {edu.endYear || "Present"}
              </p>
              {edu.grade && (
                <p className="text-sm text-gray-500 mt-1">Grade: {edu.grade}</p>
              )}
            </div>
          ))}
      </div>

      {/* Show message if empty */}
      {educationList.length === 0 && forms.length === 0 && (
        <p className="text-gray-500 text-sm">No education details added.</p>
      )}
    </Section>
  );
};

export default Education;