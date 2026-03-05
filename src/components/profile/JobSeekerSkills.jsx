import { useEffect, useState } from "react";
import { Section, Buttons, formatSkill } from "./Helpers";
import {
  getMySkills,
  updateMySkills,
  getAllSkills,
  getSkillsById, // ✅ Added
} from "../../api/JobSeekerApi";
import { Search } from "lucide-react";

const JobSeekerSkills = ({ editable, isOwnProfile, userId }) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [mySkills, setMySkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const normalizeSkill = (skill) => skill.trim().toLowerCase();

  // ==========================================
  // 🔹 Load Skills (Own or Other Profile)
  // ==========================================
  useEffect(() => {
    if (isOwnProfile) {
      fetchMySkills();
    } else if (userId) {
      fetchSkillsByUserId(userId);
    }
  }, [isOwnProfile, userId]);

  const fetchMySkills = async () => {
    try {
      const res = await getMySkills();
      const normalized = res.data.map(normalizeSkill);
      setMySkills(normalized);
      setSelectedSkills(normalized);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSkillsByUserId = async (id) => {
    try {
      const res = await getSkillsById(id);
      const normalized = res.data.map(normalizeSkill);
      setMySkills(normalized);
      setSelectedSkills(normalized);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================================
  // 🔍 Fetch Suggested Skills (Editing Mode)
  // ==========================================
  useEffect(() => {
    if (!editing) return;

    const delay = setTimeout(() => {
      fetchAllSkills();
    }, 300);

    return () => clearTimeout(delay);
  }, [keyword, editing]);

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

  // ==========================================
  // 🧠 Skill Manipulation
  // ==========================================
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

  // ==========================================
  // 💾 Save
  // ==========================================
  const handleSave = async () => {
    try {
      setLoading(true);
      await updateMySkills(selectedSkills);
      setMySkills(selectedSkills);
      setEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedSkills(mySkills);
    setEditing(false);
  };

  return (
    <Section
      title="Skills"
      editable={editable && isOwnProfile} // ✅ Only own profile editable
      editing={editing}
      onEdit={() => isOwnProfile && setEditing(true)}
    >
      {!editing ? (
        <div>
          {mySkills.length === 0 ? (
            <div className="text-center text-gray-400">
              No skills added yet
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {mySkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-linear-to-r from-blue-100 to-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm hover:scale-105 transition"
                >
                  {formatSkill(skill)}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* 🔍 Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search skills..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* 🔥 Suggested Skills */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-3">
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
                    className={`px-3 py-1.5 rounded-full text-sm transition ${
                      selected
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 hover:bg-blue-100 hover:text-blue-700"
                    }`}
                  >
                    + {formatSkill(skill.name)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ➕ Add Custom Skill */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Add Custom Skill
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type skill name..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={addNewSkill}
                className="bg-blue-600 text-white px-5 rounded-xl hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
          </div>

          {/* ✅ Selected Skills */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-3">
              Selected Skills
            </h4>
            <div className="flex flex-wrap gap-3">
              {selectedSkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-2 shadow hover:shadow-md transition"
                >
                  {formatSkill(skill)}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-white font-bold hover:text-gray-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <Buttons
            onCancel={handleCancel}
            onSave={handleSave}
            loading={loading}
          />
        </div>
      )}
    </Section>
  );
};

export default JobSeekerSkills;
