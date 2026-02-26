import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [editId, setEditId] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/skills");
      setSkills(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (newSkill.trim() === "") return;

    try {
      if (editId) {
        await axios.put(`http://localhost:8080/api/skills/${editId}`, {
          name: newSkill,
        });
        setSuccessMsg("Skill updated successfully ✅");
      } else {
        await axios.post("http://localhost:8080/api/skills", {
          name: newSkill,
        });
        setSuccessMsg("Skill added successfully ✅");
      }

      resetForm();
      fetchSkills();

      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (skill) => {
    setNewSkill(skill.name);
    setEditId(skill.id);
    setShowInput(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/skills/${id}`);
      setSuccessMsg("Skill deleted successfully 🗑️");
      fetchSkills();
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setNewSkill("");
    setEditId(null);
    setShowInput(false);
  };

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {!showInput ? (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-10 h-10 
                         rounded-full bg-white border border-gray-200 
                         shadow-sm hover:shadow-md hover:bg-gray-50 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          ) : (
            <div className="w-10 h-10"></div>
          )}

          <h2 className="text-2xl font-semibold text-gray-800">
            Skills
          </h2>

          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition"
            >
              + Add Skill
            </button>
          ) : (
            <div className="w-[110px]"></div>
          )}
        </div>

        {/* Success Message */}
        {successMsg && (
          <div className="mb-4 text-green-600 font-medium">
            {successMsg}
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Add / Edit Skill */}
        {showInput && (
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Enter skill name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {editId ? "Update" : "Save"}
            </button>

            <button
              onClick={resetForm}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Skills List */}
        <div className="space-y-3">
          {filteredSkills.length === 0 ? (
            <p className="text-gray-500">No matching skills found.</p>
          ) : (
            filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex justify-between items-center border 
                           rounded-lg px-4 py-3 hover:shadow-md transition"
              >
                <span className="font-medium text-gray-700">
                  {skill.name}
                </span>

                <div className="flex gap-4 text-sm">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Skills;