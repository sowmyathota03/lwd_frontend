import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCompanies } from "../../api/CompanyApi";
import Loader from "../../components/common/Loader";

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
    <div className="lwd-page px-6 md:px-12 py-10">

      {/* Heading */}
      <h1 className="lwd-title text-2xl md:text-3xl mb-6">
        Companies
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search company name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="lwd-input md:w-80 mb-8"
      />

      {/* Loader */}
      {loading ? (
        <Loader />
      ) : filteredCompanies.length === 0 ? (
        <p className="lwd-text">No companies found</p>
      ) : (
        <div className="space-y-6">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="lwd-card p-6 flex flex-col md:flex-row gap-6 items-center hover:shadow-lg transition"
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
                  <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-xs text-gray-400">
                    No Logo
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="lwd-title text-lg">
                  {company.companyName}
                </h3>

                <p className="lwd-text mt-2">
                  {company.description}
                </p>

                <p className="mt-2 text-sm">
                  <span className="font-semibold">Location:</span>{" "}
                  <span className="lwd-text">{company.location}</span>
                </p>

                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="lwd-link text-sm mt-1 inline-block"
                  >
                    Visit Website
                  </a>
                )}

                <p className="mt-2 text-sm">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-semibold ${company.isActive
                        ? "text-green-600"
                        : "text-red-600"
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
                  className="lwd-btn-primary"
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
            className={`px-4 py-2 rounded-lg font-medium ${page === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "lwd-btn-secondary"
              }`}
          >
            Previous
          </button>

          <span className="lwd-text font-semibold">
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page + 1 === totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded-lg font-medium ${page + 1 === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "lwd-btn-primary"
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