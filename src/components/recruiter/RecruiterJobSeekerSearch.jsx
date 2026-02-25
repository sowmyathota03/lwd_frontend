import { useState } from "react";
import { searchJobSeekers } from "../../api/JobSeekerApi";

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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Search Job Seekers</h2>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          name="keyword"
          placeholder="Keyword (name, skill, company)"
          value={filters.keyword}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={filters.skills}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="currentLocation"
          placeholder="Current Location"
          value={filters.currentLocation}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="minExperience"
          placeholder="Min Experience"
          value={filters.minExperience}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="maxExperience"
          placeholder="Max Experience"
          value={filters.maxExperience}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {/* Results */}
      <div className="mt-6">
        {results.map((js) => (
          <div
            key={js.id}
            className="border p-4 rounded mb-3 shadow-sm"
          >
            <h3 className="font-semibold text-lg">{js.fullName}</h3>
            <p>Email: {js.email}</p>
            <p>Experience: {js.totalExperience} years</p>
            <p>Company: {js.currentCompany}</p>
            <p>Location: {js.currentLocation}</p>
            <p>Expected CTC: {js.expectedCTC} LPA</p>
            <p>
              Skills:{" "}
              {js.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-2 py-1 rounded mr-2 text-sm"
                >
                  {skill}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-between mt-4">
          <button
            disabled={pagination.pageNumber === 0}
            onClick={() =>
              setFilters({ ...filters, page: pagination.pageNumber - 1 })
            }
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Previous
          </button>

          <span>
            Page {pagination.pageNumber + 1} of {pagination.totalPages}
          </span>

          <button
            disabled={pagination.last}
            onClick={() =>
              setFilters({ ...filters, page: pagination.pageNumber + 1 })
            }
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default RecruiterJobSeekerSearch;
