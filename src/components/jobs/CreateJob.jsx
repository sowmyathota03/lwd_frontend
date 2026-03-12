// CreateJob.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJobAsRecruiter } from "../../api/JobApi";
import { Input, Select, Textarea, Checkbox } from "./FormComponents";

// Heroicons (install via npm install @heroicons/react)
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  BuildingOfficeIcon,
  ClockIcon,
  AcademicCapIcon,
  UserGroupIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  TagIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

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
    noticePreference: "",        // Added missing field
    maxNoticePeriod: "",         // Added missing field
    lwdPreferred: false,         // Added missing field
    applicationSource: "PORTAL",
    externalApplicationUrl: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;
    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "number") {
      newValue = value === "" ? "" : Number(value);
    }

    setJob((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (job.applicationSource === "EXTERNAL" && !job.externalApplicationUrl.trim()) {
      alert("External URL is required for EXTERNAL application source");
      return;
    }

    const payload = {
      ...job,
      minSalary: job.minSalary !== "" ? Number(job.minSalary) : null,
      maxSalary: job.maxSalary !== "" ? Number(job.maxSalary) : null,
      minExperience: job.minExperience !== "" ? Number(job.minExperience) : null,
      maxExperience: job.maxExperience !== "" ? Number(job.maxExperience) : null,
      maxNoticePeriod: job.maxNoticePeriod !== "" ? Number(job.maxNoticePeriod) : null,
      ageLimit: job.ageLimit !== "" ? Number(job.ageLimit) : null,
    };

    try {
      await createJobAsRecruiter(payload);
      alert("Job created successfully");
      navigate("/recruiter/managejob");
    } catch (err) {
      console.error(err);
      alert("Failed to create job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <BriefcaseIcon className="h-8 w-8 text-blue-600" />
            Create New Job Posting
          </h1>
          <p className="text-gray-500 mt-1">
            Fill in the details below to publish a job opening
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ================= JOB DETAILS ================= */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-blue-600" />
                Job Details
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Input
                label="Job Title"
                name="title"
                value={job.title}
                onChange={handleChange}
                icon={<BriefcaseIcon className="h-5 w-5 text-gray-400" />}
                required
              />
              <Input
                label="Location"
                name="location"
                value={job.location}
                onChange={handleChange}
                icon={<MapPinIcon className="h-5 w-5 text-gray-400" />}
                required
              />
              <Select
                label="Job Type"
                name="jobType"
                value={job.jobType}
                onChange={handleChange}
                options={["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT"]}
                icon={<BriefcaseIcon className="h-5 w-5 text-gray-400" />}
                required
              />
              <Select
                label="Workplace Type"
                name="workplaceType"
                value={job.workplaceType}
                onChange={handleChange}
                options={["Work From Office", "Remote", "Hybrid"]}
                icon={<BuildingOfficeIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Industry"
                name="industry"
                value={job.industry}
                onChange={handleChange}
                icon={<BuildingOfficeIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Role Category"
                name="roleCategory"
                value={job.roleCategory}
                onChange={handleChange}
                icon={<TagIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Department"
                name="department"
                value={job.department}
                onChange={handleChange}
                icon={<BuildingOfficeIcon className="h-5 w-5 text-gray-400" />}
              />
            </div>
          </div>

          {/* ================= COMPENSATION ================= */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-linear-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <CurrencyRupeeIcon className="h-5 w-5 text-green-600" />
                Compensation & Experience
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <Input
                label="Min Salary (LPA)"
                name="minSalary"
                type="number"
                value={job.minSalary}
                onChange={handleChange}
                icon={<CurrencyRupeeIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Max Salary (LPA)"
                name="maxSalary"
                type="number"
                value={job.maxSalary}
                onChange={handleChange}
                icon={<CurrencyRupeeIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Min Experience (Yrs)"
                name="minExperience"
                type="number"
                value={job.minExperience}
                onChange={handleChange}
                icon={<ClockIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Max Experience (Yrs)"
                name="maxExperience"
                type="number"
                value={job.maxExperience}
                onChange={handleChange}
                icon={<ClockIcon className="h-5 w-5 text-gray-400" />}
              />
            </div>
          </div>

          {/* ================= CANDIDATE PREFERENCES ================= */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-linear-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <UserGroupIcon className="h-5 w-5 text-purple-600" />
                Candidate Preferences
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Input
                label="Education"
                name="education"
                value={job.education}
                onChange={handleChange}
                icon={<AcademicCapIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Skills (comma separated)"
                name="skills"
                value={job.skills}
                onChange={handleChange}
                icon={<WrenchScrewdriverIcon className="h-5 w-5 text-gray-400" />}
              />
              <Select
                label="Gender Preference"
                name="genderPreference"
                value={job.genderPreference}
                onChange={handleChange}
                options={["Any", "Male", "Female"]}
                icon={<UserGroupIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Age Limit"
                name="ageLimit"
                type="number"
                value={job.ageLimit}
                onChange={handleChange}
                icon={<ClockIcon className="h-5 w-5 text-gray-400" />}
              />
              <Select
                label="Notice Preference"
                name="noticePreference"
                value={job.noticePreference}
                onChange={handleChange}
                options={["SERVING_NOTICE", "IMMEDIATE_JOINER", "NOT_SERVING", "ANY"]}
                icon={<ClockIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Max Notice Period (Days)"
                name="maxNoticePeriod"
                type="number"
                value={job.maxNoticePeriod}
                onChange={handleChange}
                icon={<ClockIcon className="h-5 w-5 text-gray-400" />}
              />
              <Checkbox
                label="LWD Preferred"
                name="lwdPreferred"
                checked={job.lwdPreferred}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ================= APPLICATION SETTINGS ================= */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-linear-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <GlobeAltIcon className="h-5 w-5 text-amber-600" />
                Application Settings
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <Select
                label="Application Source"
                name="applicationSource"
                value={job.applicationSource}
                onChange={handleChange}
                options={["PORTAL", "EXTERNAL"]}
                icon={<GlobeAltIcon className="h-5 w-5 text-gray-400" />}
              />
              {job.applicationSource === "EXTERNAL" && (
                <Input
                  label="External Application URL"
                  name="externalApplicationUrl"
                  value={job.externalApplicationUrl}
                  onChange={handleChange}
                  icon={<GlobeAltIcon className="h-5 w-5 text-gray-400" />}
                  required
                />
              )}
            </div>
          </div>

          {/* ================= JOB DESCRIPTION ================= */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-linear-to-r from-gray-50 to-slate-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-gray-600" />
                Job Description
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <Textarea
                label="Description"
                name="description"
                value={job.description}
                onChange={handleChange}
                rows={4}
              />
              <Textarea
                label="Responsibilities"
                name="responsibilities"
                value={job.responsibilities}
                onChange={handleChange}
                rows={4}
              />
              <Textarea
                label="Requirements"
                name="requirements"
                value={job.requirements}
                onChange={handleChange}
                rows={4}
              />
              <Textarea
                label="Benefits"
                name="benefits"
                value={job.benefits}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition flex items-center gap-2"
            >
              <BriefcaseIcon className="h-5 w-5" />
              Publish Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
