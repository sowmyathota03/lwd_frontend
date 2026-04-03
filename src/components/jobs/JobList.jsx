import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllJobs } from "../../api/JobApi";
import JobCards from "./JobCards";
import JobSkeleton from "./JobSkeleton";
import { ChevronLeft, ChevronRight, Inbox, Sparkles, FolderSearch } from "lucide-react";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const jobsPerPage = 6;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Artificial delay for premium loading feel if needed, but here we stay responsive
        const response = await getAllJobs(currentPage, jobsPerPage);
        const data = response.data;
        setJobs(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    // Smooth scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage + 1 < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      
      {/* Feed Header Meta */}
      <div className="flex items-center justify-between px-2">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
               <Sparkles size={16} />
            </div>
            <div>
               <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Active Registry</h2>
               <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Real-time opportunity synchronization</p>
            </div>
         </div>
         {totalPages > 0 && (
           <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-800">
              Page {currentPage + 1} <span className="text-slate-200 dark:text-slate-800 mx-1">/</span> {totalPages}
           </div>
         )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3, 4].map((i) => <JobSkeleton key={i} />)}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6"
          >
            {jobs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="lwd-card-glass p-20 flex flex-col items-center justify-center text-center space-y-4 border-dashed"
              >
                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-700 flex items-center justify-center mb-2">
                   <FolderSearch size={32} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-widest text-slate-400">Zero Registries Found</h3>
                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest max-w-xs mx-auto">
                   No opportunities currently match your synchronization parameters.
                </p>
              </motion.div>
            ) : (
              jobs.map((job) => <JobCards key={job.id} job={job} />)
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Modern Pagination Suite */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 pt-10 border-t border-slate-100 dark:border-slate-800/50">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`
              flex items-center gap-2 px-6 h-12 rounded-xl transition-all duration-300 border font-black text-[9px] uppercase tracking-widest
              ${currentPage === 0 
                ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-50" 
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-white border-slate-100 dark:border-slate-800 hover:border-blue-500/30 hover:text-blue-600 hover:shadow-lg"
              }
            `}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="flex items-center gap-2">
             {[...Array(totalPages)].map((_, i) => (
               <button
                 key={i}
                 onClick={() => setCurrentPage(i)}
                 className={`
                   w-10 h-10 rounded-xl text-[10px] font-black transition-all duration-300
                   ${currentPage === i 
                     ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-110" 
                     : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                   }
                 `}
               >
                 {i + 1}
               </button>
             )).slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 3))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage + 1 >= totalPages}
            className={`
              flex items-center gap-2 px-6 h-12 rounded-xl transition-all duration-300 border font-black text-[9px] uppercase tracking-widest
              ${currentPage + 1 >= totalPages 
                ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-50" 
                : "bg-black dark:bg-blue-600 text-white border-transparent hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
              }
            `}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default JobList;