import { useRef, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import JobCard from "../../components/jobs/JobCards";
import JobSearchBar from "../../components/jobs/JobSearchBar";
import JobFilters from "../../components/jobs/JobFilters";
import PopularJobs from "../../components/jobs/PopularJobs";

import {
  getAllJobs,
  getJobsByIndustry,
  getTopCategories,
  searchJobs,
} from "../../api/JobApi";

import JobSkeleton from "../../components/jobs/JobSkeleton";
import Loader from "../../components/common/Loader";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function Jobs() {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const observer = useRef(null);

  // Read params directly from URL
  const keyword = searchParams.get("keyword") || "";
  const location = searchParams.get("location") || "";
  const companyName = searchParams.get("companyName") || "";
  const minExp = searchParams.get("minExp") || "";
  const maxExp = searchParams.get("maxExp") || "";
  const jobType = searchParams.get("jobType") || "";
  const industry = searchParams.get("industry") || "";
  const noticeStatus = searchParams.get("noticeStatus") || "";
  const lwdPreferred = searchParams.get("lwdPreferred") === "true";

  const isSearchMode =
    keyword ||
    location ||
    companyName ||
    minExp ||
    maxExp ||
    jobType ||
    industry ||
    noticeStatus ||
    lwdPreferred ||
    type;

  // Infinite Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: [
      "jobs",
      keyword,
      location,
      companyName,
      minExp,
      maxExp,
      jobType,
      industry,
      noticeStatus,
      lwdPreferred,
      type,
    ],

    queryFn: async ({ pageParam = 0 }) => {
      if (isSearchMode) {
        const response = await searchJobs({
          keyword,
          location,
          companyName,
          minExp,
          maxExp,
          jobType,
          industry,
          noticeStatus,
          lwdPreferred,
          page: pageParam,
        });

        return response.data;
      }

      if (type) {
        const response = await getJobsByIndustry(type, pageParam);
        return response.data;
      }

      const response = await getAllJobs(pageParam);
      return response.data;
    },

    getNextPageParam: (lastPage, pages) =>
      lastPage.last ? undefined : pages.length,
  });

  const jobs = data?.pages.flatMap((p) => p.content) || [];
  const totalCount = data?.pages[0]?.totalElements || 0;

  // Infinite scroll
  const lastJobRef = useCallback(
    (node) => {
      if (isFetchingNextPage || !hasNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  // Popular categories
  const { data: categoriesData } = useQuery({
    queryKey: ["topCategories"],
    queryFn: async () => {
      const response = await getTopCategories();
      return response.data.map((cat) => ({
        name: cat,
        slug: cat.toLowerCase(),
      }));
    },
  });

  const titleText = isSearchMode
    ? "Search Results"
    : type
    ? `${type.toUpperCase()} Jobs`
    : "All Jobs";

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Search Bar */}
      <div className="mt-8 px-5 max-w-5xl mx-auto">
        <JobSearchBar />
      </div>

      {/* Popular Jobs */}
      {!isSearchMode && categoriesData && (
        <div className="mt-6 px-5 max-w-7xl mx-auto">
          <PopularJobs
            title="Popular Job Categories"
            categories={categoriesData}
          />
        </div>
      )}

      {/* Jobs + Filters */}
      {isSearchMode && (
        <div className="mt-6 px-5 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Filters */}
          <div>
            <JobFilters />
          </div>

          {/* Jobs */}
          <div className="md:col-span-3">

            <div className="bg-white p-6 rounded-xl shadow-md">

              <h2 className="text-2xl font-bold mb-6">
                {titleText} ({totalCount})
              </h2>

              {isError && (
                <p className="text-red-500 text-center">
                  Failed to load jobs
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
                <p className="text-center mt-6 text-gray-500">
                  No more jobs
                </p>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;