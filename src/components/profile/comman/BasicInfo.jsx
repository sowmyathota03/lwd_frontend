import { useState } from "react";
import BasicInfoForm from "./BasicInfoForm";
import { Section } from "../comman/Helpers";

const BasicInfo = ({ profile, setProfile, editable }) => {
  const [openForm, setOpenForm] = useState(false);

  if (!profile) return null;

  return (
    <>
      <Section
        title="Basic Information"
        editable={editable}
        onEdit={() => setOpenForm(true)}
        className="lwd-card lwd-card-hover"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Name */}
          <div>
            <p className="lwd-label uppercase tracking-wider">Name</p>
            <p className="lwd-text mt-1">
              {profile.name || "—"}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="lwd-label uppercase tracking-wider">Email</p>
            <p className="lwd-text mt-1 break-all">
              {profile.email || "—"}
            </p>
          </div>

          {/* Phone */}
          <div>
            <p className="lwd-label uppercase tracking-wider">Phone</p>
            <p className="lwd-text mt-1">
              {profile.phone || "—"}
            </p>
          </div>

        </div>
      </Section>

      {/* ===== MODAL FORM ===== */}
      {openForm && (
        <BasicInfoForm
          profile={profile}
          setProfile={setProfile}
          onClose={() => setOpenForm(false)}
        />
      )}
    </>
  );
};

export default BasicInfo;