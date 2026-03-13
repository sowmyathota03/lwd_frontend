import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import AchievementForm from "./AchievementForm";

/**
 * Achievements component – displays a list of achievements.
 *
 * @param {Object} props
 * @param {string[]} props.achievements - Array of achievement strings
 * @param {boolean} props.editable - Whether the current user can edit
 * @param {Function} props.onSave - Callback when achievements are updated (receives updated array)
 */
function Achievements({ achievements = [], editable, onSave }) {
  const [localAchievements, setLocalAchievements] = useState(achievements);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null); // null | "new" | number

  // Sync with prop changes
  useEffect(() => {
    setLocalAchievements(achievements);
  }, [achievements]);

  const handleAdd = () => {
    setEditingIndex("new");
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = async (newAchievement) => {
    setLoading(true);
    setError(null);
    try {
      let updatedList;
      if (editingIndex === "new") {
        updatedList = [newAchievement, ...localAchievements];
      } else {
        updatedList = [...localAchievements];
        updatedList[editingIndex] = newAchievement;
      }
      // Call parent save function if provided
      if (onSave) {
        await onSave(updatedList);
      }
      setLocalAchievements(updatedList);
      setEditingIndex(null);
    } catch (err) {
      console.error("Failed to save achievement:", err);
      setError("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const achievementToEdit = editingIndex !== null && editingIndex !== "new"
    ? localAchievements[editingIndex]
    : "";

  if (loading && localAchievements.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Achievements</h2>
          {editable && <div className="h-9 w-20 bg-gray-200 rounded animate-pulse" />}
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Achievements</h2>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
      {/* Header with add button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Achievements</h2>
        {editable && (
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add
          </button>
        )}
      </div>

      {/* Empty state */}
      {localAchievements.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">
            {editable
              ? "No achievements added yet. Click 'Add' to get started."
              : "No achievements listed."}
          </p>
        </div>
      )}

      {/* Achievements list */}
      <div className="space-y-3">
        {localAchievements.map((achievement, index) => (
          <div
            key={index}
            className="group relative bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            {/* Edit button (visible on hover) */}
            {editable && (
              <button
                onClick={() => handleEdit(index)}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Edit achievement"
              >
                <Pencil size={18} />
              </button>
            )}
            <p className="text-gray-700 pr-8">{achievement}</p>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {editingIndex !== null && (
        <AchievementForm
          achievement={achievementToEdit}
          onClose={() => setEditingIndex(null)}
          onSave={handleSave}
          loading={loading}
        />
      )}
    </div>
  );
}

export default Achievements;