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

  // ===============================
  // URL PARAMS
  // ===============================
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

  // ===============================
  // JOB QUERY
  // ===============================
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

  // ===============================
  // INFINITE SCROLL
  // ===============================
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

  // ===============================
  // PAGINATION HANDLERS
  // ===============================
  const goToNextGroup = () => {
    setPageGroup((prev) => prev + 1);
  };

  const goToPrevGroup = () => {
    if (pageGroup > 0) setPageGroup((prev) => prev - 1);
  };

  const goToPage = (page) => {
    setPageGroup(page);
  };

  // ===============================
  // POPULAR JOB CATEGORIES
  // ===============================
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

  // ===============================
  // FILTER HANDLER
  // ===============================
  const handleFilterChange = (filters) => {

    const params = new URLSearchParams(searchParams);

    Object.keys(filters).forEach((key) => {
      if (filters[key]) params.set(key, filters[key]);
      else params.delete(key);
    });

    navigate(`/jobs?${params.toString()}`);

  };

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="mt-8 px-5 max-w-5xl mx-auto">
        <JobSearchBar />
      </div>

      {!isSearchMode && !type && categoriesData && (
        <div className="mt-6 px-5 max-w-7xl mx-auto">
          <PopularJobs
            title="Popular Job Categories"
            categories={categoriesData}
          />
        </div>
      )}

      <div
        className={`mt-4 px-5 max-w-4xl mx-auto grid grid-cols-1 ${
          showFilters ? "md:grid-cols-4" : "md:grid-cols-1"
        } gap-6`}
      >

        {showFilters && (
          <div>
            <JobFilters onFilterChange={handleFilterChange} />
          </div>
        )}

        <div className={showFilters ? "md:col-span-3" : "md:col-span-1"}>

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

            {infiniteEndReached && (
              <div className="flex justify-center items-center gap-3 mt-8">

                <button
                  onClick={goToPrevGroup}
                  disabled={pageGroup === 0}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>

                {[...Array(MAX_PAGES)].map((_, i) => {

                  const pageNumber = pageGroup * MAX_PAGES + i + 1;

                  return (
                    <button
                      key={i}
                      onClick={() => goToPage(pageGroup + i)}
                      className="px-3 py-2 rounded bg-gray-200"
                    >
                      {pageNumber}
                    </button>
                  );

                })}

                <button
                  onClick={goToNextGroup}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Next
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
