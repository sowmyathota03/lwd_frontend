import { useState } from "react";
import { Section, Field } from "../comman/Helpers";
import JobSeekerDetailsForm from "./JobSeekerDetailsForm";

const NOTICE_STATUS_OPTIONS = [
  { value: "SERVING_NOTICE", label: "Serving Notice" },
  { value: "IMMEDIATE_JOINER", label: "Immediate Joiner" },
  { value: "NOT_LOOKING", label: "Not Looking" },
  { value: "OPEN_TO_WORK", label: "Open To Work" },
  { value: "NOT_SERVING", label: "Not Serving" },
  { value: "ANY", label: "Any" },
];

const JobSeekerDetails = ({ profile, setProfile, editable }) => {
  const [openForm, setOpenForm] = useState(false);

  if (!profile && !editable) return null;

  return (
    <>
      <Section
        title="Job Seeker Details"
        editable={editable}
        onEdit={() => setOpenForm(true)}
      >
        {/* ================= NOTICE ================= */}
        <h3 className="lwd-title mt-4 mb-2">
          Notice & Availability
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Notice Status" value={profile?.noticeStatus} />
          <Field label="Notice Period (Days)" value={profile?.noticePeriod} />
          <Field label="Last Working Day" value={profile?.lastWorkingDay} />
          <Field label="Available From" value={profile?.availableFrom} />
          <Field
            label="Serving Notice"
            value={profile?.isServingNotice ? "Yes" : "No"}
          />
          <Field
            label="Immediate Joiner"
            value={profile?.immediateJoiner ? "Yes" : "No"}
          />
        </div>

        {/* ================= PROFESSIONAL ================= */}
        <h3 className="lwd-title mt-6 mb-3 border-t pt-4 border-gray-200 dark:border-gray-700">
          Professional Information
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Current Company" value={profile?.currentCompany} />
          <Field label="Total Experience" value={profile?.totalExperience} />
          <Field label="Current CTC" value={profile?.currentCTC} />
          <Field label="Expected CTC" value={profile?.expectedCTC} />
          <Field label="Current Location" value={profile?.currentLocation} />
          <Field label="Preferred Location" value={profile?.preferredLocation} />
          <Field label="Resume URL" value={profile?.resumeUrl} />
        </div>
      </Section>

      {/* Modal Form */}
      {openForm && (
        <JobSeekerDetailsForm
          profile={profile}
          setProfile={setProfile}
          onClose={() => setOpenForm(false)}
          noticeOptions={NOTICE_STATUS_OPTIONS}
        />
      )}
    </>
  );
};

export default JobSeekerDetails;