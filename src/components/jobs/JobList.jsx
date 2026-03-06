import { useState, useEffect } from "react";
import JobCards from "./JobCards";
import { getAllJobs } from "../../api/JobApi"; // <- use your API

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const jobsPerPage = 6; // default size

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await getAllJobs(currentPage, jobsPerPage);
        // API returns { content: [...], totalPages, totalElements, last }
        const data = response.data; // axios returns inside data
        setJobs(data.content || []);
        setTotalPages(data.totalPages || 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
        setTotalPages(0);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage + 1 < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p className="text-center mt-10">Loading jobs...</p>;

  return (
    <div className="max-w-4xl mx-auto px-5 py-6 flex flex-col gap-4">
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found</p>
      ) : (
        jobs.map((job) => <JobCards key={job.id} job={job} />)
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage + 1 >= totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default JobList;