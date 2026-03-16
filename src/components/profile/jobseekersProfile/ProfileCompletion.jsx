import { useState, useEffect } from "react";
import {
  getProfileCompletion,
  getProfileCompletionByUserId,
} from "../../../api/JobSeekerApi";

function ProfileCompletion({ userId, isOwnProfile, onMissingClick }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileCompletion = async () => {
      try {
        if (!(isOwnProfile || userId)) return;

        setIsLoading(true);

        const response = isOwnProfile
          ? await getProfileCompletion()
          : await getProfileCompletionByUserId(userId);

        setData(response);
      } catch (error) {
        console.error("Failed to fetch profile completion", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileCompletion();
  }, [userId, isOwnProfile]);

  if (isLoading) {
    return null;
  }

  const percentage = data?.percentage ?? 0;
  const missing = data?.missingSections ?? [];

  const handleMissingClick = (item) => {
    if (onMissingClick) {
      onMissingClick(item);
    }
  };

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-800">
          Profile Completion
        </h3>
        <span className="text-sm font-semibold text-blue-600">
          {percentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="w-full bg-gray-200 h-3 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="bg-blue-600 h-3 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Missing sections */}
      {missing.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Complete your profile:
          </p>

          <ul className="flex flex-wrap gap-2 text-sm">
            {missing.map((item, index) => (
              <li
                key={`${item}-${index}`}
                onClick={() => handleMissingClick(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleMissingClick(item);
                  }
                }}
                role="button"
                tabIndex={0}
                className="flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <span aria-hidden="true">⚪</span>
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
