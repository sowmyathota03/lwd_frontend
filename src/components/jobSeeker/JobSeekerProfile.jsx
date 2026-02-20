import React, { useEffect, useState } from "react";
import { getMyProfile, createOrUpdateProfile } from "../../api/JobSeekerApi";

const initialState = {
  fullName: "",
  email: "",
  noticeStatus: "",
  isServingNotice: false,
  lastWorkingDay: "",
  noticePeriod: "",
  availableFrom: "",
  immediateJoiner: false,
  currentCompany: "",
  totalExperience: "",
  currentCTC: "",
  expectedCTC: "",
  currentLocation: "",
  preferredLocation: "",
  skills: "",
  resumeUrl: "",
};

const JobSeekerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfile();
      if (res.data) {
        setProfile(res.data);
        setFormData(res.data);
      }
    } catch (err) {
      console.log("No profile found");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await createOrUpdateProfile(formData);
      setProfile(res.data);
      setIsEdit(false);
      alert("Profile Updated Successfully");
    } catch (err) {
      setError("Error saving profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Job Seeker Profile
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        {!profile || isEdit ? (
          <>
            <SectionTitle title="Personal Information" />
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Input name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} />
              <Input name="email" label="Email" value={formData.email} onChange={handleChange} />
            </div>

            <SectionTitle title="Notice & Availability" />
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Select
                name="noticeStatus"
                label="Notice Status"
                value={formData.noticeStatus}
                onChange={handleChange}
                options={["SERVING_NOTICE", "IMMEDIATE_JOINER", "NOT_SERVING", "ANY"]}
              />
              <Input name="noticePeriod" label="Notice Period (Days)" type="number" value={formData.noticePeriod} onChange={handleChange} />
              <Input name="lastWorkingDay" label="Last Working Day" type="date" value={formData.lastWorkingDay} onChange={handleChange} />
              <Input name="availableFrom" label="Available From" type="date" value={formData.availableFrom} onChange={handleChange} />
              <Checkbox name="isServingNotice" label="Currently Serving Notice" checked={formData.isServingNotice} onChange={handleChange} />
              <Checkbox name="immediateJoiner" label="Immediate Joiner" checked={formData.immediateJoiner} onChange={handleChange} />
            </div>

            <SectionTitle title="Professional Information" />
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Input name="currentCompany" label="Current Company" value={formData.currentCompany} onChange={handleChange} />
              <Input name="totalExperience" label="Total Experience (Years)" type="number" value={formData.totalExperience} onChange={handleChange} />
              <Input name="currentCTC" label="Current CTC" type="number" value={formData.currentCTC} onChange={handleChange} />
              <Input name="expectedCTC" label="Expected CTC" type="number" value={formData.expectedCTC} onChange={handleChange} />
              <Input name="currentLocation" label="Current Location" value={formData.currentLocation} onChange={handleChange} />
              <Input name="preferredLocation" label="Preferred Location" value={formData.preferredLocation} onChange={handleChange} />
              <Input name="skills" label="Skills (Comma Separated)" value={formData.skills} onChange={handleChange} />
              <Input name="resumeUrl" label="Resume URL" value={formData.resumeUrl} onChange={handleChange} />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setFormData(profile);
                  setIsEdit(false);
                  setError("");
                }}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded border-none font-medium hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-blue-600 text-white rounded border-none font-semibold hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <ProfileView profile={profile} onEdit={() => setIsEdit(true)} />
        )}
      </div>
    </div>
  );
};

const SectionTitle = ({ title }) => (
  <h3 className="text-lg font-semibold text-gray-700 mb-4 border-l-4 border-blue-600 pl-3">
    {title}
  </h3>
);

const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <select
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt.replaceAll("_", " ")}
        </option>
      ))}
    </select>
  </div>
);

const Checkbox = ({ label, ...props }) => (
  <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
    <input type="checkbox" {...props} className="h-5 w-5 accent-blue-600 cursor-pointer" />
    <label className="text-sm text-gray-700 cursor-pointer">{label}</label>
  </div>
);

const ViewField = ({ label, value }) => {
  const formatValue = (val) => {
    if (typeof val === "boolean") return val ? "Yes" : "No";
    if (!val) return "-";
    return val;
  };

  if (label === "Resume URL" && value) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline">
          View Resume
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="font-medium text-gray-800">{formatValue(value)}</p>
    </div>
  );
};

const ProfileView = ({ profile, onEdit }) => (
  <div className="space-y-8">
    <SectionTitle title="Personal Information" />
    <div className="grid md:grid-cols-2 gap-6">
      <ViewField label="Full Name" value={profile.fullName} />
      <ViewField label="Email" value={profile.email} />
    </div>

    <SectionTitle title="Notice & Availability" />
    <div className="grid md:grid-cols-2 gap-6">
      <ViewField label="Notice Status" value={profile.noticeStatus?.replaceAll("_", " ")} />
      <ViewField label="Notice Period (Days)" value={profile.noticePeriod} />
      <ViewField label="Last Working Day" value={profile.lastWorkingDay} />
      <ViewField label="Available From" value={profile.availableFrom} />
      <ViewField label="Currently Serving Notice" value={profile.isServingNotice} />
      <ViewField label="Immediate Joiner" value={profile.immediateJoiner} />
    </div>

    <SectionTitle title="Professional Information" />
    <div className="grid md:grid-cols-2 gap-6">
      <ViewField label="Current Company" value={profile.currentCompany} />
      <ViewField label="Total Experience (Years)" value={profile.totalExperience} />
      <ViewField label="Current CTC" value={profile.currentCTC} />
      <ViewField label="Expected CTC" value={profile.expectedCTC} />
      <ViewField label="Current Location" value={profile.currentLocation} />
      <ViewField label="Preferred Location" value={profile.preferredLocation} />
      <ViewField label="Skills" value={profile.skills} />
      <ViewField label="Resume URL" value={profile.resumeUrl} />
    </div>

    <div className="text-center mt-6">
      <button
        onClick={onEdit}
        className="px-10 py-3 bg-blue-600 text-white rounded border-none font-medium hover:bg-blue-700 transition"
      >
        Edit Profile
      </button>
    </div>
  </div>
);

export default JobSeekerProfile;