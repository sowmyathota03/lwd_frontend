import { useEffect, useState } from "react";
import { searchCompanies } from "../../api/CompanyApi";
import Loader from "../common/Loader";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Building2,
  MapPin,
  ArrowRight,
  Building,
  Info
} from "lucide-react";

function SearchCompanies({
  showRequestButton = false,
  onRequestCompany,
  loadingCompanyId
}) {
  const [keyword, setKeyword] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const data = await searchCompanies(keyword, 0, 10);
      setCompanies(data.content || []);
    } catch (error) {
      console.error("Error fetching companies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="lwd-page min-h-screen p-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl space-y-8 relative z-10"
      >

        {/* Search Section */}
        <motion.div variants={itemVariants} className="lwd-card-glass p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">

            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black">Entity Discovery</h3>
                <p className="text-xs text-gray-400">Search companies</p>
              </div>
            </div>

            <div className="flex w-full md:w-[60%] gap-3">
              <div className="relative flex-1">
                {/* ✅ FIXED ICON */}
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search company..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="lwd-input pl-12 h-12 w-full"
                />
              </div>

              <button
                onClick={loadCompanies}
                className="lwd-btn-primary px-6 flex items-center gap-2"
              >
                Search
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Loader */}
        <AnimatePresence>
          {loading && (
            <motion.div>
              <Loader message="Loading companies..." />
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Data */}
        {!loading && companies.length === 0 && (
          <motion.div className="text-center py-10">
            <Building size={30} className="mx-auto text-gray-400 mb-2" />
            <p>No companies found</p>
          </motion.div>
        )}

        {/* Company List */}
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {companies.map((company) => (
              <motion.div
                key={company.id}
                variants={itemVariants}
                className="p-4 border rounded-lg flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <Building2 size={24} />
                  <div>
                    <h3 className="font-bold">{company.companyName}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={12} /> {company.location}
                    </p>
                  </div>
                </div>

                {showRequestButton && (
                  <button
                    onClick={() => onRequestCompany(company.id)}
                    disabled={loadingCompanyId === company.id}
                    className="px-4 py-2 bg-black text-white rounded"
                  >
                    <Info size={14} />
                    {loadingCompanyId === company.id ? "Loading..." : "Request"}
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}

export default SearchCompanies;