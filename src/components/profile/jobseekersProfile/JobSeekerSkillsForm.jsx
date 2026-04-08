import { useEffect, useState } from "react";
import {
  updateMySkills,
  getAllSkills
} from "../../../api/JobSeekerApi";
import { formatSkill } from "../comman/Helpers";
import { Search } from "lucide-react";

function JobSeekerSkillsForm({ skills, setSkills, onClose }) {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);

  const normalizeSkill = (skill) => skill.trim().toLowerCase();

  useEffect(() => {
    setSelectedSkills(skills);
  }, [skills]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchAllSkills();
    }, 300);
    return () => clearTimeout(delay);
  }, [keyword]);

  const fetchAllSkills = async () => {
    try {
      const res = await getAllSkills({
        keyword,
        page: 0,
        size: 10,
      });
      setAllSkills(res.data.content || []);
    } catch (err) {
      console.error(err);
    }
  };

  const addSkill = (skillName) => {
    const normalized = normalizeSkill(skillName);
    if (!selectedSkills.includes(normalized)) {
      setSelectedSkills((prev) => [...prev, normalized]);
    }
  };

  const removeSkill = (skill) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };

  const addNewSkill = () => {
    const trimmed = normalizeSkill(newSkill);
    if (trimmed && !selectedSkills.includes(trimmed)) {
      setSelectedSkills((prev) => [...prev, trimmed]);
      setNewSkill("");
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateMySkills(selectedSkills);
      setSkills(selectedSkills);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container lwd-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Edit Skills</h2>
          <p className="modal-subtitle">
            Search and add skills from the list or type your own.
          </p>
        </div>

        {/* Body */}
        <div className="modal-body">

          {/* Search */}
          <div>
            <label className="form-label">Search skills</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 lwd-icon" />
              <input
                type="text"
                placeholder="e.g. JavaScript, React..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Suggested Skills */}
          <div>
            <h3 className="lwd-title mb-3">Suggested Skills</h3>

            <div className="flex flex-wrap gap-3">
              {allSkills.length === 0 && keyword && (
                <p className="lwd-text w-full">No suggestions found.</p>
              )}

              {allSkills.map((skill) => {
                const normalized = normalizeSkill(skill.name);
                const isSelected = selectedSkills.includes(normalized);

                return (
                  <button
                    key={skill.id}
                    onClick={() => addSkill(skill.name)}
                    disabled={isSelected || loading}
                    className={`px-4 py-2 rounded-full text-sm transition ${isSelected
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900"
                      }`}
                  >
                    + {formatSkill(skill.name)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Skill */}
          <div>
            <label className="form-label">Add a custom skill</label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g. TypeScript"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="input-field flex-1"
                disabled={loading}
              />
              <button
                onClick={addNewSkill}
                disabled={loading || !newSkill.trim()}
                className="btn-primary"
              >
                Add
              </button>
            </div>
          </div>

          {/* Selected Skills */}
          {selectedSkills.length > 0 && (
            <div>
              <h3 className="lwd-title mb-3">Selected Skills</h3>
              <div className="flex flex-wrap gap-3">
                {selectedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="lwd-badge flex items-center gap-2"
                  >
                    {formatSkill(skill)}
                    <button
                      onClick={() => removeSkill(skill)}
                      disabled={loading}
                      className="hover:opacity-70"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            onClick={onClose}
            disabled={loading}
            className="lwd-btn-secondary"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="lwd-btn-primary flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobSeekerSkillsForm;