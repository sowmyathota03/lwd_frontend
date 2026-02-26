import { useState } from "react";
import { searchJobSeekers } from "../../api/JobSeekerApi";
import { Search } from "lucide-react";

function RecruiterJobSeekerSearch() {
  const [filters, setFilters] = useState({
    keyword: "",
    skills: "",
    currentLocation: "",
    minExperience: "",
    maxExperience: "",
    page: 0,
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

  const handleSearch = async () => {
    try {
      setLoading(true);

      const requestBody = {
        ...filters,
        skills: filters.skills
          ? filters.skills.split(",").map((s) => s.trim())
          : [],
        minExperience: filters.minExperience
          ? Number(filters.minExperience)
          : null,
        maxExperience: filters.maxExperience
          ? Number(filters.maxExperience)
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Recruiter Candidate Search
        </h2>

        <div className="grid grid-cols-12 gap-6">

          {/* LEFT FILTER PANEL */}
          <div className="col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit sticky top-6">

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
                className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-1 focus:ring-blue-600 outline-none"
              />

              <input
                type="text"
                name="skills"
                placeholder="Skills (React, Java)"
                value={filters.skills}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-1 focus:ring-blue-600 outline-none"
              />

              <input
                type="text"
                name="currentLocation"
                placeholder="Location"
                value={filters.currentLocation}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-1 focus:ring-blue-600 outline-none"
              />

              <input
                type="number"
                name="minExperience"
                placeholder="Min Experience"
                value={filters.minExperience}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-1 focus:ring-blue-600 outline-none"
              />

              <input
                type="number"
                name="maxExperience"
                placeholder="Max Experience"
                value={filters.maxExperience}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-1 focus:ring-blue-600 outline-none"
              />

              <button
                onClick={handleSearch}
                className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-md text-sm font-medium transition"
              >
                <Search size={16} />
                {loading ? "Searching..." : "Apply Filters"}
              </button>

            </div>
          </div>

          {/* RIGHT RESULTS SECTION */}
          <div className="col-span-9 space-y-4">

            {results.length === 0 && !loading && (
              <div className="bg-white p-8 rounded-lg border border-gray-200 text-center text-gray-500">
                No candidates found. Adjust filters.
              </div>
            )}

            {results.map((js) => (
              <div
                key={js.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
              >
                <div className="flex justify-between">

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {js.fullName}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {js.currentCompany} • {js.currentLocation}
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                      {js.totalExperience} years experience
                    </p>

                    <p className="text-sm text-gray-600">
                      Expected CTC: {js.expectedCTC} LPA
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {js.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="px-4 py-2 text-sm border border-blue-700 text-blue-700 rounded-md hover:bg-blue-50 transition">
                      View Profile
                    </button>
                    <button className="px-4 py-2 text-sm bg-blue-700 text-white rounded-md hover:bg-blue-800 transition">
                      Shortlist
                    </button>
                  </div>

                </div>
              </div>
            ))}

            {/* Pagination */}
            {pagination && (
              <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-lg border border-gray-200">

                <button
                  disabled={pagination.pageNumber === 0}
                  onClick={() =>
                    setFilters({ ...filters, page: pagination.pageNumber - 1 })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-600">
                  Page {pagination.pageNumber + 1} of {pagination.totalPages}
                </span>

                <button
                  disabled={pagination.last}
                  onClick={() =>
                    setFilters({ ...filters, page: pagination.pageNumber + 1 })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50"
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