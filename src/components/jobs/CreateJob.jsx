import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BriefcaseIcon } from "lucide-react";
import { createJobAsRecruiter } from "../../api/JobApi";
import { Input, Checkbox, Textarea } from "../../components/profile/comman/Helpers";

// ================= SELECT =================
export const Select = ({ label, options = [], ...props }) => (
  <div>
    {label && (
      <label className="lwd-label mb-1 block">{label}</label>
    )}

    <select {...props} className="lwd-input">
      <option value="">Select {label}</option>

      {options.map((opt, index) => {
        const optionValue = typeof opt === "object" ? opt.value : opt;
        const optionLabel = typeof opt === "object" ? opt.label : opt;

        return (
          <option key={optionValue || index} value={optionValue}>
            {optionLabel}
          </option>
        );
      })}
    </select>
  </div>
);

export default function CreateJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    location: "",
    minSalary: "",
    maxSalary: "",
    industry: "",
    jobType: "",
    minExperience: "",
    maxExperience: "",
    roleCategory: "",
    department: "",
    workplaceType: "",
    education: "",
    skills: "",
    genderPreference: "",
    ageLimit: "",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    noticePreference: "",
    maxNoticePeriod: "",
    lwdPreferred: false,
    applicationSource: "PORTAL",
    externalApplicationUrl: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (type === "checkbox") newValue = checked;
    else if (type === "number") newValue = value === "" ? "" : Number(value);

    setJob((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      job.applicationSource === "EXTERNAL" &&
      !job.externalApplicationUrl.trim()
    ) {
      alert("External URL is required");
      return;
    }

    const payload = {
      ...job,
      minSalary: job.minSalary || null,
      maxSalary: job.maxSalary || null,
      minExperience: job.minExperience || null,
      maxExperience: job.maxExperience || null,
      maxNoticePeriod: job.maxNoticePeriod || null,
      ageLimit: job.ageLimit || null,
    };

    try {
      await createJobAsRecruiter(payload);
      alert("Job created successfully");
      navigate("/recruiter/managejob");
    } catch {
      alert("Failed to create job");
    }
  };

  return (
    <div className="lwd-page py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2 lwd-title">
            <BriefcaseIcon className="h-8 w-8 text-blue-600" />
            Create New Job Posting
          </h1>
          <p className="lwd-text mt-1">
            Fill in the details below to publish a job opening
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* JOB DETAILS */}
          <div className="lwd-card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="lwd-title flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-blue-600" />
                Job Details
              </h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              <div>
                <label className="block font-medium">Job Title</label>
                <input type="text" name="title" value={job.title} onChange={handleChange} required className="border p-2 rounded w-full" />
              </div>

              <div>
                <label className="block font-medium">Location</label>
                <input type="text" name="location" value={job.location} onChange={handleChange} required className="border p-2 rounded w-full" />
              </div>

              <div>
                <label className="block font-medium">Job Type</label>
                <select name="jobType" value={job.jobType} onChange={handleChange} className="border p-2 rounded w-full">
                  <option value="">Select Job Type</option>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="CONTRACT">Contract</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Workplace Type</label>
                <select name="workplaceType" value={job.workplaceType} onChange={handleChange} className="border p-2 rounded w-full">
                  <option value="">Select Workplace Type</option>
                  <option value="Work From Office">Work From Office</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Industry</label>
                <input type="text" name="industry" value={job.industry} onChange={handleChange} className="border p-2 rounded w-full" />
              </div>

              <div>
                <label className="block font-medium">Department</label>
                <input type="text" name="department" value={job.department} onChange={handleChange} className="border p-2 rounded w-full" />
              </div>

            </div>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2">
              <BriefcaseIcon className="h-5 w-5" />
              Publish Job
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}