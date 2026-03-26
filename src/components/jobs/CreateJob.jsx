import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { createJobAsRecruiter } from "../../api/JobApi";
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

    if (job.applicationSource === "EXTERNAL" && !job.externalApplicationUrl.trim()) {
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

          {/* CARD */}
          <div className="lwd-card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="lwd-title flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-blue-600" />
                Job Details
              </h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Input label="Job Title" name="title" value={job.title} onChange={handleChange} required />
              <Input label="Location" name="location" value={job.location} onChange={handleChange} required />
              <Select label="Job Type" name="jobType" value={job.jobType} onChange={handleChange} options={["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT"]} />
              <Select label="Workplace Type" name="workplaceType" value={job.workplaceType} onChange={handleChange} options={["Work From Office", "Remote", "Hybrid"]} />
              <Input label="Industry" name="industry" value={job.industry} onChange={handleChange} />
              <Input label="Department" name="department" value={job.department} onChange={handleChange} />
            </div>
          </div>

          {/* COMPENSATION */}
          <div className="lwd-card p-6">
            <h2 className="lwd-title mb-4">Compensation & Experience</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <Input label="Min Salary" name="minSalary" type="number" value={job.minSalary} onChange={handleChange} />
              <Input label="Max Salary" name="maxSalary" type="number" value={job.maxSalary} onChange={handleChange} />
              <Input label="Min Exp" name="minExperience" type="number" value={job.minExperience} onChange={handleChange} />
              <Input label="Max Exp" name="maxExperience" type="number" value={job.maxExperience} onChange={handleChange} />
            </div>
          </div>

          {/* PREFERENCES */}
          <div className="lwd-card p-6">
            <h2 className="lwd-title mb-4">Candidate Preferences</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Input label="Education" name="education" value={job.education} onChange={handleChange} />
              <Input label="Skills" name="skills" value={job.skills} onChange={handleChange} />
              <Select label="Gender" name="genderPreference" value={job.genderPreference} onChange={handleChange} options={["Any", "Male", "Female"]} />
              <Input label="Age Limit" name="ageLimit" type="number" value={job.ageLimit} onChange={handleChange} />
              <Select label="Notice" name="noticePreference" value={job.noticePreference} onChange={handleChange} options={["ANY", "IMMEDIATE_JOINER"]} />
              <Checkbox label="LWD Preferred" name="lwdPreferred" checked={job.lwdPreferred} onChange={handleChange} />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="lwd-card p-6">
            <h2 className="lwd-title mb-4">Job Description</h2>

            <div className="space-y-4">
              <Textarea label="Description" name="description" value={job.description} onChange={handleChange} />
              <Textarea label="Responsibilities" name="responsibilities" value={job.responsibilities} onChange={handleChange} />
              <Textarea label="Requirements" name="requirements" value={job.requirements} onChange={handleChange} />
              <Textarea label="Benefits" name="benefits" value={job.benefits} onChange={handleChange} />
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end">
            <button type="submit" className="lwd-btn-primary flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5" />
              Publish Job
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}