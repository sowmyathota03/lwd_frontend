import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Building,
  Banknote,
  Settings,
  Rocket,
  ChevronRight,
  Clock,
  Globe,
  Sparkles,
  CheckCircle2,
  FileText,
  GraduationCap,
  UserCheck,
} from "lucide-react";
import { createJobAsRecruiter } from "../../api/JobApi";
import { motion } from "framer-motion";

// ================= SELECT =================
export const Select = ({
  label,
  options = [],
  icon: Icon,
  required = false,
  ...props
}) => (
  <div className="space-y-2 text-left">
    {label && (
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} className="text-blue-600" />}
        <label className="lwd-label">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      </div>
    )}

    <select
      {...props}
      required={required}
      className="lwd-input h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-blue-500/10 px-4 font-medium"
    >
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

// ================= INPUT =================
const FormInput = ({ label, icon: Icon, required = false, ...props }) => (
  <div className="space-y-2 text-left">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={14} className="text-blue-600" />}
      <label className="lwd-label">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
    </div>
    <input {...props} className={`lwd-input h-12 ${props.className || ""}`} />
  </div>
);

// ================= TEXTAREA =================
const FormTextarea = ({ label, icon: Icon, rows = 5, ...props }) => (
  <div className="space-y-2 text-left">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={14} className="text-blue-600" />}
      <label className="lwd-label">{label}</label>
    </div>
    <textarea
      {...props}
      rows={rows}
      className="lwd-input min-h-30 py-3 resize-y"
    />
  </div>
);

