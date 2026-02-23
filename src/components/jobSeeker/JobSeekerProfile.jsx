import { useEffect, useState, useContext } from "react";
import { getMyProfile, createOrUpdateProfile } from "../../api/JobSeekerApi";
import Loader from "../../components/common/Loader";
import { AuthContext } from "../../context/AuthContext";

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
  const { user } = useContext(AuthContext);
  const canEdit = user?.role === "JOB_SEEKER"; // 🔐 Role check

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
        <Loader fullScreen />
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
          <p className="text-red-500 text-center mb-4 font-medium">
            {error}
          </p>
        )}

        {/* 🔐 Only JOB_SEEKER can edit */}
        {(!profile || isEdit) && canEdit ? (
          <>
            <SectionTitle title="Personal Information" />
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Input
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Input
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <SectionTitle title="Professional Information" />
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Input
                name="currentCompany"
                label="Current Company"
                value={formData.currentCompany}
                onChange={handleChange}
              />
              <Input
                name="totalExperience"
                label="Total Experience"
                value={formData.totalExperience}
                onChange={handleChange}
              />
              <Input
                name="skills"
                label="Skills"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setFormData(profile);
                  setIsEdit(false);
                }}
                className="px-6 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <ProfileView
            profile={profile}
            onEdit={() => setIsEdit(true)}
            canEdit={canEdit}
          />
        )}
      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const SectionTitle = ({ title }) => (
  <h3 className="text-lg font-semibold text-gray-700 mb-4 border-l-4 border-blue-600 pl-3">
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
      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
    />
  </div>
);

const ViewField = ({ label, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
      {label}
    </p>
    <p className="font-medium text-gray-800">
      {value || "-"}
    </p>
  </div>
);

const ProfileView = ({ profile, onEdit, canEdit }) => (
  <div className="space-y-8">
    <SectionTitle title="Personal Information" />
    <div className="grid md:grid-cols-2 gap-6">
      <ViewField label="Full Name" value={profile?.fullName} />
      <ViewField label="Email" value={profile?.email} />
      <ViewField label="Skills" value={profile?.skills} />
    </div>

    {/* 🔐 Only show edit button if JOB_SEEKER */}
    {canEdit && (
      <div className="text-center mt-6">
        <button
          onClick={onEdit}
          className="px-10 py-3 bg-blue-600 text-white rounded-lg"
        >
          Edit Profile
        </button>
      </div>
    )}
  </div>
);

export default JobSeekerProfile;
