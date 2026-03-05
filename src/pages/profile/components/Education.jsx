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

        setEducationList(res?.data || []);
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
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        Education
      </h3>

      {educationList.length === 0 ? (
        <p className="text-gray-500">No education details added.</p>
      ) : (
        <div className="relative border-l-2 border-indigo-200 pl-6 space-y-8">
          {educationList.map((edu, index) => (
            <div key={index} className="relative">
              
              {/* Timeline Dot */}
              <span className="absolute -left-2.75 top-2 w-4 h-4 bg-indigo-600 rounded-full"></span>

              <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition">
                <h4 className="text-lg font-semibold text-gray-800">
                  {edu.degree} {edu.fieldOfStudy && `- ${edu.fieldOfStudy}`}
                </h4>

                <p className="text-indigo-600 font-medium">
                  {edu.institutionName}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {edu.startYear} - {edu.endYear || "Present"}
                </p>

                {edu.grade && (
                  <p className="text-sm text-gray-500 mt-1">
                    Grade: {edu.grade}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {editable && (
        <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          + Add Education
        </button>
      )}
    </div>
  );
};

export default Education;