export default function CreateJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    industry: "",

    minSalary: "",
    maxSalary: "",

    roleCategory: "",
    department: "",
    workplaceType: "",
    education: "",
    skills: "",
    genderPreference: "",
    ageLimit: "",

    responsibilities: "",
    requirements: "",
    benefits: "",

    minExperience: "",
    maxExperience: "",
    jobType: "",

    noticePreference: "",
    maxNoticePeriod: "",
    lwdPreferred: false,

    applicationSource: "PORTAL",
    externalApplicationUrl: "",

    expiresAt: "",
  });

  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;
    if (type === "checkbox") newValue = checked;
    if (type === "number") newValue = value === "" ? "" : Number(value);

    setJob((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      job.applicationSource === "EXTERNAL" &&
      !job.externalApplicationUrl.trim()
    ) {
      alert("External application URL is required");
      return;
    }

    const payload = {
      ...job,
      minSalary: job.minSalary || null,
      maxSalary: job.maxSalary || null,
      minExperience: job.minExperience || null,
      maxExperience: job.maxExperience || null,
      ageLimit: job.ageLimit || null,
      maxNoticePeriod: job.maxNoticePeriod || null,
      expiresAt: job.expiresAt || null,
      externalApplicationUrl:
        job.applicationSource === "EXTERNAL"
          ? job.externalApplicationUrl
          : null,
    };

    try {
      setLoading(true);
      await createJobAsRecruiter(payload);
      alert("Job created successfully");
      navigate("/recruiter/managejob");
    } catch (error) {
      console.error(error);
      alert("Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lwd-page py-12 px-4 sm:px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl space-y-8"
      >
        <motion.div variants={itemVariants} className="text-center space-y-3">
          <h1 className="lwd-h1 text-slate-900 dark:text-white">
            Post a <span className="text-blue-600">New Job</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Fill in the details below to publish a new job listing on the LWD portal.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* JOB DETAILS */}
          <motion.div variants={itemVariants} className="lwd-card p-0 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
              <Briefcase size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                Job Details
              </h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormInput
                label="Job Title"
                name="title"
                value={job.title}
                onChange={handleChange}
                required
                placeholder="e.g. Senior Backend Engineer"
                icon={ChevronRight}
              />

              <FormInput
                label="Location"
                name="location"
                value={job.location}
                onChange={handleChange}
                required
                placeholder="e.g. Bangalore, KA"
                icon={MapPin}
              />

              <FormInput
                label="Industry"
                name="industry"
                value={job.industry}
                onChange={handleChange}
                required
                placeholder="e.g. Software Development"
                icon={Building}
              />

              <FormInput
                label="Role Category"
                name="roleCategory"
                value={job.roleCategory}
                onChange={handleChange}
                required
                placeholder="e.g. Backend Developer"
                icon={Settings}
              />

              <FormInput
                label="Department"
                name="department"
                value={job.department}
                onChange={handleChange}
                placeholder="e.g. Engineering"
                icon={Building}
              />

              <Select
                label="Job Type"
                name="jobType"
                value={job.jobType}
                onChange={handleChange}
                icon={Clock}
                options={[
                  { value: "FULL_TIME", label: "Full Time" },
                  { value: "PART_TIME", label: "Part Time" },
                  { value: "INTERNSHIP", label: "Internship" },
                  { value: "CONTRACT", label: "Contract" },
                  { value: "REMOTE", label: "Remote" },
                ]}
              />

              <Select
                label="Workplace Type"
                name="workplaceType"
                value={job.workplaceType}
                onChange={handleChange}
                icon={Globe}
                required
                options={[
                  { value: "ONSITE", label: "Onsite" },
                  { value: "REMOTE", label: "Remote" },
                  { value: "HYBRID", label: "Hybrid" },
                ]}
              />

              <FormInput
                label="Education"
                name="education"
                value={job.education}
                onChange={handleChange}
                placeholder="e.g. B.E / B.Tech / MCA"
                icon={GraduationCap}
              />

              <FormInput
                label="Gender Preference"
                name="genderPreference"
                value={job.genderPreference}
                onChange={handleChange}
                placeholder="Optional"
                icon={UserCheck}
              />

              <FormInput
                label="Age Limit"
                name="ageLimit"
                type="number"
                value={job.ageLimit}
                onChange={handleChange}
                placeholder="e.g. 30"
                icon={UserCheck}
              />
            </div>

            <div className="px-8 pb-8">
              <FormTextarea
                label="Description"
                name="description"
                value={job.description}
                onChange={handleChange}
                placeholder="Write job summary and overview..."
                icon={FileText}
              />
            </div>
          </motion.div>

          {/* SALARY & EXPERIENCE */}
          <motion.div variants={itemVariants} className="lwd-card p-0 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
              <Banknote size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                Compensation & Experience
              </h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FormInput
                label="Min Salary"
                name="minSalary"
                type="number"
                value={job.minSalary}
                onChange={handleChange}
                placeholder="0"
                className="text-emerald-600 tabular-nums"
              />

              <FormInput
                label="Max Salary"
                name="maxSalary"
                type="number"
                value={job.maxSalary}
                onChange={handleChange}
                placeholder="0"
                className="text-emerald-600 tabular-nums"
              />

              <FormInput
                label="Min Experience (Yrs)"
                name="minExperience"
                type="number"
                value={job.minExperience}
                onChange={handleChange}
                placeholder="0"
                className="tabular-nums"
              />

              <FormInput
                label="Max Experience (Yrs)"
                name="maxExperience"
                type="number"
                value={job.maxExperience}
                onChange={handleChange}
                placeholder="0"
                className="tabular-nums"
              />
            </div>
          </motion.div>

          {/* APPLICATION OPTIONS */}
          <motion.div variants={itemVariants} className="lwd-card p-0 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
              <Rocket size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                Application Options
              </h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Select
                label="Application Source"
                name="applicationSource"
                value={job.applicationSource}
                onChange={handleChange}
                icon={Rocket}
                required
                options={[
                  { value: "PORTAL", label: "Portal" },
                  { value: "EXTERNAL", label: "External" },
                ]}
              />

              <FormInput
                label="Expires At"
                name="expiresAt"
                type="datetime-local"
                value={job.expiresAt}
                onChange={handleChange}
                icon={Clock}
              />

              {job.applicationSource === "EXTERNAL" && (
                <FormInput
                  label="External Website URL"
                  name="externalApplicationUrl"
                  type="url"
                  value={job.externalApplicationUrl}
                  onChange={handleChange}
                  required
                  placeholder="https://company.com/careers/job-123"
                  icon={Globe}
                  className="text-blue-600"
                />
              )}
            </div>
          </motion.div>

          {/* LWD PREFERENCES */}
          <motion.div variants={itemVariants} className="lwd-card p-0 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
              <Sparkles size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                LWD Preferences
              </h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Select
                label="Notice Preference"
                name="noticePreference"
                value={job.noticePreference}
                onChange={handleChange}
                icon={Clock}
                required
                options={[
                  { value: "IMMEDIATE_JOINER", label: "Immediate Joiner" },
                  { value: "NOT_LOOKING", label: "Not Looking" },
                  { value: "OPEN_TO_WORK", label: "Open To Work" },
                  { value: "SERVING_NOTICE", label: "Serving Notice" },
                  { value: "NOT_SERVING", label: "Not Serving" },
                  { value: "ANY", label: "Any" },
                ]}
              />

              <FormInput
                label="Max Notice Period (Days)"
                name="maxNoticePeriod"
                type="number"
                value={job.maxNoticePeriod}
                onChange={handleChange}
                placeholder="e.g. 30"
                icon={Clock}
              />

              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-blue-600" />
                  <label className="lwd-label">LWD Preferred</label>
                </div>
                <label className="flex items-center gap-3 h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer">
                  <input
                    type="checkbox"
                    name="lwdPreferred"
                    checked={job.lwdPreferred}
                    onChange={handleChange}
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Prioritize LWD-focused candidates
                  </span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* CONTENT */}
          <motion.div variants={itemVariants} className="lwd-card p-0 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
              <FileText size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                Responsibilities, Requirements & Benefits
              </h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormTextarea
                label="Skills"
                name="skills"
                value={job.skills}
                onChange={handleChange}
                placeholder="e.g. Java, Spring Boot, MySQL"
                icon={Sparkles}
              />

              <FormTextarea
                label="Responsibilities"
                name="responsibilities"
                value={job.responsibilities}
                onChange={handleChange}
                placeholder="List main job responsibilities..."
                icon={Briefcase}
              />

              <FormTextarea
                label="Requirements"
                name="requirements"
                value={job.requirements}
                onChange={handleChange}
                placeholder="List job requirements..."
                icon={Settings}
              />

              <FormTextarea
                label="Benefits"
                name="benefits"
                value={job.benefits}
                onChange={handleChange}
                placeholder="Mention salary perks, insurance, WFH, bonus..."
                icon={CheckCircle2}
              />
            </div>
          </motion.div>

          {/* SUBMIT */}
          <motion.div variants={itemVariants} className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`lwd-btn-primary px-12 h-14 flex items-center gap-3 transition-all duration-300 ${
                loading ? "opacity-70 cursor-wait" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publishing Job...
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  Publish Job Listing
                </>
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

const Loader2 = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);