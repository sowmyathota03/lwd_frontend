import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
import Loader from "../../components/jobs/Loader";

/* ================= PREMIUM ANIMATION VARIANTS ================= */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
};

function Jobs() {
  const { type } = useParams();
  const [searchParamsUrl] = useSearchParams();

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

  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const observer = useRef(null);

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

  /* ================= RESET ON FILTER CHANGE ================= */

  useEffect(() => {
    setJobs([]);
    setPage(0);
    setLast(false);
    setInitialLoading(true);
  }, [
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
  ]);

  /* ================= FETCH JOBS ================= */

  useEffect(() => {
    const fetchJobs = async () => {
      if (last) return;

      try {
        setLoading(true);
        setError(null);

        let response;

        if (companyIdParam) {
          response = await getJobsByCompany(companyIdParam, page);
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
            page,
          });
        } else if (type) {
          response = await getJobsByIndustry(type, page);
        } else {
          response = await getAllJobs(page);
        }

        const data = response.data;

        setTotalCount(data.totalElements);

        setJobs((prev) => {
          const newJobs = data.content.filter(
            (newJob) => !prev.some((existing) => existing.id === newJob.id)
          );
          return [...prev, ...newJobs];
        });

        setLast(data.last);
      } catch (err) {
        console.error(err);
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    fetchJobs();
  }, [
    page,
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
    last,
  ]);

  /* ================= INFINITE SCROLL ================= */

  const lastJobRef = useCallback(
    (node) => {
      if (loading || last) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prev) => prev + 1);
          }
        },
        { rootMargin: "300px" }
      );

      if (node) observer.current.observe(node);
    },
    [loading, last]
  );

  /* ================= FETCH CATEGORIES ================= */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getTopCategories();
        setCategories(
          response.data.map((cat) => ({
            name: cat,
            slug: cat.toLowerCase(),
          }))
        );
      } catch (err) {
        console.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  /* ================= TITLE + FILTER BADGES ================= */

  const titleText = companyIdParam
    ? "🏢 Company Jobs"
    : isSearchMode
    ? "🔍 Search Results"
    : type
    ? `${type.toUpperCase()} Jobs`
    : "All Jobs";

  const filters = [
    keywordParam && { label: `for ${keywordParam}`, color: "text-blue-600 bg-blue-50" },
    locationParam && { label: `in ${locationParam}`, color: "text-green-600 bg-green-50" },
    companyParam && { label: `at ${companyParam}`, color: "text-purple-600 bg-purple-50" },
    noticePreferenceParam && {
      label: noticePreferenceParam.replaceAll("_", " "),
      color: "text-red-600 bg-red-50",
    },
    lwdPreferredParam && {
      label: "LWD Preferred",
      color: "text-orange-600 bg-orange-50",
    },
    industryParam && {
      label: industryParam,
      color: "text-violet-600 bg-violet-50",
    },
  ].filter(Boolean);

  /* ================= RETURN ================= */

  return (
    <>
      <JobSearchBlock />

      {!isSearchMode && (
        <PopularJobs
          title="Popular Job Categories"
          categories={categories}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-linear-to-br from-cyan-100 to-green-100 p-8 mt-5"
      >
        {/* HEADER */}
        <div className="px-5 mb-8 flex items-center justify-center flex-wrap gap-2">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mt-1 flex-wrap">
            {titleText}
            <span className="text-gray-500 font-medium">
              ({totalCount})
            </span>
          </h2>

          {isSearchMode && filters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.map((filter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.06 }}
                  className={`text-2xl font-medium rounded-full ${filter.color}`}
                >
                  {filter.label}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        {error && (
          <p className="text-center text-red-500 font-medium mb-4">
            {error}
          </p>
        )}

        {/* PREMIUM GRID */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {jobs.map((job, index) => {
            const isLastItem = index === jobs.length - 1;

            return (
              <motion.div
                key={job.id}
                ref={isLastItem ? lastJobRef : null}
                variants={cardVariants}
                layout="position"
                whileHover={{ y: -6 }}
              >
                <JobCard job={job} />
              </motion.div>
            );
          })}

          {initialLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={`initial-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <JobSkeleton />
              </motion.div>
            ))}
        </motion.div>

        {loading && !initialLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            <Loader />
          </motion.div>
        )}

        {last && !initialLoading && (
          <p className="mt-8 text-center text-gray-500 font-medium">
            No more jobs.
          </p>
        )}
      </motion.div>
    </>
  );
}

export default Jobs;
