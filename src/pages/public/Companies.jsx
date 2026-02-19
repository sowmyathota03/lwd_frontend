import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCompanies } from "../../api/CompanyApi";
import Loader from "../../components/jobs/Loader"; // adjust path if needed

function Companies() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompanies(page);
  }, [page]);

  const fetchCompanies = (pageNumber) => {
    setLoading(true);
    getAllCompanies(pageNumber, 5)
      .then((res) => {
        const data = res.data;
        setCompanies(data.content || []);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error("API Error:", error))
      .finally(() => setLoading(false));
  };

  const filteredCompanies = companies.filter((company) =>
    company.companyName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-pink-100 px-6 md:px-12 py-10">
      
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Companies
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search company name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-80 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-8"
      />

      {/* Loader */}
      {loading ? (
        <Loader />
      ) : filteredCompanies.length === 0 ? (
        <p className="text-gray-600">No companies found</p>
      ) : (
        <div className="space-y-6">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col md:flex-row gap-6 items-center"
            >
              
              {/* Logo */}
              <div className="w-20 flex justify-center">
                {company.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt="logo"
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-xs text-gray-500">
                    No Logo
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-800">
                  {company.companyName}
                </h3>

                <p className="text-gray-600 mt-2">
                  {company.description}
                </p>

                <p className="mt-2 text-sm">
                  <span className="font-semibold">Location:</span>{" "}
                  {company.location}
                </p>

                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-600 text-sm hover:underline mt-1 inline-block"
                  >
                    Visit Website
                  </a>
                )}

                <p className="mt-2 text-sm">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-semibold ${
                      company.isActive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {company.isActive ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>

              {/* Button */}
              <div>
                <button
                  onClick={() =>
                    navigate(
                      `/jobs?companyId=${company.id}&companyName=${company.companyName}`
                    )
                  }
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
                >
                  View Jobs →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              page === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Previous
          </button>

          <span className="font-semibold text-gray-700">
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page + 1 === totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              page + 1 === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Companies;
