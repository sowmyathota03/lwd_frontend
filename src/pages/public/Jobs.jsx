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

/* ================= ANIMATION VARIANTS ================= */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

function Jobs() {
  const { type } = useParams();
  const [searchParamsUrl] = useSearchParams();

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

  return (
    <>
      <JobSearchBlock />

      {!isSearchMode && (
        <PopularJobs
          title="Popular Job Categories"
          categories={categories}
        />
      )}

      {/* Smooth page fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "linear-gradient(135deg, #e0f7fa, #c8e6c9)",
          padding: "30px",
          marginTop: "20px",
        }}
      >
        <h2 style={{ padding: "0 20px" }}>
          {companyIdParam
            ? `🏢 Company Jobs (${totalCount})`
            : isSearchMode
            ? `🔍 Search Results (${totalCount})`
            : type
            ? `${type.toUpperCase()} Jobs (${totalCount})`
            : `All Jobs (${totalCount})`}
        </h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* ================= PREMIUM ANIMATED GRID ================= */}

        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {jobs.map((job, index) => {
              const isLastItem = index === jobs.length - 1;

              return (
                <motion.div
                  key={job.id}
                  ref={isLastItem ? lastJobRef : null}
                  variants={cardVariants}
                  layout
                  exit={{ opacity: 0, y: -15 }}
                >
                  <JobCard job={job} />
                </motion.div>
              );
            })}
          </AnimatePresence>

          {initialLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <JobSkeleton key={`initial-${index}`} />
            ))}
        </motion.div>

        {loading && !initialLoading && <Loader />}

        {last && !initialLoading && (
          <p style={{ marginTop: "20px", textAlign: "center" }}>
            No more jobs.
          </p>
        )}
      </motion.div>
    </>
  );
}

export default Jobs;
