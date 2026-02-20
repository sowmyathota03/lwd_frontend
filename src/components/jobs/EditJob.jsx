import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../../api/JobApi";
import { AuthContext } from "../../context/AuthContext";

export default function EditJob() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    industry: "",
    minExperience: "",
    maxExperience: "",
    jobType: "",
    noticePreference: "",
    maxNoticePeriod: "",
    lwdPreferred: false,
  });

  useEffect(() => {
    if (state) {
      setFormData({
        ...state,
        salary: state.salary ?? "",
        minExperience: state.minExperience ?? "",
        maxExperience: state.maxExperience ?? "",
        maxNoticePeriod: state.maxNoticePeriod ?? "",
        lwdPreferred: state.lwdPreferred ?? false,
      });
    } else {
      fetchJob();
    }
  }, []);

  const fetchJob = async () => {
    try {
      const job = await getJobById(id);
      setFormData({
        ...job,
        salary: job.salary ?? "",
        minExperience: job.minExperience ?? "",
        maxExperience: job.maxExperience ?? "",
        maxNoticePeriod: job.maxNoticePeriod ?? "",
        lwdPreferred: job.lwdPreferred ?? false,
      });
    } catch (err) {
      alert("❌ Failed to load job");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      salary: formData.salary ? Number(formData.salary) : null,
      minExperience: formData.minExperience
        ? Number(formData.minExperience)
        : null,
      maxExperience: formData.maxExperience
        ? Number(formData.maxExperience)
        : null,
      maxNoticePeriod: formData.maxNoticePeriod
        ? Number(formData.maxNoticePeriod)
        : null,
    };

    try {
      await updateJob(id, payload);
      alert("✅ Job updated successfully");
      if (user?.role === "ADMIN") {
        navigate("/admin/managejob");
      } else if (user?.role === "RECRUITER") {
        navigate("/recruiter/managejob");
      } else if (user?.role === "RECRUITER_ADMIN") {
        navigate("/recruiter-admin/managejob");
      }else{
        navigate("/jobs");
      }

    } catch (err) {
      alert("❌ Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Update Job
        </h2>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          />
        </div>

        {/* Location & Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Industry & Job Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry <span className="text-red-500">*</span>
            </label>
            <input
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>
        </div>

        {/* Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Experience
            </label>
            <input
              type="number"
              name="minExperience"
              value={formData.minExperience}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Experience
            </label>
            <input
              type="number"
              name="maxExperience"
              value={formData.maxExperience}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Notice & LWD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notice Preference <span className="text-red-500">*</span>
            </label>
            <select
              name="noticePreference"
              value={formData.noticePreference}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="SERVING_NOTICE">Serving Notice</option>
              <option value="IMMEDIATE_JOINER">Immediate Joiner</option>
              <option value="NOT_SERVING">Not Serving</option>
              <option value="ANY">Any</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Notice Period (Days)
            </label>
            <input
              type="number"
              name="maxNoticePeriod"
              value={formData.maxNoticePeriod}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="lwdPreferred"
            checked={formData.lwdPreferred}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <label className="text-sm font-medium text-gray-700">
            LWD Preferred
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Update Job
        </button>
      </form>
    </div>
  );
}
