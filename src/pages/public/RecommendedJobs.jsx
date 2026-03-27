import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";

import JobCard from "../../components/jobs/JobCards";
import JobSkeleton from "../../components/jobs/JobSkeleton";
import Loader from "../../components/common/Loader";

import { getRecommendedJobs } from "../../api/JobApi";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function RecommendedJobs() {
  const observer = useRef(null);
  const MAX_PAGES = 5;

  // 🔥 FETCH RECOMMENDED JOBS
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["recommendedJobs"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getRecommendedJobs(pageParam);
      return response.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.last) return undefined;
      if (pages.length >= MAX_PAGES) return undefined;
      return pages.length;
    },
  });

  const jobs = data?.pages.flatMap((p) => p.content) || [];
  const totalCount = data?.pages?.[0]?.totalElements || 0;

  // 🔁 Infinite scroll
  const lastJobRef = useCallback(
    (node) => {
      if (isFetchingNextPage || !hasNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <section className="text-center mb-10">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-sm font-bold tracking-wide uppercase shadow-sm mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>
            Personalized For You
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
            Recommended <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Jobs</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Based on your profile skills, experience, and interests.
          </p>
        </section>

        {/* Content Wrapper */}
        <div className="w-full">
          
          <div className="flex items-center justify-between mb-8 px-2 border-b border-slate-200 dark:border-slate-700/60 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Top Matches
            </h2>
            <span className="text-sm font-bold bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">
              {totalCount} Opportunities
            </span>
          </div>

          {isError && (
            <div className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 p-6 rounded-2xl text-center border border-red-100 dark:border-red-800/50 mb-8 font-medium shadow-sm">
              <svg className="w-6 h-6 mx-auto mb-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Failed to load recommended jobs. Please try refreshing.
            </div>
          )}

          <div className="space-y-6">
            {jobs.map((job, index) => {
              if (index === jobs.length - 1) {
                return (
                  <motion.div
                    ref={lastJobRef}
                    key={job.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="group"
                  >
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-600/50 transition-all duration-300 overflow-hidden">
                      <JobCard job={job} />
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={job.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="group"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-600/50 transition-all duration-300 overflow-hidden">
                    <JobCard job={job} />
                  </div>
                </motion.div>
              );
            })}

            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
                  <JobSkeleton />
                </div>
              ))}
          </div>

          {!isLoading && jobs.length === 0 && !isError && (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">No recommendations yet</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Update your profile with more skills and experience to get better job matches.
              </p>
            </div>
          )}

          {isFetchingNextPage && (
            <div className="flex justify-center my-10">
              <Loader />
            </div>
          )}

          {!hasNextPage && !isLoading && jobs.length > 0 && (
            <div className="text-center mt-12">
              <div className="inline-flex items-center justify-center space-x-2 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-6 py-2.5 rounded-full text-sm font-semibold border border-slate-200 dark:border-slate-700">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>You've seen all recommendations</span>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default RecommendedJobs;