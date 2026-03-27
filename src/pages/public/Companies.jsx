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
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-16 px-6 font-sans transition-colors duration-300">
      
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <section className="text-center mb-16 mt-4">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-semibold mb-6 tracking-wide uppercase shadow-sm">
            Top Employers
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Trusted Companies</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto">
            Explore industry-leading organizations hiring right now. Find a company culture that fits your career goals.
          </p>
        </section>

        {/* Search Bar */}
        <div className="flex justify-center mb-12 relative z-10 w-full max-w-2xl mx-auto">
          <div className="relative w-full shadow-lg rounded-2xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search companies by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 rounded-2xl border-0 ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 shadow-sm text-lg outline-none"
            />
          </div>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center my-20">
            <Loader />
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/60 shadow-sm max-w-2xl mx-auto">
            <svg className="mx-auto h-16 w-16 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">No companies found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your search query.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-500/50 transition-all duration-300 group"
              >
                {/* Logo */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center p-2 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-300">
                    {company.logoUrl ? (
                      <img
                        src={company.logoUrl}
                        alt={`${company.companyName} logo`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-slate-400 text-center px-2">No Logo</span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 text-center md:text-left w-full">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {company.companyName}
                      </h3>
                      
                      {company.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center mt-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          Visit Website
                        </a>
                      )}
                    </div>

                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider md:self-start lg:-mt-1 ${
                        company.isActive
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
                      }`}
                    >
                      {company.isActive ? (
                        <><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span> Active</>
                      ) : (
                        <><span className="w-2 h-2 rounded-full bg-rose-500 mr-1.5"></span> Inactive</>
                      )}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {company.description || "No description provided for this company."}
                  </p>

                  <div className="flex items-center justify-center md:justify-start text-sm font-medium text-slate-500 dark:text-slate-400">
                    <svg className="w-5 h-5 mr-1.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {company.location || "Location not specified"}
                  </div>
                </div>

                {/* Button */}
                <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                  <button
                    onClick={() =>
                      navigate(
                        `/jobs?companyId=${company.id}&companyName=${company.companyName}`
                      )
                    }
                    className="w-full md:w-auto px-6 py-3.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/50 dark:hover:bg-blue-600 dark:hover:text-white font-bold rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group/btn"
                  >
                    View Jobs
                    <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 bg-white dark:bg-slate-800 px-6 py-4 rounded-full w-max mx-auto border border-slate-100 dark:border-slate-700 shadow-sm">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                page === 0
                  ? "text-slate-300 dark:text-slate-600 cursor-not-allowed"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600"
              }`}
              aria-label="Previous page"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>

            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 px-4 tracking-wide">
              PAGE {page + 1} OF {totalPages}
            </span>

            <button
              disabled={page + 1 === totalPages}
              onClick={() => setPage(page + 1)}
              className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                page + 1 === totalPages
                  ? "text-slate-300 dark:text-slate-600 cursor-not-allowed"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600"
              }`}
              aria-label="Next page"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Companies;