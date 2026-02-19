import { useEffect, useState } from "react";
import {
  getMyProfile,
  createOrUpdateProfile,
} from "../../api/JobSeekerApi";

const JobSeekerProfile = () => {
  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    noticeStatus: "",
    isServingNotice: false,
    lastWorkingDay: "",
    noticePeriod: "",
    availableFrom: "",
    immediateJoiner: false,
    currentCompany: "",
    currentCTC: "",
    expectedCTC: "",
    currentLocation: "",
    preferredLocation: "",
    totalExperience: "",
    skills: "",
    resumeUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getMyProfile();
      if (response.data) {
        setProfile(response.data);
        setFormData(response.data);
      }
    } catch (err) {
      console.log("No profile found → Create new");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await createOrUpdateProfile(formData);
      setProfile(response.data);
      setIsEdit(false);
      alert("Profile saved successfully");
    } catch (err) {
      setError("Failed to save profile");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading profile...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-emerald-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
          Job Seeker Profile
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {!profile || isEdit ? (
          <>
            {/* ================= PERSONAL SECTION ================= */}
            <SectionTitle title="Personal Information" />

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <Input name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} />
              <Input name="email" label="Email" value={formData.email} onChange={handleChange} />
            </div>

            {/* ================= NOTICE SECTION ================= */}
            <SectionTitle title="Notice & Availability" />

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <Select
                name="noticeStatus"
                label="Notice Status"
                value={formData.noticeStatus}
                onChange={handleChange}
                options={[
                  "SERVING_NOTICE",
                  "IMMEDIATE_JOINER",
                  "NOT_SERVING",
                  "ANY",
                ]}
              />

              <Input
                name="noticePeriod"
                label="Notice Period (Days)"
                type="number"
                value={formData.noticePeriod}
                onChange={handleChange}
              />

              <Input
                name="lastWorkingDay"
                label="Last Working Day"
                type="date"
                value={formData.lastWorkingDay}
                onChange={handleChange}
              />

              <Input
                name="availableFrom"
                label="Available From"
                type="date"
                value={formData.availableFrom}
                onChange={handleChange}
              />

              <Checkbox
                name="isServingNotice"
                label="Currently Serving Notice"
                checked={formData.isServingNotice}
                onChange={handleChange}
              />

              <Checkbox
                name="immediateJoiner"
                label="Immediate Joiner"
                checked={formData.immediateJoiner}
                onChange={handleChange}
              />
            </div>

            {/* ================= PROFESSIONAL SECTION ================= */}
            <SectionTitle title="Professional Information" />

            <div className="grid md:grid-cols-2 gap-6 mb-10">
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
                className="px-8 py-3 bg-linear-to-r from-indigo-500 to-blue-500 text-white rounded-full font-semibold shadow-md hover:scale-105 transition-all duration-200"
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

/* ================= REUSABLE COMPONENTS ================= */

const SectionTitle = ({ title }) => (
  <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
    {title}
  </h3>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <select
      {...props}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
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
  <div className="flex items-center gap-3 mt-6">
    <input type="checkbox" {...props} className="h-5 w-5 text-indigo-600" />
    <label className="text-sm text-gray-600">{label}</label>
  </div>
);

const ProfileView = ({ profile, onEdit }) => (
  <div className="space-y-4">
    <div className="grid md:grid-cols-2 gap-4 text-gray-700">
      {Object.entries(profile).map(([key, value]) =>
        value ? (
          <p key={key}>
            <span className="font-semibold capitalize">
              {key.replace(/([A-Z])/g, " $1")}:
            </span>{" "}
            {value.toString()}
          </p>
        ) : null
      )}
    </div>

    <div className="text-center mt-6">
      <button
        onClick={onEdit}
        className="px-6 py-2 bg-emerald-500 text-white rounded-full font-medium hover:scale-105 transition"
      >
        ✏️ Edit Profile
      </button>
    </div>
  </div>
);

export default JobSeekerProfile;
