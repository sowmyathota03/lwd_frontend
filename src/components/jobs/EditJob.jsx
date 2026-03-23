import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../../api/JobApi";
import { Input, Select, Textarea, Checkbox } from "./FormComponents";

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
      const res = await getJobById(id);
      mapJobToForm(res.data || res);
    } catch (err) {
      alert("❌ Failed to load job");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;
    if (type === "checkbox") newValue = checked;
    else if (type === "number") newValue = value === "" ? "" : Number(value);

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.applicationSource === "EXTERNAL" &&
      !formData.externalApplicationUrl.trim()
    ) {
      alert("External URL is required");
      return;
    }

    const payload = {
      ...formData,
      minSalary: formData.minSalary || null,
      maxSalary: formData.maxSalary || null,
      minExperience: formData.minExperience || null,
      maxExperience: formData.maxExperience || null,
      maxNoticePeriod: formData.maxNoticePeriod || null,
      ageLimit: formData.ageLimit || null,
    };

    try {
      await updateJob(id, payload);
      alert("✅ Job updated successfully");
      navigate(-1);
    } catch (err) {
      alert("❌ Update failed");
    }
  };

  return (
    <div className="lwd-page py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold lwd-title">
            Edit Job Posting
          </h1>
          <p className="lwd-text mt-1">
            Update the details of your job listing
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* JOB DETAILS */}
          <div className="lwd-card">
            <div className="lwd-section-header px-6 py-4">
              <h2 className="text-lg font-semibold lwd-title">
                Job Details
              </h2>
            </div>

            <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Input label="Job Title" name="title" value={formData.title} onChange={handleChange} required />
              <Input label="Location" name="location" value={formData.location} onChange={handleChange} required />
              <Select label="Job Type" name="jobType" value={formData.jobType} onChange={handleChange}
                options={["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT"]} />
              <Select label="Workplace Type" name="workplaceType" value={formData.workplaceType} onChange={handleChange}
                options={["Work From Office", "Remote", "Hybrid"]} />
              <Input label="Industry" name="industry" value={formData.industry} onChange={handleChange} />
              <Input label="Role Category" name="roleCategory" value={formData.roleCategory} onChange={handleChange} />
              <Input label="Department" name="department" value={formData.department} onChange={handleChange} />
            </div>
          </div>

          {/* COMPENSATION */}
          <div className="lwd-card">
            <div className="lwd-section-header px-6 py-4">
              <h2 className="text-lg font-semibold lwd-title">
                Compensation & Experience
              </h2>
            </div>

            <div className="p-6 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              <Input label="Min Salary" name="minSalary" type="number" value={formData.minSalary} onChange={handleChange} />
              <Input label="Max Salary" name="maxSalary" type="number" value={formData.maxSalary} onChange={handleChange} />
              <Input label="Min Experience" name="minExperience" type="number" value={formData.minExperience} onChange={handleChange} />
              <Input label="Max Experience" name="maxExperience" type="number" value={formData.maxExperience} onChange={handleChange} />
            </div>
          </div>

          {/* PREFERENCES */}
          <div className="lwd-card">
            <div className="lwd-section-header px-6 py-4">
              <h2 className="text-lg font-semibold lwd-title">
                Candidate Preferences
              </h2>
            </div>

            <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Input label="Education" name="education" value={formData.education} onChange={handleChange} />
              <Input label="Skills" name="skills" value={formData.skills} onChange={handleChange} />
              <Select label="Gender" name="genderPreference" value={formData.genderPreference} onChange={handleChange}
                options={["Any", "Male", "Female"]} />
              <Input label="Age Limit" name="ageLimit" type="number" value={formData.ageLimit} onChange={handleChange} />
              <Select label="Notice Preference" name="noticePreference" value={formData.noticePreference} onChange={handleChange}
                options={["SERVING_NOTICE", "IMMEDIATE_JOINER", "NOT_SERVING", "ANY"]} />
              <Input label="Max Notice" name="maxNoticePeriod" type="number" value={formData.maxNoticePeriod} onChange={handleChange} />
              <Checkbox label="LWD Preferred" name="lwdPreferred" checked={formData.lwdPreferred} onChange={handleChange} />
            </div>
          </div>

          {/* APPLICATION */}
          <div className="lwd-card">
            <div className="lwd-section-header px-6 py-4">
              <h2 className="text-lg font-semibold lwd-title">
                Application Settings
              </h2>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-5">
              <Select label="Application Source" name="applicationSource"
                value={formData.applicationSource} onChange={handleChange}
                options={["PORTAL", "EXTERNAL"]} />

              {formData.applicationSource === "EXTERNAL" && (
                <Input label="External URL" name="externalApplicationUrl"
                  value={formData.externalApplicationUrl}
                  onChange={handleChange} required />
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="lwd-card">
            <div className="lwd-section-header px-6 py-4">
              <h2 className="text-lg font-semibold lwd-title">
                Job Description
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />
              <Textarea label="Responsibilities" name="responsibilities" value={formData.responsibilities} onChange={handleChange} />
              <Textarea label="Requirements" name="requirements" value={formData.requirements} onChange={handleChange} />
              <Textarea label="Benefits" name="benefits" value={formData.benefits} onChange={handleChange} />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => navigate(-1)} className="lwd-btn-secondary">
              Cancel
            </button>

            <button type="submit" className="lwd-btn-primary">
              Update Job
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}