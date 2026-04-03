import React, { useState } from "react";
import { 
  Plus, 
  MapPin, 
  Building, 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function PostJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", formData);
    alert("Job protocol successfully initialized in the registry.");
    navigate("/admin/managejob");
  };

  return (
    <div className="lwd-page py-12 px-6">
      <div className="lwd-container max-w-4xl space-y-10">
        
        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="lwd-h1 text-slate-900">
            Post a <span className="text-blue-600">New Job</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-md mx-auto">
             Initialize a new professional listing to attract high-authority talent.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="lwd-card p-10 overflow-hidden relative">
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="lwd-label">Job Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Senior Software Engineer"
                    className="lwd-input h-12" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
               </div>
               <div className="space-y-2">
                  <label className="lwd-label">Company Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Acme Corp"
                    className="lwd-input h-12" 
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="lwd-label">Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. San Francisco, Remote"
                    className="lwd-input h-12" 
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
               </div>
               <div className="space-y-2">
                  <label className="lwd-label">Employment Type</label>
                  <select 
                    className="lwd-input h-12"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                     <option>Full-time</option>
                     <option>Part-time</option>
                     <option>Contract</option>
                     <option>Internship</option>
                  </select>
               </div>
            </div>

            <div className="space-y-2">
               <label className="lwd-label">Job Description</label>
               <textarea 
                 placeholder="Detail the role responsibilities and expectations..."
                 className="lwd-input min-h-[150px] py-4"
                 required
                 value={formData.description}
                 onChange={(e) => setFormData({...formData, description: e.target.value})}
               ></textarea>
            </div>

            <button 
              type="submit"
              className="lwd-btn-primary w-full py-5 text-base flex items-center justify-center gap-3"
            >
               <CheckCircle2 size={22} />
               Publish Job Listing
            </button>

          </form>
        </div>

        {/* GUIDELINES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="flex items-start gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <AlertCircle size={20} className="text-blue-600 shrink-0" />
              <div>
                 <p className="text-sm font-bold text-slate-800 dark:text-white">Accuracy</p>
                 <p className="text-xs font-medium text-slate-500">Ensure all details are professionally verified.</p>
              </div>
           </div>
           <div className="flex items-start gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <Clock size={20} className="text-blue-600 shrink-0" />
              <div>
                 <p className="text-sm font-bold text-slate-800 dark:text-white">Turnaround</p>
                 <p className="text-xs font-medium text-slate-500">Listings typically index within 4-6 hours.</p>
              </div>
           </div>
           <div className="flex items-start gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <Briefcase size={20} className="text-blue-600 shrink-0" />
              <div>
                 <p className="text-sm font-bold text-slate-800 dark:text-white">Compliance</p>
                 <p className="text-xs font-medium text-slate-500">All postings follow local administrative laws.</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

export default PostJob;
