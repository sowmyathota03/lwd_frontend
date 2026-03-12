import { useEffect, useState } from "react";
import {
  updateMySkills,
  getAllSkills
} from "../../../api/JobSeekerApi";
import { formatSkill } from "./Helpers";
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

  // Fetch suggestions
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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded-xl w-150 space-y-6">

        <h2 className="text-xl font-semibold">
          Edit Skills
        </h2>

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search skills..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border rounded-xl pl-10 pr-4 py-2"
          />
        </div>

        {/* Suggested Skills */}
        <div>
          <h4 className="text-sm font-semibold mb-2">
            Suggested Skills
          </h4>

          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => {
              const normalized = normalizeSkill(skill.name);
              const selected = selectedSkills.includes(normalized);

              return (
                <button
                  key={skill.id}
                  onClick={() => addSkill(skill.name)}
                  disabled={selected}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    selected
                      ? "bg-gray-200 text-gray-400"
                      : "bg-gray-100 hover:bg-blue-100"
                  }`}
                >
                  + {formatSkill(skill.name)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Skill */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Custom skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
          />

          <button
            onClick={addNewSkill}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* Selected Skills */}
        <div className="flex flex-wrap gap-3">
          {selectedSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-2"
            >
              {formatSkill(skill)}

              <button
                onClick={() => removeSkill(skill)}
                className="font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default JobSeekerSkillsForm;
