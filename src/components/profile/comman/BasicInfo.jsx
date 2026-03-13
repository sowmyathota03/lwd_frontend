import { useState } from "react";
import BasicInfoForm from "./BasicInfoForm";
import { Section } from "../comman/Helpers"; // adjust import path

const BasicInfo = ({ profile, setProfile, editable }) => {
  const [openForm, setOpenForm] = useState(false);

  if (!profile) return null;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm space-y-4">
        <Section
          title="Basic Information"
          editable={editable}
          onEdit={() => setOpenForm(true)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </p>
              <p className="mt-1 text-gray-900">{profile.name || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </p>
              <p className="mt-1 text-gray-900">{profile.email}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </p>
              <p className="mt-1 text-gray-900">{profile.phone || "—"}</p>
            </div>
          </div>
        </Section>

        {openForm && (
          <BasicInfoForm
            profile={profile}
            setProfile={setProfile}
            onClose={() => setOpenForm(false)}
          />
        )}
      </div>
    </>
  );
};

export default BasicInfo;
