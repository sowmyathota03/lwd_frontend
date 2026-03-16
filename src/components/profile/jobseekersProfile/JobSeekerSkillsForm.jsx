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
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Skills</h2>
          <p className="text-sm text-gray-500 mt-1">
            Search and add skills from the list or type your own.
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Search input */}
          <div>
            <label htmlFor="skill-search" className="block text-sm font-medium text-gray-700 mb-2">
              Search skills
            </label>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="skill-search"
                placeholder="e.g. JavaScript, React..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>
          </div>

          {/* Suggested skills */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-3">Suggested Skills</h3>
            <div className="flex flex-wrap gap-3">
              {allSkills.length === 0 && keyword && (
                <p className="text-sm text-gray-400 w-full">No suggestions found.</p>
              )}
              {allSkills.map((skill) => {
                const normalized = normalizeSkill(skill.name);
                const isSelected = selectedSkills.includes(normalized);

                return (
                  <button
                    key={skill.id}
                    onClick={() => addSkill(skill.name)}
                    disabled={isSelected || loading}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isSelected
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }`}
                  >
                    + {formatSkill(skill.name)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add custom skill */}
          <div>
            <label htmlFor="custom-skill" className="block text-sm font-medium text-gray-700 mb-2">
              Add a custom skill
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="custom-skill"
                placeholder="e.g. TypeScript"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                disabled={loading}
              />
              <button
                onClick={addNewSkill}
                disabled={loading || !newSkill.trim()}
                className="px-6 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>

          {/* Selected skills */}
          {selectedSkills.length > 0 && (
            <div>
              <h3 className="text-md font-semibold text-gray-700 mb-3">Selected Skills</h3>
              <div className="flex flex-wrap gap-3">
                {selectedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {formatSkill(skill)}
                    <button
                      onClick={() => removeSkill(skill)}
                      disabled={loading}
                      className="ml-1 text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white rounded-full px-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={`Remove ${skill}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t sticky bottom-0 bg-white py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-25 justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
    </div>
  );
}

export default JobSeekerSkillsForm;