import { useEffect, useState } from "react";
// import { getInternshipByUserId, getMyInternships } from "../../../api/InternshipApi";

const Internship = ({ userId, editable }) => {
  const [internshipList, setInternshipList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInternships = async () => {
      try {
        let res;

        if (!userId) {
          res = await getMyInternships();
        } else {
          res = await getInternshipByUserId(userId);
        }

        setInternshipList(res?.data || []);
      } catch (error) {
        console.error("Internship load error", error);
      } finally {
        setLoading(false);
      }
    };

    loadInternships();
  }, [userId]);

  if (loading) return <p className="p-4 text-gray-500">Loading internships...</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        Internship Experience
      </h3>

      {internshipList.length === 0 ? (
        <p className="text-gray-500">No internships added.</p>
      ) : (
        <div className="relative border-l-2 border-indigo-200 pl-6 space-y-8">
          {internshipList.map((intern, index) => (
            <div key={index} className="relative">

              <span className="absolute -left-[11px] top-2 w-4 h-4 bg-indigo-600 rounded-full"></span>

              <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition">
                <h4 className="text-lg font-semibold text-gray-800">
                  {intern.role}
                </h4>

                <p className="text-indigo-600 font-medium">
                  {intern.companyName}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {intern.startDate} - {intern.endDate || "Present"}
                </p>

                {intern.description && (
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    {intern.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {editable && (
        <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          + Add Internship
        </button>
      )}
    </div>
  );
};

export default Internship;