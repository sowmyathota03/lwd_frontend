import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import AchievementForm from "./AchievementForm";

function Achievements({ achievements = [], editable, onSave }) {
  const [localAchievements, setLocalAchievements] = useState(() => achievements || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (JSON.stringify(localAchievements) !== JSON.stringify(achievements)) {
      setLocalAchievements(achievements || []);
    }
  }, [achievements, localAchievements]);

  const handleAdd = () => setEditingIndex("new");

  const handleEdit = (index) => setEditingIndex(index);

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

  const achievementToEdit =
    editingIndex !== null && editingIndex !== "new"
      ? localAchievements[editingIndex]
      : "";

  // ===== Loading State =====
  if (loading && localAchievements.length === 0) {
    return (
      <div className="lwd-card space-y-4">
        <h2 className="lwd-title">Achievements</h2>

        {[1, 2].map((i) => (
          <div key={i} className="lwd-skeleton h-10 w-3/4" />
        ))}
      </div>
    );
  }

  // ===== Error State =====
  if (error) {
    return (
      <div className="lwd-card">
        <h2 className="lwd-title mb-2">Achievements</h2>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="lwd-card space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="lwd-title">Achievements</h2>

        {editable && (
          <button onClick={handleAdd} className="lwd-btn-primary text-sm">
            Add
          </button>
        )}
      </div>

      {/* Empty State */}
      {localAchievements.length === 0 && (
        <div className="text-center py-6 lwd-text">
          {editable
            ? "No achievements added yet. Click 'Add' to get started."
            : "No achievements listed."}
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {localAchievements.map((achievement, index) => (
          <div
            key={index}
            className="group relative lwd-card-hover bg-gray-50 dark:bg-slate-700 rounded-lg p-4"
          >
            {editable && (
              <button
                onClick={() => handleEdit(index)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500"
              >
                <Pencil size={18} />
              </button>
            )}

            <p className="text-gray-700 dark:text-gray-300 pr-8">
              {achievement}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
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