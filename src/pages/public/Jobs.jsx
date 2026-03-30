import { useRef, useCallback, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [pageGroup, setPageGroup] = useState(0);
  const MAX_PAGES = 5;

  // URL params
  const keyword = searchParams.get("keyword") || "";
  const location = searchParams.get("location") || "";
  const companyName = searchParams.get("companyName") || "";
  const minExp = searchParams.get("minExp") || "";
  const maxExp = searchParams.get("maxExp") || "";
  const jobType = searchParams.get("jobType") || "";
  const industry = searchParams.get("industry") || "";
  const noticeStatus = searchParams.get("noticeStatus") || "";
  const lwdPreferred = searchParams.get("lwdPreferred") === "true";

  const isSearchMode = Boolean(
    keyword ||
    location ||
    companyName ||
    minExp ||
    maxExp ||
    jobType ||
    industry ||
    noticeStatus ||
    lwdPreferred
  );

  const showFilters = isSearchMode || type;

  // JOB QUERY
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
      pageGroup,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const apiPage = pageParam + pageGroup * MAX_PAGES;

      if (isSearchMode) {
        const filters = {};
        if (keyword) filters.keyword = keyword;
        if (location) filters.location = location;
        if (companyName) filters.companyName = companyName;
        if (minExp) filters.minExp = minExp;
        if (maxExp) filters.maxExp = maxExp;
        if (jobType) filters.jobType = jobType;
        if (industry) filters.industry = industry;
        if (noticeStatus) filters.noticeStatus = noticeStatus;
        if (lwdPreferred) filters.lwdPreferred = true;

        filters.page = apiPage;
        const response = await searchJobs(filters);
        return response.data;
      }

      if (type) {
        const response = await getJobsByIndustry(type, apiPage);
        return response.data;
      }

      const response = await getAllJobs(apiPage);
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
  const infiniteEndReached = data?.pages?.length >= MAX_PAGES;

  // Infinite scroll
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

  const goToNextGroup = () => setPageGroup((prev) => prev + 1);
  const goToPrevGroup = () => pageGroup > 0 && setPageGroup((prev) => prev - 1);
  const goToPage = (page) => setPageGroup(page);

  // categories
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

  const handleFilterChange = (filters) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(filters).forEach((key) => {
      if (filters[key]) params.set(key, filters[key]);
      else params.delete(key);
    });
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-12 pb-24 font-sans transition-colors duration-300">

      {/* SEARCH */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-4 md:p-6 transition-all duration-300 hover:shadow-md">
          <JobSearchBar />
        </div>
      </div>

      {/* POPULAR */}
      {!isSearchMode && !type && categoriesData && (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-6 md:p-8">
            <PopularJobs
              title="Popular Job Categories"
              categories={categoriesData}
            />
          </div>
        </div>
      )}

      {/* MAIN */}
      <div className={`px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid ${showFilters ? "md:grid-cols-4 lg:grid-cols-12" : "grid-cols-1"} gap-8 items-start`}>
        
        {/* FILTERS SIDEBAR */}
        {showFilters && (
          <div className="md:col-span-1 lg:col-span-3 lg:sticky lg:top-28">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-5 md:p-6 transition-all duration-300 hover:shadow-md">
              <JobFilters onFilterChange={handleFilterChange} />
            </div>
          </div>
        )}

        {/* JOBS LIST */}
        <div className={showFilters ? "md:col-span-3 lg:col-span-9" : "w-full"}>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 px-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {titleText}
              </h2>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                {totalCount} {totalCount === 1 ? 'Opportunity' : 'Opportunities'} Found
              </p>
            </div>
          </div>

          {isError && (
            <div className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 p-6 rounded-2xl text-center border border-red-100 dark:border-red-800/50 mb-8 font-medium">
              Failed to load jobs. Please try checking your connection and refreshing.
            </div>
          )}

          <div className="space-y-5">
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
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-600/50 transition-all duration-300 overflow-hidden">
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
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-600/50 transition-all duration-300 overflow-hidden">
                    <JobCard job={job} />
                  </div>
                </motion.div>
              );
            })}

            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
                  <JobSkeleton />
                </div>
              ))}
          </div>

          {isFetchingNextPage && (
            <div className="flex justify-center my-10">
              <Loader />
            </div>
          )}

          {!hasNextPage && !isLoading && jobs.length > 0 && (
            <div className="text-center mt-12 mb-8">
              <div className="inline-flex items-center justify-center space-x-2 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-6 py-2.5 rounded-full text-sm font-semibold border border-slate-200 dark:border-slate-700">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span>You've seen all available jobs</span>
              </div>
            </div>
          )}

          {/* PAGINATION */}
          {infiniteEndReached && (
            <div className="flex justify-center flex-wrap items-center gap-2 mt-12 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 w-fit mx-auto">
              <button
                onClick={goToPrevGroup}
                disabled={pageGroup === 0}
                className="px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Prev
              </button>

              <div className="flex gap-1">
                {[...Array(MAX_PAGES)].map((_, i) => {
                  const pageNumber = pageGroup * MAX_PAGES + i + 1;
                  return (
                    <button
                      key={i}
                      onClick={() => goToPage(pageGroup + i)}
                      className="min-w-[40px] h-10 px-2 rounded-xl text-center font-bold text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-white transition-all duration-200"
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={goToNextGroup}
                className="px-5 py-2.5 rounded-xl font-bold bg-blue-50 text-blue-700 border border-blue-200/50 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/50 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:hover:text-white transition-all duration-300 shadow-sm"
              >
                Next
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Jobs;