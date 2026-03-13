import { useQuery } from '@tanstack/react-query';
import {
  getProfileCompletion,
  getProfileCompletionByUserId,
} from '../../../api/JobSeekerApi';

/**
 * ProfileCompletion component displays a user's profile completion percentage
 * and a list of missing sections. It handles both the current user's profile
 * and viewing other users' profiles.
 *
 * @param {Object} props
 * @param {string|number} [props.userId] - ID of the user whose profile is being viewed
 * @param {boolean} [props.isOwnProfile] - Whether the profile belongs to the logged-in user
 * @param {Function} [props.onMissingClick] - Callback when a missing section is clicked
 */
function ProfileCompletion({ userId, isOwnProfile, onMissingClick }) {
  // Fetch profile completion data based on ownership
  const { data, isLoading } = useQuery({
    queryKey: ['profileCompletion', userId],
    queryFn: () =>
      isOwnProfile
        ? getProfileCompletion()
        : getProfileCompletionByUserId(userId),
    enabled: isOwnProfile || Boolean(userId),
  });

  // Show nothing while loading – keeps UI clean.
  // In a more advanced version, a skeleton could be shown.
  if (isLoading) {
    return null;
  }

  // Safely extract percentage and missing sections with defaults
  const percentage = data?.percentage ?? 0;
  const missing = data?.missingSections ?? [];

  /**
   * Handles click on a missing section item.
   * Calls the parent callback with the clicked item.
   *
   * @param {string} item - The missing section identifier
   */
  const handleMissingClick = (item) => {
    if (onMissingClick) {
      onMissingClick(item);
    }
  };

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      {/* Header with title and percentage */}
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

      {/* Missing sections list */}
      {missing.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Complete your profile:
          </p>

          <ul className="flex flex-wrap gap-2 text-sm">
            {missing.map((item, index) => (
              <li
                // Use a combination of item and index as key – items are expected to be unique strings
                key={`${item}-${index}`}
                onClick={() => handleMissingClick(item)}
                onKeyDown={(e) => {
                  // Allow keyboard activation with Enter or Space
                  if (e.key === 'Enter' || e.key === ' ') {
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