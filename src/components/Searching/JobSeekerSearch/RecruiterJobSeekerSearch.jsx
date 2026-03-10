import { useState, useEffect } from "react";
import { searchJobSeekers } from "../../../api/JobSeekerApi";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import JobSeekerResults from "./JobSeekerResults";

function RecruiterJobSeekerSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    skills: searchParams.get("skills") || "",
    currentLocation: searchParams.get("currentLocation") || "",
    preferredLocation: searchParams.get("preferredLocation") || "",
    minExperience: searchParams.get("minExperience") || "",
    maxExperience: searchParams.get("maxExperience") || "",
    minExpectedCTC: searchParams.get("minExpectedCTC") || "",
    maxExpectedCTC: searchParams.get("maxExpectedCTC") || "",
    noticeStatus: searchParams.get("noticeStatus") || "",
    maxNoticePeriod: searchParams.get("maxNoticePeriod") || "",
    immediateJoiner: searchParams.get("immediateJoiner") || "",
    page: Number(searchParams.get("page")) || 0,
    size: 10,
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);

  /* =========================
     Handle Input Change
  ========================= */

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     Search API Call
  ========================= */

  const handleSearch = async (updatedFilters = filters) => {
    try {
      setLoading(true);

      /* Update URL Params */

      setSearchParams({
        keyword: updatedFilters.keyword || "",
        skills: updatedFilters.skills || "",
        currentLocation: updatedFilters.currentLocation || "",
        preferredLocation: updatedFilters.preferredLocation || "",
        minExperience: updatedFilters.minExperience || "",
        maxExperience: updatedFilters.maxExperience || "",
        minExpectedCTC: updatedFilters.minExpectedCTC || "",
        maxExpectedCTC: updatedFilters.maxExpectedCTC || "",
        noticeStatus: updatedFilters.noticeStatus || "",
        maxNoticePeriod: updatedFilters.maxNoticePeriod || "",
        immediateJoiner: updatedFilters.immediateJoiner || "",
        page: updatedFilters.page || 0,
      });

      /* Request Body */

      const requestBody = {
        keyword: updatedFilters.keyword || null,

        skills: updatedFilters.skills
          ? updatedFilters.skills.split(",").map((s) => s.trim())
          : [],

        currentLocation: updatedFilters.currentLocation || null,

        preferredLocation: updatedFilters.preferredLocation || null,

        minExperience: updatedFilters.minExperience
          ? Number(updatedFilters.minExperience)
          : null,

        maxExperience: updatedFilters.maxExperience
          ? Number(updatedFilters.maxExperience)
          : null,

        minExpectedCTC: updatedFilters.minExpectedCTC
          ? Number(updatedFilters.minExpectedCTC)
          : null,

        maxExpectedCTC: updatedFilters.maxExpectedCTC
          ? Number(updatedFilters.maxExpectedCTC)
          : null,

        noticeStatus:
          updatedFilters.noticeStatus === ""
            ? null
            : updatedFilters.noticeStatus,

        maxNoticePeriod: updatedFilters.maxNoticePeriod
          ? Number(updatedFilters.maxNoticePeriod)
          : null,

        immediateJoiner:
          updatedFilters.immediateJoiner === ""
            ? null
            : updatedFilters.immediateJoiner === "true",

        page: updatedFilters.page,
        size: updatedFilters.size,
      };

      const response = await searchJobSeekers(requestBody);

      setResults(response.data.content);
      setPagination(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     Load From URL Params
  ========================= */

  useEffect(() => {
    const urlFilters = {
      keyword: searchParams.get("keyword") || "",
      skills: searchParams.get("skills") || "",
      currentLocation: searchParams.get("currentLocation") || "",
      preferredLocation: searchParams.get("preferredLocation") || "",
      minExperience: searchParams.get("minExperience") || "",
      maxExperience: searchParams.get("maxExperience") || "",
      minExpectedCTC: searchParams.get("minExpectedCTC") || "",
      maxExpectedCTC: searchParams.get("maxExpectedCTC") || "",
      noticeStatus: searchParams.get("noticeStatus") || "",
      maxNoticePeriod: searchParams.get("maxNoticePeriod") || "",
      immediateJoiner: searchParams.get("immediateJoiner") || "",
      page: Number(searchParams.get("page")) || 0,
      size: 10,
    };

    setFilters(urlFilters);

    if (
      urlFilters.keyword ||
      urlFilters.skills ||
      urlFilters.currentLocation ||
      urlFilters.preferredLocation ||
      urlFilters.minExperience ||
      urlFilters.maxExperience ||
      urlFilters.page !== 0
    ) {
      handleSearch(urlFilters);
    }
  }, [searchParams]);

  /* =========================
     Pagination
  ========================= */

  const handlePageChange = (newPage) => {
    const updated = {
      ...filters,
      page: newPage,
    };

    handleSearch(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 sticky">
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Recruiter Candidate Search
        </h2>

        <div className="grid grid-cols-12 gap-6">
          {/* =========================
              FILTER PANEL
          ========================= */}

          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow sticky top-8 flex flex-col max-h-[70vh]">
              {/* FILTER TITLE */}
              <div className="mt-6 ml-6 p-2">
                <h3 className="text-lg font-semibold">Filters</h3>
              </div>

              {/* SCROLLABLE FILTER FIELDS */}

              <div className="p-6 space-y-2 overflow-y-auto flex-1">
                <input
                  type="text"
                  name="keyword"
                  placeholder="Keyword"
                  value={filters.keyword}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />

                <input
                  type="text"
                  name="skills"
                  placeholder="Skills (Java, React)"
                  value={filters.skills}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />

                <input
                  type="text"
                  name="currentLocation"
                  placeholder="Current Location"
                  value={filters.currentLocation}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />

                <input
                  type="text"
                  name="preferredLocation"
                  placeholder="Preferred Location"
                  value={filters.preferredLocation}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />

                <input
                  type="number"
                  name="minExperience"
                  placeholder="Min Experience"
                  value={filters.minExperience}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />

                <input
                  type="number"
                  name="maxExperience"
                  placeholder="Max Experience"
                  value={filters.maxExperience}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />

                <input
                  type="number"
                  name="minExpectedCTC"
                  placeholder="Min Expected CTC"
                  value={filters.minExpectedCTC}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />

                <input
                  type="number"
                  name="maxExpectedCTC"
                  placeholder="Max Expected CTC"
                  value={filters.maxExpectedCTC}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />

                <select
                  name="noticeStatus"
                  value={filters.noticeStatus}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Notice Status</option>
                  <option value="IMMEDIATE_JOINER">Immediate Joiner</option>
                  <option value="OPEN_TO_WORK">Open To Work</option>
                  <option value="SERVING_NOTICE">Serving Notice</option>
                  <option value="NOT_SERVING">Not Serving</option>
                  <option value="NOT_LOOKING">Not Looking</option>
                </select>

                <input
                  type="number"
                  name="maxNoticePeriod"
                  placeholder="Max Notice Period"
                  value={filters.maxNoticePeriod}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />

                <select
                  name="immediateJoiner"
                  value={filters.immediateJoiner}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Immediate Joiner</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* STICKY SEARCH BUTTON */}

              <div className="p-4 border-t bg-white sticky bottom-0">
                <button
                  onClick={() => handleSearch({ ...filters, page: 0 })}
                  className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white py-2 rounded"
                >
                  <Search size={16} />
                  {loading ? "Searching..." : "Apply Filters"}
                </button>
              </div>
            </div>
          </div>

          {/* =========================
              RESULTS COMPONENT
          ========================= */}

          <JobSeekerResults
            results={results}
            loading={loading}
            pagination={pagination}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default RecruiterJobSeekerSearch;
