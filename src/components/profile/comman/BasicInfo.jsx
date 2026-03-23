import { useState } from "react";
import BasicInfoForm from "./BasicInfoForm";
import { Section } from "../comman/Helpers"; // adjust import path

const BasicInfo = ({ profile, setProfile, editable }) => {
  const [openForm, setOpenForm] = useState(false);

  if (!profile) return null;

  return (
    <div className="lwd-card space-y-4 p-6">
      <Section
        title="Basic Information"
        editable={editable}
        onEdit={() => setOpenForm(true)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Name */}
          <div>
            <p className="lwd-label uppercase tracking-wider">Name</p>
            <p className="lwd-text mt-1">{profile.name || "—"}</p>
          </div>

          {/* Email */}
          <div>
            <p className="lwd-label uppercase tracking-wider">Email</p>
            <p className="lwd-text mt-1">{profile.email || "—"}</p>
          </div>

          {/* Phone */}
          <div>
            <p className="lwd-label uppercase tracking-wider">Phone</p>
            <p className="lwd-text mt-1">{profile.phone || "—"}</p>
          </div>
        </div>
      </Section>

      {/* Editable Form */}
      {openForm && (
        <BasicInfoForm
          profile={profile}
          setProfile={setProfile}
          onClose={() => setOpenForm(false)}
        />
      )}
    </div>
  );
};

export default BasicInfo;