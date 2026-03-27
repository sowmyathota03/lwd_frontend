import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PopularJobs from "../../components/jobs/PopularJobs";
import JobSearchBlock from "../../components/jobs/JobSearchBlock";
import { getTopCategories } from "../../api/JobApi";
import JobActionButton from "../../components/jobs/HomeJobActionButton";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);

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

  const features = [
    { title: "Verified Jobs", icon: "🛡️", desc: "Every job posting is authenticated to ensure your safety and time." },
    { title: "Trusted Companies", icon: "🏢", desc: "We partner with industry leaders and reputable startups." },
    { title: "Career Guidance", icon: "📈", desc: "Expert tips and resources to help you climb the career ladder." },
    { title: "Free Job Alerts", icon: "🔔", desc: "Get notified instantly when the perfect job is posted." }
  ];

  const companies = [
    "ArahInfotech", "Google", "TCS", "Infosys", 
    "Wipro", "Amazon", "Accenture", "Microsoft", "Meta"
  ];

  return (
    <div className="lwd-page font-sans bg-gray-50 min-h-screen">

      {/* HERO SECTION */}
      <section
        className="relative h-[600px] bg-cover bg-center flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/90 backdrop-blur-[2px]"></div>

        <div className="relative z-10 px-6 max-w-4xl text-white mt-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/50 text-blue-200 text-sm font-semibold mb-6 tracking-wide uppercase">
            Your Future Starts Here
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Dream Job</span> Today
          </h1>
          <p className="text-lg md:text-xl md:px-16 text-gray-200 mb-10 font-light leading-relaxed">
            Discover top job opportunities, connect with trusted companies, and take the next step in your career journey with LWD Portal.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            {user?.role === "JOB_SEEKER" ? (
              <JobActionButton />
            ) : (
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transform hover:-translate-y-1"
              >
                Create Free Profile
              </button>
            )}
            {!user && (
               <button
                 onClick={() => navigate("/login")}
                 className="bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white transition-all duration-300 px-8 py-4 rounded-full font-bold text-lg transform hover:-translate-y-1"
               >
                 Sign In
               </button>
            )}
          </div>
        </div>
      </section>

      {/* SEARCH BLOCK */}
      <div className="px-5 max-w-6xl mx-auto -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 transform transition-all hover:shadow-2xl">
          <JobSearchBlock />
        </div>
      </div>

      <div className="max-w-7xl mx-auto pb-20">
        
        {/* POPULAR JOBS */}
        <div className="mt-16 px-5">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular Job Categories</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Explore thousands of job opportunities across specialized categories tailored to your expertise.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all hover:shadow-md">
            <PopularJobs title="" categories={categories} />
          </div>
        </div>

        {/* WHY CHOOSE */}
        <section className="py-16 px-5 mt-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose LWD?</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">We provide the best tools and connections to help you succeed in today's competitive job market.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block bg-blue-50 p-4 rounded-2xl">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TOP COMPANIES */}
        <section className="py-16 px-5 mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl mx-5 shadow-sm border border-blue-100/50">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Top Companies Hiring</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Join the teams of industry-leading organizations looking for talent just like you.</p>
          </div>

          <div className="flex justify-center gap-4 md:gap-6 flex-wrap max-w-5xl mx-auto">
            {companies.map((company, index) => (
              <div
                key={index}
                className="bg-white px-8 py-4 rounded-xl font-bold text-gray-700 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center min-w-[140px]"
              >
                {company}
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}

export default Home;