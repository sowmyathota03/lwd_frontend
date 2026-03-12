// EditJob.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../../api/JobApi";
import { Input, Select, Textarea, Checkbox } from "./FormComponents";

// Heroicons
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
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function EditJob() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      location: job?.location ?? "",
      minSalary: job?.minSalary ?? "",
      maxSalary: job?.maxSalary ?? "",
      industry: job?.industry ?? "",
      jobType: job?.jobType ?? "",
      minExperience: job?.minExperience ?? "",
      maxExperience: job?.maxExperience ?? "",
      roleCategory: job?.roleCategory ?? "",
      department: job?.department ?? "",
      workplaceType: job?.workplaceType ?? "",
      education: job?.education ?? "",
      skills: job?.skills ?? "",
      genderPreference: job?.genderPreference ?? "",
      ageLimit: job?.ageLimit ?? "",
      description: job?.description ?? "",
      responsibilities: job?.responsibilities ?? "",
      requirements: job?.requirements ?? "",
      benefits: job?.benefits ?? "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.applicationSource === "EXTERNAL" && !formData.externalApplicationUrl.trim()) {
      alert("External URL is required for EXTERNAL application source");
      return;
    }

    const payload = {
      ...formData,
      minSalary: formData.minSalary !== "" ? Number(formData.minSalary) : null,
      maxSalary: formData.maxSalary !== "" ? Number(formData.maxSalary) : null,
      minExperience: formData.minExperience !== "" ? Number(formData.minExperience) : null,
      maxExperience: formData.maxExperience !== "" ? Number(formData.maxExperience) : null,
      maxNoticePeriod: formData.maxNoticePeriod !== "" ? Number(formData.maxNoticePeriod) : null,
      ageLimit: formData.ageLimit !== "" ? Number(formData.ageLimit) : null,
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <PencilSquareIcon className="h-8 w-8 text-blue-600" />
            Edit Job Posting
          </h1>
          <p className="text-gray-500 mt-1">Update the details of your job listing</p>
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
                value={formData.title}
                onChange={handleChange}
                icon={<BriefcaseIcon className="h-5 w-5 text-gray-400" />}
                required
              />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                icon={<MapPinIcon className="h-5 w-5 text-gray-400" />}
                required
              />
              <Select
                label="Job Type"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                options={["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT"]}
                icon={<BriefcaseIcon className="h-5 w-5 text-gray-400" />}
                required
              />
              <Select
                label="Workplace Type"
                name="workplaceType"
                value={formData.workplaceType}
                onChange={handleChange}
                options={["Work From Office", "Remote", "Hybrid"]}
                icon={<BuildingOfficeIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                icon={<BuildingOfficeIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Role Category"
                name="roleCategory"
                value={formData.roleCategory}
                onChange={handleChange}
                icon={<TagIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Department"
                name="department"
                value={formData.department}
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
                value={formData.minSalary}
                onChange={handleChange}
                icon={<CurrencyRupeeIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Max Salary (LPA)"
                name="maxSalary"
                type="number"
                value={formData.maxSalary}
                onChange={handleChange}
                icon={<CurrencyRupeeIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Min Experience (Yrs)"
                name="minExperience"
                type="number"
                value={formData.minExperience}
                onChange={handleChange}
                icon={<ClockIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Max Experience (Yrs)"
                name="maxExperience"
                type="number"
                value={formData.maxExperience}
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
                value={formData.education}
                onChange={handleChange}
                icon={<AcademicCapIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Skills (comma separated)"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                icon={<WrenchScrewdriverIcon className="h-5 w-5 text-gray-400" />}
              />
              <Select
                label="Gender Preference"
                name="genderPreference"
                value={formData.genderPreference}
                onChange={handleChange}
                options={["Any", "Male", "Female"]}
                icon={<UserGroupIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Age Limit"
                name="ageLimit"
                type="number"
                value={formData.ageLimit}
                onChange={handleChange}
                icon={<ClockIcon className="h-5 w-5 text-gray-400" />}
              />
              <Select
                label="Notice Preference"
                name="noticePreference"
                value={formData.noticePreference}
                onChange={handleChange}
                options={["SERVING_NOTICE", "IMMEDIATE_JOINER", "NOT_SERVING", "ANY"]}
                icon={<ClockIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Max Notice Period (Days)"
                name="maxNoticePeriod"
                type="number"
                value={formData.maxNoticePeriod}
                onChange={handleChange}
                icon={<ClockIcon className="h-5 w-5 text-gray-400" />}
              />
              <Checkbox
                label="LWD Preferred"
                name="lwdPreferred"
                checked={formData.lwdPreferred}
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
                value={formData.applicationSource}
                onChange={handleChange}
                options={["PORTAL", "EXTERNAL"]}
                icon={<GlobeAltIcon className="h-5 w-5 text-gray-400" />}
              />
              {formData.applicationSource === "EXTERNAL" && (
                <Input
                  label="External Application URL"
                  name="externalApplicationUrl"
                  value={formData.externalApplicationUrl}
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
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
              <Textarea
                label="Responsibilities"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows={4}
              />
              <Textarea
                label="Requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
              />
              <Textarea
                label="Benefits"
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition flex items-center gap-2"
            >
              <PencilSquareIcon className="h-5 w-5" />
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reuse the same Input, Select, Textarea, Checkbox components from CreateJob
// (You can place them in a separate file or duplicate here)