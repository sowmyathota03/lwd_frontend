import { useState, useEffect } from "react";
import { searchJobSeekers } from "../../api/JobSeekerApi";
import { Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

function RecruiterJobSeekerSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    skills: searchParams.get("skills") || "",
    currentLocation: searchParams.get("currentLocation") || "",
    minExperience: searchParams.get("minExperience") || "",
    maxExperience: searchParams.get("maxExperience") || "",
    page: Number(searchParams.get("page")) || 0,
    size: 10,
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (updatedFilters = filters) => {
    try {
      setLoading(true);

      // Update URL (THIS FIXES BACK BUTTON ISSUE)
      setSearchParams({
        keyword: updatedFilters.keyword || "",
        skills: updatedFilters.skills || "",
        currentLocation: updatedFilters.currentLocation || "",
        minExperience: updatedFilters.minExperience || "",
        maxExperience: updatedFilters.maxExperience || "",
        page: updatedFilters.page || 0,
      });

      const requestBody = {
        ...updatedFilters,
        skills: updatedFilters.skills
          ? updatedFilters.skills.split(",").map((s) => s.trim())
          : [],
        minExperience: updatedFilters.minExperience
          ? Number(updatedFilters.minExperience)
          : null,
        maxExperience: updatedFilters.maxExperience
          ? Number(updatedFilters.maxExperience)
          : null,
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

  // Auto search when page changes (via back button or pagination)
  useEffect(() => {
    const urlFilters = {
      keyword: searchParams.get("keyword") || "",
      skills: searchParams.get("skills") || "",
      currentLocation: searchParams.get("currentLocation") || "",
      minExperience: searchParams.get("minExperience") || "",
      maxExperience: searchParams.get("maxExperience") || "",
      page: Number(searchParams.get("page")) || 0,
      size: 10,
    };

    setFilters(urlFilters);

    // Auto search only if something exists
    if (
      urlFilters.keyword ||
      urlFilters.skills ||
      urlFilters.currentLocation ||
      urlFilters.minExperience ||
      urlFilters.maxExperience ||
      urlFilters.page !== 0
    ) {
      handleSearch(urlFilters);
    }
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    const updated = { ...filters, page: newPage };
    handleSearch(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Recruiter Candidate Search
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* FILTER PANEL */}
          <div className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-lg shadow-sm border border-gray-200 h-fit lg:sticky lg:top-6 mb-6 lg:mb-0">

            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Filters
            </h3>

            <div className="space-y-4">

              <input
                type="text"
                name="keyword"
                placeholder="Keyword"
                value={filters.keyword}
                onChange={handleChange}
                className="w-full border p-2.5 rounded-md text-sm"
              />

              <input
                type="text"
                name="skills"
                placeholder="Skills (React, Java)"
                value={filters.skills}
                onChange={handleChange}
                className="w-full border p-2.5 rounded-md text-sm"
              />

              <input
                type="text"
                name="currentLocation"
                placeholder="Location"
                value={filters.currentLocation}
                onChange={handleChange}
                className="w-full border p-2.5 rounded-md text-sm"
              />

              <input
                type="number"
                name="minExperience"
                placeholder="Min Experience"
                value={filters.minExperience}
                onChange={handleChange}
                className="w-full border p-2.5 rounded-md text-sm"
              />

              <input
                type="number"
                name="maxExperience"
                placeholder="Max Experience"
                value={filters.maxExperience}
                onChange={handleChange}
                className="w-full border p-2.5 rounded-md text-sm"
              />

              <button
                onClick={() => handleSearch({ ...filters, page: 0 })}
                className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-md text-sm"
              >
                <Search size={16} />
                {loading ? "Searching..." : "Apply Filters"}
              </button>

            </div>
          </div>

          {/* RESULTS SECTION */}
          <div className="lg:col-span-9 space-y-4">

            {results.length === 0 && !loading && (
              <div className="bg-white p-6 rounded-lg border text-center text-gray-500">
                No candidates found. Adjust filters.
              </div>
            )}

            {results.map((js) => (
              <div
                key={js.id}
                className="bg-white border rounded-lg p-4 sm:p-6 hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-4">

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">
                      {js.fullName}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {js.currentCompany} • {js.currentLocation}
                    </p>

                    <p className="text-sm mt-2">
                      {js.totalExperience} years experience
                    </p>

                    <p className="text-sm">
                      Expected CTC: {js.expectedCTC} LPA
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {js.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">

                    <Link
                      to={`/profile/${js.userId}`}
                      className="flex-1 md:flex-none text-center px-4 py-2 text-sm border border-blue-700 text-blue-700 rounded-md hover:bg-blue-50 transition"
                    >
                      View Profile
                    </Link>

                    {/* <button className="flex-1 md:flex-none px-4 py-2 text-sm bg-blue-700 text-white rounded-md hover:bg-blue-800 transition">
                      Shortlist
                    </button> */}

                  </div>

                </div>
              </div>
            ))}

            {/* Pagination */}
            {pagination && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 bg-white p-4 rounded-lg border text-sm">

                <button
                  disabled={pagination.pageNumber === 0}
                  onClick={() => handlePageChange(pagination.pageNumber - 1)}
                  className="w-full sm:w-auto px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>

                <span>
                  Page {pagination.pageNumber + 1} of {pagination.totalPages}
                </span>

                <button
                  disabled={pagination.last}
                  onClick={() => handlePageChange(pagination.pageNumber + 1)}
                  className="w-full sm:w-auto px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
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

export default RecruiterJobSeekerSearch;
