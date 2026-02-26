import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

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

/* ================= CLEAN PROFESSIONAL ANIMATION ================= */

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
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
    window.scrollTo({ top: 0, behavior: "instant" });
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
      if (last || loading) return;

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

        setTotalCount(data.totalElements || 0);

        if (!data.content || data.content.length === 0) {
          setLast(true);
          return;
        }

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
  ]);

  /* ================= PRODUCTION INFINITE SCROLL ================= */

  const lastJobRef = useCallback(
    (node) => {
      if (loading || last || initialLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prev) => prev + 1);
          }
        },
        {
          root: null,
          rootMargin: "200px",
          threshold: 0.1,
        }
      );

      if (node) observer.current.observe(node);
    },
    [loading, last, initialLoading]
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
        <div className="px-5 mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {titleText}
            <span className="text-gray-500 font-medium ml-2">
              ({totalCount})
            </span>
          </h2>
        </div>

        {error && (
          <p className="text-center text-red-500 font-medium mb-4">
            {error}
          </p>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 max-w-5xl mx-auto auto-rows-fr">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4 }}
            >
              <JobCard job={job} />
            </motion.div>
          ))}

          {initialLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <div key={`initial-${index}`}>
                <JobSkeleton />
              </div>
            ))}
        </div>

        {/* LOADER */}
        {loading && !initialLoading && (
          <div className="mt-6">
            <Loader fullScreen={false} />
          </div>
        )}

        {/* SENTINEL DIV (PRODUCTION FIX) */}
        {!last && !initialLoading && (
          <div ref={lastJobRef} className="h-10" />
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
