import { useEffect, useState } from "react";
import { Section, formatSkill } from "../comman/Helpers";
import { getMySkills, getSkillsById } from "../../../api/JobSeekerApi";
import JobSeekerSkillsForm from "./JobSeekerSkillsForm";

const normalizeSkill = (skill) => skill.trim().toLowerCase();

const JobSeekerSkills = ({ editable, isOwnProfile, userId }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        if (isOwnProfile) {
          const res = await getMySkills();
          setSkills(res.data.map(normalizeSkill));
        } else if (userId) {
          const res = await getSkillsById(userId);
          setSkills(res.data.map(normalizeSkill));
        }
      } catch (err) {
        console.error("Failed to fetch skills:", err);
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
      {/* Loading */}
      {loading ? (
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="lwd-skeleton px-4 py-1.5 rounded-full text-sm w-20">
              &nbsp;
            </span>
          ))}
        </div>
      ) : skills.length === 0 ? (
        /* Empty */
        <div className="text-center py-4">
          <p className="lwd-text">
            {canEdit
              ? "No skills added yet. Click edit to add."
              : "No skills listed."}
          </p>
        </div>
      ) : (
        /* Skills */
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="lwd-badge"
            >
              {formatSkill(skill)}
            </span>
          ))}
        </div>
      )}

      {/* Modal */}
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