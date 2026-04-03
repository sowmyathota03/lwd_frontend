import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, 
  MapPin, 
  Building, 
  Banknote, 
  History, 
  GraduationCap, 
  UserCheck, 
  Settings, 
  FileText,
  Rocket,
  ChevronRight,
  Clock,
  Globe,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { createJobAsRecruiter } from "../../api/JobApi";
import { Input, Checkbox, Textarea } from "../../components/profile/comman/Helpers";
import { motion } from "framer-motion";

// ================= SELECT =================
export const Select = ({ label, options = [], icon: Icon, ...props }) => (
  <div className="space-y-2 group/input text-left">
    {label && (
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} className="text-blue-600" />}
        <label className="lwd-label">{label}</label>
      </div>
    )}

    <select {...props} className="lwd-input h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-blue-500/10 px-4 font-bold">
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

  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

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

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lwd-page py-16 px-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl space-y-10"
      >
        
        {/* HEADING SECTION */}
        <motion.div variants={itemVariants} className="text-center space-y-3">
          <h1 className="lwd-h1 text-slate-900">
            Post a <span className="text-blue-600">New Job</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
             Fill in the details below to publish a new job listing on the LWD portal.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* JOB CORE IDENTITY */}
          <motion.div variants={itemVariants} className="lwd-card p-0 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
               <Briefcase size={20} className="text-blue-600" />
               <h2 className="text-lg font-bold text-slate-800 dark:text-white">Job Details</h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
               <div className="space-y-2 group/input">
                 <div className="flex items-center gap-2">
                   <ChevronRight size={14} className="text-blue-600" />
                   <label className="lwd-label">Job Title <span className="text-rose-500">*</span></label>
                 </div>
                 <input type="text" name="title" value={job.title} onChange={handleChange} required className="lwd-input h-12" placeholder="e.g. Senior Backend Engineer" />
               </div>

               <div className="space-y-2 group/input">
                 <div className="flex items-center gap-2">
                   <MapPin size={14} className="text-blue-600" />
                   <label className="lwd-label">Location <span className="text-rose-500">*</span></label>
                 </div>
                 <input type="text" name="location" value={job.location} onChange={handleChange} required className="lwd-input h-12" placeholder="e.g. Bangalore, KA" />
               </div>

               <Select label="Job Type" name="jobType" value={job.jobType} onChange={handleChange} icon={Clock}
                 options={[
                   { value: "FULL_TIME", label: "Full Time" },
                   { value: "PART_TIME", label: "Part Time" },
                   { value: "INTERNSHIP", label: "Internship" },
                   { value: "CONTRACT", label: "Contract" }
                 ]} 
               />

               <Select label="Workplace" name="workplaceType" value={job.workplaceType} onChange={handleChange} icon={Globe}
                 options={["Work From Office", "Remote", "Hybrid"]} 
               />

               <div className="space-y-2 group/input">
                 <div className="flex items-center gap-2">
                   <Building size={14} className="text-blue-600" />
                   <label className="lwd-label">Industry</label>
                 </div>
                 <input type="text" name="industry" value={job.industry} onChange={handleChange} className="lwd-input h-12" placeholder="e.g. Software Development" />
               </div>

               <div className="space-y-2 group/input">
                 <div className="flex items-center gap-2">
                   <Settings size={14} className="text-blue-600" />
                   <label className="lwd-label">Department</label>
                 </div>
                 <input type="text" name="department" value={job.department} onChange={handleChange} className="lwd-input h-12" placeholder="e.g. Engineering" />
               </div>
            </div>
          </motion.div>

          {/* COMPENSATION & SCALE */}
          <motion.div variants={itemVariants} className="lwd-card p-0 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
               <Banknote size={20} className="text-blue-600" />
               <h2 className="text-lg font-bold text-slate-800 dark:text-white">Compensation & Experience</h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
               <div className="space-y-2 group/input">
                 <label className="lwd-label">Min Salary</label>
                 <input type="number" name="minSalary" value={job.minSalary} onChange={handleChange} className="lwd-input h-12 text-emerald-600 tabular-nums" placeholder="0" />
               </div>
               <div className="space-y-2 group/input">
                 <label className="lwd-label">Max Salary</label>
                 <input type="number" name="maxSalary" value={job.maxSalary} onChange={handleChange} className="lwd-input h-12 text-emerald-600 tabular-nums" placeholder="0" />
               </div>
               <div className="space-y-2 group/input">
                 <label className="lwd-label">Min Exp (Yrs)</label>
                 <input type="number" name="minExperience" value={job.minExperience} onChange={handleChange} className="lwd-input h-12 tabular-nums" placeholder="0" />
               </div>
               <div className="space-y-2 group/input">
                 <label className="lwd-label">Max Exp (Yrs)</label>
                 <input type="number" name="maxExperience" value={job.maxExperience} onChange={handleChange} className="lwd-input h-12 tabular-nums" placeholder="0" />
               </div>
            </div>
          </motion.div>

          {/* APPLICATION PROTOCOL */}
          <motion.div variants={itemVariants} className="lwd-card p-0 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
               <Rocket size={20} className="text-blue-600" />
               <h2 className="text-lg font-bold text-slate-800 dark:text-white">Application Options</h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
               <Select label="Application Source" name="applicationSource" value={job.applicationSource} onChange={handleChange} icon={Settings}
                 options={["PORTAL", "EXTERNAL"]} 
               />

               {job.applicationSource === "EXTERNAL" && (
                 <div className="space-y-2 group/input">
                    <label className="lwd-label">External Website URL <span className="text-rose-500">*</span></label>
                    <input type="url" name="externalApplicationUrl" value={job.externalApplicationUrl} onChange={handleChange} required className="lwd-input h-12 text-blue-600" placeholder="https://company.com/careers/job-123" />
                 </div>
               )}
            </div>
          </motion.div>

          {/* SUBMIT UNIT */}
          <motion.div variants={itemVariants} className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className={`
                lwd-btn-primary px-12 h-14 flex items-center gap-3 transition-all duration-300
                ${loading ? "opacity-70 cursor-wait" : ""}
              `}
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
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);