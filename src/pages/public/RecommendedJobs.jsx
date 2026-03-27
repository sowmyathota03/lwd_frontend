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
    
    <div className="lwd-page p-6">
    
    <div className="min-h-screen max-w-6xl mx-auto">


      <div className="lwd-card p-8 ">

        <h2 className="lwd-title mb-6">
          Recommended Jobs ({totalCount})
        </h2>

        {isError && (
          <p className="text-red-500 text-center">
            Failed to load recommended jobs
          </p>
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
                >
                  <JobCard job={job} />
                </motion.div>
              );
            }
            
            return (
              <motion.div
                key={job.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <JobCard job={job} />
              </motion.div>
            );
          })}

          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <JobSkeleton key={i} />
            ))}
        </div>

        {isFetchingNextPage && <Loader />}

        {!hasNextPage && !isLoading && (
          <p className="lwd-text text-center mt-6">
            No more jobs
          </p>
        )}
      </div>
    </div>
    </div>
  );
}

export default RecommendedJobs;