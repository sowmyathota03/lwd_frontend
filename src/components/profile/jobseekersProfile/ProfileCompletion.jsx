import { useQuery } from "@tanstack/react-query";
import { getProfileCompletion } from "../../../api/JobSeekerApi";

function ProfileCompletion() {

  const { data, isLoading } = useQuery({
    queryKey: ["profileCompletion"],
    queryFn: getProfileCompletion,
  });

  if (isLoading) return null;

  const percentage = data?.percentage || 0;
  const missing = data?.missingSections || [];

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">

      {/* Header */}
      <div className="flex justify-between mb-3">
        <h3 className="text-sm font-semibold">Profile Completion</h3>
        <span className="text-sm font-semibold text-blue-600">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-3 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Missing Sections */}
      {missing.length > 0 && (
        <div className="mt-4">

          <p className="text-sm font-medium text-gray-700 mb-2">
            Complete your profile:
          </p>

          <ul className="space-y-1 flex flex-wrap gap-2 text-sm text-gray-500">

            {missing.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span>⚪</span>
                {item}
              </li>
            ))}

          </ul>

        </div>
      )}

    </div>
  );
}

export default ProfileCompletion;
