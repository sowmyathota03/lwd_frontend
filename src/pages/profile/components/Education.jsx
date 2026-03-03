import { useEffect, useState } from "react";
// import { getEducationByUserId, getMyEducation } from "../../../api/EducationApi";

const Education = ({ userId, editable }) => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEducation = async () => {
      try {
        let res;

        if (!userId) {
          res = await getMyEducation();
        } else {
          res = await getEducationByUserId(userId);
        }

        setEducationList(res.data || []);
      } catch (error) {
        console.error("Education load error", error);
      } finally {
        setLoading(false);
      }
    };

    loadEducation();
  }, [userId]);

  if (loading) return <p className="p-4">Loading education...</p>;

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-indigo-600">
        Education Details
      </h3>

      {educationList.length === 0 ? (
        <p className="text-gray-500">No education details added.</p>
      ) : (
        <div className="space-y-4">
          {educationList.map((edu, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <h4 className="font-semibold text-lg">
                {edu.degree} - {edu.fieldOfStudy}
              </h4>
              <p className="text-gray-600">{edu.institutionName}</p>
              <p className="text-sm text-gray-500">
                {edu.startYear} - {edu.endYear}
              </p>
              <p className="text-sm text-gray-500">
                Grade: {edu.grade}
              </p>
            </div>
          ))}
        </div>
      )}

      {editable && (
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Add Education
        </button>
      )}
    </div>
  );
};

export default Education;