import { useEffect, useState } from "react";
import { Section, formatSkill } from "./Helpers";
import { getMySkills, getSkillsById } from "../../api/JobSeekerApi";
import JobSeekerSkillsForm from "./JobSeekerSkillsForm";

const JobSeekerSkills = ({ editable, isOwnProfile, userId }) => {

  const [skills, setSkills] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const normalizeSkill = (skill) => skill.trim().toLowerCase();

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
      setSkills(normalized);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSkillsByUserId = async (id) => {
    try {
      const res = await getSkillsById(id);
      const normalized = res.data.map(normalizeSkill);
      setSkills(normalized);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Section
      title="Skills"
      editable={editable && isOwnProfile}
      editing={false}
      onEdit={() => setOpenForm(true)}
    >

      {skills.length === 0 ? (
        <div className="text-center text-gray-400">
          No skills added yet
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

      {/* Modal Form */}
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
