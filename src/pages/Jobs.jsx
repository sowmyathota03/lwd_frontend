import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import JobCard from "../components/jobs/JobCards";
import JobSearchBlock from "../components/jobs/JobSearchBlock";
import PopularJobs from "../components/jobs/PopularJobs";
import {
  getAllJobs,
  getJobsByIndustry,
  getTopCategories,
  searchJobs,
} from "../api/JobApi";
import JobSkeleton from "../components/jobs/JobSkeleton";
import Loader from "../components/jobs/Loader";

function Jobs() {
  const { type } = useParams();
  const [searchParamsUrl] = useSearchParams();

  // ================= READ QUERY PARAMS =================
  const keywordParam = searchParamsUrl.get("keyword");
  const locationParam = searchParamsUrl.get("location");
  const companyParam = searchParamsUrl.get("companyName");
  const minExpParam = searchParamsUrl.get("minExp");
  const maxExpParam = searchParamsUrl.get("maxExp");
  const jobTypeParam = searchParamsUrl.get("jobType");

  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const observer = useRef(null);

  // ================= RESET WHEN FILTERS CHANGE =================
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
  ]);

  // ================= FETCH JOBS =================
  useEffect(() => {
    const fetchJobs = async () => {
      if (last) return;

      try {
        setLoading(true);
        setError(null);

        let response;

        const isSearchMode =
          keywordParam ||
          locationParam ||
          companyParam ||
          minExpParam ||
          maxExpParam ||
          jobTypeParam;

        if (isSearchMode) {
          response = await searchJobs({
            keyword: keywordParam,
            location: locationParam,
            companyName: companyParam,
            minExp: minExpParam,
            maxExp: maxExpParam,
            jobType: jobTypeParam,
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
    last,
  ]);

  // ================= INFINITE SCROLL =================
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

  // ================= FETCH CATEGORIES =================
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

  const isSearchMode =
    keywordParam ||
    locationParam ||
    companyParam ||
    jobTypeParam;

  return (
    <>
      <JobSearchBlock />

      {/* Hide categories during search */}
      {!isSearchMode && (
        <PopularJobs
          title="Popular Job Categories"
          categories={categories}
        />
      )}

      <div style={{ 
          background: "linear-gradient(135deg, #e0f7fa, #c8e6c9)", // light gradient\
          padding: "30px", marginTop: "20px"
        }}>
        <h2 style={{ padding: "0 20px" }}>
          {isSearchMode ? (
            <>
              🔍 Search Results ({totalCount})
              {keywordParam && (
                <>
                  {" "}for{" "}
                  <span style={{ color: "#2563eb" }}>
                    {keywordParam}
                  </span>
                </>
              )}
              {locationParam && (
                <>
                  {" "}in{" "}
                  <span style={{ color: "#16a34a" }}>
                    {locationParam}
                  </span>
                </>
              )}
              {companyParam && (
                <>
                  {" "}at{" "}
                  <span style={{ color: "#9333ea" }}>
                    {companyParam}
                  </span>
                </>
              )}
            </>
          ) : type ? (
            `${type.toUpperCase()} Jobs (${totalCount})`
          ) : (
            `All Jobs (${totalCount})`
          )}
        </h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* ================= JOB GRID ================= */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
            gap: "20px",
            flexWrap: "wrap",
            padding: "20px",
            borderRadius: "12px",
            maxWidth: "1000px", margin: "0 auto"
          }}
        >
          {jobs.map((job, index) => {
            const isLastItem = index === jobs.length - 1;

            return (
              <div
                key={job.id}
                ref={isLastItem ? lastJobRef : null}
              >
                <JobCard
                  job={{
                    ...job,
                    company: job.company?.companyName,
                    experience: `${job.minExperience || 0} - ${
                      job.maxExperience || 0
                    } Years`,
                  }}
                />
              </div>
            );
          })}

          {/* Initial Skeleton */}
          {initialLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <JobSkeleton key={`initial-${index}`} />
            ))}
            </div>

        {/* Loading Spinner */}
        {loading && !initialLoading && <Loader />}

        {/* No More Jobs */}
        {last && !initialLoading && (
          <p style={{ marginTop: "20px", textAlign: "center" }}>
            No more jobs.
          </p>
        )}
      </div>
    </>
  );
}

export default Jobs;
