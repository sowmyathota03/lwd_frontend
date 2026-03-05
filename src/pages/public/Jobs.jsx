import { useRef, useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import JobCard from "../../components/jobs/JobCards";
import JobSearchBlock from "../../components/jobs/JobSearchBlock";
import PopularJobs from "../../components/jobs/PopularJobs";
import {
  getAllJobs,
  getJobsByIndustry,
  getJobsByCompany,
  getTopCategories,
  searchJobs,
} from "../../api/JobApi";
import JobSkeleton from "../../components/jobs/JobSkeleton";
import Loader from "../../components/common/Loader";

/* ================= ANIMATION ================= */

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

function Jobs() {
  const { type } = useParams();
  const [searchParamsUrl] = useSearchParams();
  const observer = useRef(null);

  /* ================= QUERY PARAMS ================= */

  const keywordParam = searchParamsUrl.get("keyword");
  const locationParam = searchParamsUrl.get("location");
  const companyParam = searchParamsUrl.get("companyName");
  const minExpParam = searchParamsUrl.get("minExp");
  const maxExpParam = searchParamsUrl.get("maxExp");
  const jobTypeParam = searchParamsUrl.get("jobType");
  const companyIdParam = searchParamsUrl.get("companyId");
  const noticePreferenceParam = searchParamsUrl.get("noticePreference");
  const lwdPreferredParam = searchParamsUrl.get("lwdPreferred");
  const industryParam = searchParamsUrl.get("industry");

  const isSearchMode =
    keywordParam ||
    locationParam ||
    companyParam ||
    minExpParam ||
    maxExpParam ||
    jobTypeParam ||
    noticePreferenceParam ||
    lwdPreferredParam ||
    industryParam ||
    companyIdParam;

  /* ================= INFINITE QUERY ================= */

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
      type,
      keywordParam,
      locationParam,
      companyParam,
      minExpParam,
      maxExpParam,
      jobTypeParam,
      noticePreferenceParam,
      lwdPreferredParam,
      industryParam,
      companyIdParam,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      let response;

      if (companyIdParam) {
        response = await getJobsByCompany(companyIdParam, pageParam);
      } else if (isSearchMode) {
        response = await searchJobs({
          keyword: keywordParam,
          location: locationParam,
          companyName: companyParam,
          minExp: minExpParam,
          maxExp: maxExpParam,
          jobType: jobTypeParam,
          noticePreference: noticePreferenceParam,
          lwdPreferred: lwdPreferredParam,
          industry: industryParam,
          page: pageParam,
        });
      } else if (type) {
        response = await getJobsByIndustry(type, pageParam);
      } else {
        response = await getAllJobs(pageParam);
      }

      return response.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.last) return undefined;
      return pages.length;
    },
    keepPreviousData: true,
  });

  /* ================= FLATTEN DATA ================= */

  const jobs = data?.pages.flatMap((page) => page.content) || [];
  const totalCount = data?.pages[0]?.totalElements || 0;

  /* ================= INFINITE SCROLL ================= */

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

  /* ================= FETCH CATEGORIES ================= */

  const { data: categoriesData } = useQuery({
    queryKey: ["topCategories"],
    queryFn: async () => {
      const response = await getTopCategories();
      return response.data.map((cat) => ({
        name: cat,
        slug: cat.toLowerCase(),
      }));
    },
    staleTime: 10 * 60 * 1000,
  });

  /* ================= TITLE ================= */

  const titleText = companyIdParam
    ? "🏢 Company Jobs"
    : isSearchMode
    ? "🔍 Search Results"
    : type
    ? `${type.toUpperCase()} Jobs`
    : "All Jobs";

  /* ================= RETURN ================= */

  return (
    <>
      <JobSearchBlock />

      {!isSearchMode && categoriesData && (
        <PopularJobs
          title="Popular Job Categories"
          categories={categoriesData}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-linear-to-br from-cyan-100 to-green-100 p-8 mt-5"
      >
        <div className="px-5 mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {titleText}
            <span className="text-gray-500 font-medium ml-2">
              ({totalCount})
            </span>
          </h2>
        </div>

        {isError && (
          <p className="text-center text-red-500 font-medium mb-4">
            Failed to load jobs.
          </p>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 max-w-5xl mx-auto auto-rows-fr">
          {jobs.map((job, index) => {
            if (index === jobs.length - 1) {
              return (
                <motion.div
                  ref={lastJobRef}
                  key={job.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -4 }}
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
                whileHover={{ y: -4 }}
              >
                <JobCard job={job} />
              </motion.div>
            );
          })}

          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <div key={`initial-${index}`}>
                <JobSkeleton />
              </div>
            ))}
        </div>

        {isFetchingNextPage && (
          <div className="mt-6">
            <Loader fullScreen={false} />
          </div>
        )}

        {!hasNextPage && !isLoading && (
          <p className="mt-8 text-center text-gray-500 font-medium">
            No more jobs.
          </p>
        )}
      </motion.div>
    </>
  );
}

export default Jobs;
