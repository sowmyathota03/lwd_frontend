import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../../api/JobApi";

export default function EditJob() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

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
    // ✅ New application fields
    applicationSource: "PORTAL",
    externalApplicationUrl: "",
  });

  useEffect(() => {
    if (state) {
      mapJobToForm(state);
    } else {
      fetchJob();
    }
  }, []);

  const mapJobToForm = (job) => {
    setFormData({
      title: job?.title ?? "",
      description: job?.description ?? "",
      location: job?.location ?? "",
      salary: job?.salary ?? "",
      industry: job?.industry ?? "",
      minExperience: job?.minExperience ?? "",
      maxExperience: job?.maxExperience ?? "",
      jobType: job?.jobType ?? "",
      noticePreference: job?.noticePreference ?? "",
      maxNoticePeriod: job?.maxNoticePeriod ?? "",
      lwdPreferred: job?.lwdPreferred ?? false,
      applicationSource: job?.applicationSource ?? "PORTAL",
      externalApplicationUrl: job?.externalApplicationUrl ?? "",
    });
  };

  const fetchJob = async () => {
    try {
      const job = await getJobById(id);
      mapJobToForm(job);
    } catch (err) {
      alert("❌ Failed to load job");
    }
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "number") {
      newValue = value === "" ? "" : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // ================= HANDLE UPDATE =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    // ✅ Validate external URL if needed
    if (formData.applicationSource === "EXTERNAL" && !formData.externalApplicationUrl.trim()) {
      alert("External URL is required for EXTERNAL application source");
      return;
    }

    const payload = {
      ...formData,
      salary: formData.salary !== "" ? Number(formData.salary) : null,
      minExperience: formData.minExperience !== "" ? Number(formData.minExperience) : null,
      maxExperience: formData.maxExperience !== "" ? Number(formData.maxExperience) : null,
      maxNoticePeriod: formData.maxNoticePeriod !== "" ? Number(formData.maxNoticePeriod) : null,
    };

    try {
      await updateJob(id, payload);
      alert("✅ Job updated successfully");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={handleUpdate} className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Update Job</h2>

        {/* Title */}
        <Input label="Job Title *" name="title" value={formData.title} handleChange={handleChange} required />

        {/* Description */}
        <Textarea label="Description" name="description" value={formData.description} handleChange={handleChange} />

        {/* Location & Salary */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Location *" name="location" value={formData.location} handleChange={handleChange} required />
          <Input label="Salary" name="salary" type="number" value={formData.salary} handleChange={handleChange} />
        </div>

        {/* Industry & Job Type */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Industry *" name="industry" value={formData.industry} handleChange={handleChange} required />
          <Select
            label="Job Type *"
            name="jobType"
            value={formData.jobType}
            handleChange={handleChange}
            options={["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT"]}
            required
          />
        </div>

        {/* Experience */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Min Experience (Years)" name="minExperience" type="number" value={formData.minExperience} handleChange={handleChange} />
          <Input label="Max Experience (Years)" name="maxExperience" type="number" value={formData.maxExperience} handleChange={handleChange} />
        </div>

        {/* Notice Preference & Max Notice Period */}
        <div className="grid md:grid-cols-2 gap-6">
          <Select
            label="Notice Preference"
            name="noticePreference"
            value={formData.noticePreference}
            handleChange={handleChange}
            options={["SERVING_NOTICE", "IMMEDIATE_JOINER", "NOT_SERVING", "ANY"]}
          />
          <Input label="Max Notice Period (Days)" name="maxNoticePeriod" type="number" value={formData.maxNoticePeriod} handleChange={handleChange} />
        </div>

        {/* LWD Preferred */}
        <div className="flex items-center gap-3">
          <input type="checkbox" name="lwdPreferred" checked={formData.lwdPreferred} onChange={handleChange} />
          <label className="text-sm font-medium">LWD Preferred</label>
        </div>

        {/* ================= APPLICATION SOURCE ================= */}
        <div className="grid md:grid-cols-2 gap-6">
          <Select
            label="Application Source"
            name="applicationSource"
            value={formData.applicationSource}
            handleChange={handleChange}
            options={["PORTAL", "EXTERNAL"]}
          />
          {formData.applicationSource === "EXTERNAL" && (
            <Input
              label="External Application URL"
              name="externalApplicationUrl"
              value={formData.externalApplicationUrl}
              handleChange={handleChange}
            />
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
          Update Job
        </button>
      </form>
    </div>
  );
}

/* ================= INPUT COMPONENT ================= */
function Input({ label, name, value, handleChange, type = "text", required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        className="w-full px-4 py-2 rounded-lg border"
      />
    </div>
  );
}

/* ================= SELECT COMPONENT ================= */
function Select({ label, name, value, handleChange, options, required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        className="w-full px-4 py-2 rounded-lg border"
      >
        <option value="">Select</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt.replace("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ================= TEXTAREA COMPONENT ================= */
function Textarea({ label, name, value, handleChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        rows="4"
        className="w-full px-4 py-2 rounded-lg border resize-none"
      />
    </div>
  );
}
