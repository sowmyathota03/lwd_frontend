import { useEffect, useState } from "react";
import { Section, formatSkill } from "../comman/Helpers";
import { getMySkills, getSkillsById } from "../../../api/JobSeekerApi";
import JobSeekerSkillsForm from "./JobSeekerSkillsForm";

const normalizeSkill = (skill) => skill.trim().toLowerCase();

const JobSeekerSkills = ({ editable, isOwnProfile, userId }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  // Load Skills
  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        if (isOwnProfile) {
          const res = await getMySkills();
          const normalized = res.data.map(normalizeSkill);
          setSkills(normalized);
        } else if (userId) {
          const res = await getSkillsById(userId);
          const normalized = res.data.map(normalizeSkill);
          setSkills(normalized);
        }
      } catch (err) {
        console.error("Failed to fetch skills:", err);
        // Optionally show user feedback
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [isOwnProfile, userId]);

  const canEdit = editable && isOwnProfile;

  return (
    <Section
      title="Skills"
      editable={canEdit}
      editing={false}
      onEdit={() => setOpenForm(true)}
    >
      {loading ? (
        <div className="flex bg-gray-50 flex-wrap gap-3 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="bg-gray-50 text-transparent px-4 py-1.5 rounded-full text-sm"
            >
              Loading
            </span>
          ))}
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center text-gray-400 py-4">
          {canEdit ? "No skills added yet. Click edit to add." : "No skills listed."}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-linear-to-r from-blue-100 to-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm"
            >
              {formatSkill(skill)}
            </span>
          ))}
        </div>
      )}

      {openForm && (
        <JobSeekerSkillsForm
          skills={skills}
          setSkills={setSkills}
          onClose={() => setOpenForm(false)}
        />
      )}
    </Section>
  );
};

export default JobSeekerSkills;