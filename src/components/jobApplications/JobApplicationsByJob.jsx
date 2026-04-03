import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApplicationsByJobId } from "../../api/JobApplicationApi";
import Loader from "../common/Loader";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Users,
  ArrowUpRight,
  ClipboardList,
  CheckCircle2
} from "lucide-react";

export default function JobApplicationsByJob({ jobId }) {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await getApplicationsByJobId(jobId, page, size);
      const data = res.data;
      setApplications(data.applications || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchApplications();
  }, [jobId, page]);

  if (!jobId) return null;
  if (loading) return <Loader message="Loading applications..." />;

  const getStatusBadge = (status) => {
    const base = "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border";
    switch (status) {
      case "SELECTED":   return `${base} bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800`;
      case "REJECTED":   return `${base} bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800`;
      case "HIRED":      return `${base} bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800`;
      default:           return `${base} bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800`;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="lwd-card p-0 overflow-hidden">

      {/* HEADER */}
      <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
              <ClipboardList size={20} />
           </div>
           <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                All Applicants
              </h2>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {totalElements} {totalElements === 1 ? "application" : "applications"} received
              </p>
           </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Live</span>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
            <tr>
              <th className="px-6 py-3 text-left">
                 <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-400">
                    <User size={12} /> Name
                 </div>
              </th>
              <th className="px-6 py-3 text-left">
                 <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-400">
                    <Mail size={12} /> Email
                 </div>
              </th>
              <th className="px-6 py-3 text-left">
                 <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-400">
                    <Phone size={12} /> Phone
                 </div>
              </th>
              <th className="px-6 py-3 text-left">
                 <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-400">
                    <CheckCircle2 size={12} /> Status
                 </div>
              </th>
              <th className="px-6 py-3 text-left">
                 <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-400">
                    <Calendar size={12} /> Applied On
                 </div>
              </th>
              <th className="px-6 py-3 text-left">
                 <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Actions
                 </div>
              </th>
            </tr>
          </thead>

          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-slate-100 dark:divide-slate-800"
          >
            <AnimatePresence mode="popLayout">
              {applications.length === 0 ? (
                <motion.tr variants={rowVariants}>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                       <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-300">
                          <Users size={28} />
                       </div>
                       <p className="text-sm font-bold text-slate-400">No applications received yet</p>
                    </div>
                  </td>
                </motion.tr>
              ) : (
                applications.map((app) => (
                  <motion.tr
                    key={app.applicationId}
                    variants={rowVariants}
                    className="hover:bg-blue-50/30 dark:hover:bg-blue-500/5 transition-all duration-200 group/row"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      {app.jobSeekerId ? (
                        <button
                          onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                          className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white group-hover/row:text-blue-600 transition-colors"
                        >
                          {app.applicantName || "Unknown Applicant"}
                          <ArrowUpRight size={13} className="opacity-0 group-hover/row:opacity-100 transition-all" />
                        </button>
                      ) : (
                        <span className="text-sm font-semibold text-slate-500">{app.applicantName || "Unknown Applicant"}</span>
                      )}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {app.email || "—"}
                       </span>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          {app.phone || "—"}
                       </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(app.status)}>
                        {app.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {app.appliedAt
                            ? new Date(app.appliedAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                            : "—"}
                       </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ApplicationStatusDropdown
                        applicationId={app.applicationId}
                        currentStatus={app.status}
                        onStatusUpdated={(id, newStatus) => {
                          setApplications((prev) =>
                            prev.map((a) =>
                              a.applicationId === id
                                ? { ...a, status: newStatus }
                                : a
                            )
                          );
                        }}
                      />
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20 flex flex-col md:flex-row justify-between items-center gap-3">
           <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Page <span className="text-slate-900 dark:text-white font-bold">{page + 1}</span> of {totalPages}
           </p>
           
           <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 0}
                className="lwd-btn-secondary px-4 h-9 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                <ChevronLeft size={15} />
                Previous
              </button>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page + 1 >= totalPages}
                className="lwd-btn-secondary px-4 h-9 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                Next
                <ChevronRight size={15} />
              </button>
           </div>
        </div>
      )}
    </div>
  );
}