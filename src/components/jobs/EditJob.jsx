import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  ArrowLeft,
  CheckCircle2
} from "lucide-react";
import { getJobById, updateJob } from "../../api/JobApi";
import { Input, Select, Textarea, Checkbox } from "./FormComponents";
import { motion } from "framer-motion";

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

  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const res = await getJobById(id);
      mapJobToForm(res.data || res);
    } catch (err) {
      alert("Failed to load job");
    } finally {
      setLoading(false);
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

    setLoading(true);

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
      alert("Job updated successfully");
      navigate(-1);
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
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
            Edit <span className="text-blue-600">Job Listing</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
             Refine the details of your job listing to ensure it attracts the right candidates.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* JOB CORE IDENTITY */}
          <motion.div variants={itemVariants} className="lwd-card p-0 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3 text-left">
               <Briefcase size={20} className="text-blue-600" />
               <h2 className="text-lg font-bold text-slate-800 dark:text-white">Job Identity</h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
               <Input label="Job Title" name="title" value={formData.title} onChange={handleChange} required icon={ChevronRight} />
               <Input label="Location" name="location" value={formData.location} onChange={handleChange} required icon={MapPin} />
               <Select label="Job Type" name="jobType" value={formData.jobType} onChange={handleChange} icon={Clock}
                 options={["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT"]} />
               <Select label="Workplace" name="workplaceType" value={formData.workplaceType} onChange={handleChange} icon={Globe}
                 options={["Work From Office", "Remote", "Hybrid"]} />
               <Input label="Industry" name="industry" value={formData.industry} onChange={handleChange} icon={Building} />
               <Input label="Role Category" name="roleCategory" value={formData.roleCategory} onChange={handleChange} icon={Settings} />
               <Input label="Department" name="department" value={formData.department} onChange={handleChange} icon={Settings} />
            </div>
          </motion.div>

          {/* COMPENSATION & SCALE */}
          <motion.div variants={itemVariants} className="lwd-card p-0 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3 text-left">
               <Banknote size={20} className="text-blue-600" />
               <h2 className="text-lg font-bold text-slate-800 dark:text-white">Compensation & Experience</h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
               <Input label="Min Salary" name="minSalary" type="number" value={formData.minSalary} onChange={handleChange} />
               <Input label="Max Salary" name="maxSalary" type="number" value={formData.maxSalary} onChange={handleChange} />
               <Input label="Min Exp (Yrs)" name="minExperience" type="number" value={formData.minExperience} onChange={handleChange} />
               <Input label="Max Exp (Yrs)" name="maxExperience" type="number" value={formData.maxExperience} onChange={handleChange} />
            </div>
          </motion.div>

          {/* PREFERENCES UNIT */}
          <motion.div variants={itemVariants} className="lwd-card p-0 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3 text-left">
               <UserCheck size={20} className="text-blue-600" />
               <h2 className="text-lg font-bold text-slate-800 dark:text-white">Requirements & Preferences</h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
               <Input label="Education" name="education" value={formData.education} onChange={handleChange} icon={GraduationCap} />
               <Input label="Skills" name="skills" value={formData.skills} onChange={handleChange} icon={History} />
               <Select label="Gender" name="genderPreference" value={formData.genderPreference} onChange={handleChange}
                 options={["Any", "Male", "Female"]} />
               <Input label="Age Limit" name="ageLimit" type="number" value={formData.ageLimit} onChange={handleChange} />
               <Select label="Notice Preference" name="noticePreference" value={formData.noticePreference} onChange={handleChange}
                 options={["SERVING_NOTICE", "IMMEDIATE_JOINER", "NOT_SERVING", "ANY"]} />
               <Input label="Max Notice" name="maxNoticePeriod" type="number" value={formData.maxNoticePeriod} onChange={handleChange} />
            </div>
            
            <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/20 border-t border-slate-200 dark:border-slate-800">
               <Checkbox label="LWD Preferred Listing" name="lwdPreferred" checked={formData.lwdPreferred} onChange={handleChange} />
            </div>
          </motion.div>

          {/* APPLICATION PROTOCOL */}
          <motion.div variants={itemVariants} className="lwd-card p-0 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3 text-left">
               <Rocket size={20} className="text-blue-600" />
               <h2 className="text-lg font-bold text-slate-800 dark:text-white">Application Options</h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
               <Select label="Application Source" name="applicationSource" value={formData.applicationSource} onChange={handleChange}
                 options={["PORTAL", "EXTERNAL"]} />

               {formData.applicationSource === "EXTERNAL" && (
                 <Input label="External Target URL" name="externalApplicationUrl" value={formData.externalApplicationUrl} onChange={handleChange} required />
               )}
            </div>
          </motion.div>

          {/* NARRATIVE UNIT */}
          <motion.div variants={itemVariants} className="lwd-card p-0 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3 text-left">
               <FileText size={20} className="text-blue-600" />
               <h2 className="text-lg font-bold text-slate-800 dark:text-white">Job Description & Details</h2>
            </div>

            <div className="p-8 space-y-6 text-left">
               <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />
               <Textarea label="Responsibilities" name="responsibilities" value={formData.responsibilities} onChange={handleChange} />
               <Textarea label="Requirements" name="requirements" value={formData.requirements} onChange={handleChange} />
               <Textarea label="Benefits" name="benefits" value={formData.benefits} onChange={handleChange} />
            </div>
          </motion.div>

          {/* ACTION UNIT */}
          <motion.div variants={itemVariants} className="flex justify-between items-center pt-6">
            <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors group/back">
               <ArrowLeft size={16} className="group-hover/back:-translate-x-1 transition-transform" />
               Cancel Changes
            </button>

            <button 
              type="submit" 
              disabled={loading}
              className={`
                lwd-btn-primary px-12 h-14 flex items-center gap-3 transition-all duration-300
                ${loading ? "opacity-70 cursor-wait" : ""}
              `}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                   <div className="w-5 h-5 border-t-2 border-l-2 border-current rounded-full animate-spin"></div>
                   <span>Updating...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                   <CheckCircle2 size={20} />
                   <span>Save Changes</span>
                </div>
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