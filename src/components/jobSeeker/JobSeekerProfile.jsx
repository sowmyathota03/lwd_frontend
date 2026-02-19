import React, { useEffect, useState } from "react";
import {
  getMyProfile,
  createOrUpdateProfile,
} from "../../api/JobSeekerApi";

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
      alert("Profile Updated Successfully ✅");
    } catch (err) {
      setError("Error saving profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-indigo-50 to-emerald-50">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-emerald-50 py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/40 p-10 transition-all">

        <h2 className="text-4xl font-bold text-center mb-12 bg-linear-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent tracking-tight">
          Job Seeker Profile
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-6 font-medium">
            {error}
          </p>
        )}

        {!profile || isEdit ? (
          <>
            {/* Personal Info */}
            <SectionTitle title="Personal Information" />
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Input name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} />
              <Input name="email" label="Email" value={formData.email} onChange={handleChange} />
            </div>

            {/* Notice */}
            <SectionTitle title="Notice & Availability" />
            <div className="grid md:grid-cols-2 gap-8 mb-12">
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

            {/* Professional */}
            <SectionTitle title="Professional Information" />
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Input name="currentCompany" label="Current Company" value={formData.currentCompany} onChange={handleChange} />
              <Input name="totalExperience" label="Total Experience (Years)" type="number" value={formData.totalExperience} onChange={handleChange} />
              <Input name="currentCTC" label="Current CTC" type="number" value={formData.currentCTC} onChange={handleChange} />
              <Input name="expectedCTC" label="Expected CTC" type="number" value={formData.expectedCTC} onChange={handleChange} />
              <Input name="currentLocation" label="Current Location" value={formData.currentLocation} onChange={handleChange} />
              <Input name="preferredLocation" label="Preferred Location" value={formData.preferredLocation} onChange={handleChange} />
              <Input name="skills" label="Skills (Comma Separated)" value={formData.skills} onChange={handleChange} />
              <Input name="resumeUrl" label="Resume URL" value={formData.resumeUrl} onChange={handleChange} />
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="px-12 py-3.5 bg-linear-to-r from-indigo-600 to-emerald-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                💾 Save Profile
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
  <h3 className="text-lg font-semibold text-gray-700 mb-6 border-l-4 border-indigo-500 pl-4">
    {title}
  </h3>
);

const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-600">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-2.5 border border-gray-200 bg-white/70 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 outline-none"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-600">
      {label}
    </label>
    <select
      {...props}
      className="w-full px-4 py-2.5 border border-gray-200 bg-white/70 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 outline-none"
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
  <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-gray-200">
    <input
      type="checkbox"
      {...props}
      className="h-5 w-5 accent-indigo-600 cursor-pointer"
    />
    <label className="text-sm text-gray-700 cursor-pointer">
      {label}
    </label>
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
      <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 shadow-sm">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {label}
        </p>
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 font-semibold hover:text-indigo-800 transition underline"
        >
          View Resume
        </a>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 shadow-sm">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="font-medium text-gray-800">
        {formatValue(value)}
      </p>
    </div>
  );
};

const ProfileView = ({ profile, onEdit }) => (
  <div className="space-y-12">
    <SectionTitle title="Personal Information" />
    <div className="grid md:grid-cols-2 gap-8">
      <ViewField label="Full Name" value={profile.fullName} />
      <ViewField label="Email" value={profile.email} />
    </div>

    <SectionTitle title="Notice & Availability" />
    <div className="grid md:grid-cols-2 gap-8">
      <ViewField label="Notice Status" value={profile.noticeStatus?.replaceAll("_", " ")} />
      <ViewField label="Notice Period (Days)" value={profile.noticePeriod} />
      <ViewField label="Last Working Day" value={profile.lastWorkingDay} />
      <ViewField label="Available From" value={profile.availableFrom} />
      <ViewField label="Currently Serving Notice" value={profile.isServingNotice} />
      <ViewField label="Immediate Joiner" value={profile.immediateJoiner} />
    </div>

    <SectionTitle title="Professional Information" />
    <div className="grid md:grid-cols-2 gap-8">
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
        className="px-10 py-3 bg-linear-to-r from-emerald-500 to-indigo-500 text-white rounded font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        ✏️ Edit Profile
      </button>
    </div>
  </div>
);

export default JobSeekerProfile;
