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

  return (
    <div className="font-sans">

 
      <section
        className="relative h-[500px] bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/futuristic-background-design_23-2148503793.jpg')",
        }}
      >
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50"></div>

        <div className="relative z-10 text-white px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to LWD Portal
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover top job opportunities and connect with trusted companies
            across industries.
          </p>

          {user?.role === "JOB_SEEKER" ? (
            <JobActionButton />
          ) : (
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition duration-300"
            >
              Create Profile
            </button>
          )}
        </div>
      </section>

      <div className="mt-8">
        <JobSearchBlock />
      </div>

    
      <div className="mt-10">
        <PopularJobs title="Popular Job Categories" categories={categories} />
      </div>

      
      <section className="bg-teal-100 py-12 px-5 text-center mt-10">
        <h2 className="text-2xl font-semibold mb-8">Why Choose LWD?</h2>

        <div className="flex justify-center gap-10 flex-wrap">
          <div className="text-base font-medium">✔ Verified Jobs</div>
          <div className="text-base font-medium">✔ Trusted Companies</div>
          <div className="text-base font-medium">✔ Career Guidance</div>
          <div className="text-base font-medium">✔ Free Job Alerts</div>
        </div>
      </section>

    
      <section className="py-12 px-5 text-center bg-gray-50">
        <h2 className="text-2xl font-semibold mb-8">Top Companies Hiring</h2>

        <div className="flex justify-center gap-6 flex-wrap">
          {[
            "ArahInfotech",
            "Google",
            "TCS",
            "Infosys",
            "Wipro",
            "Amazon",
            "Accenture",
          ].map((company, index) => (
            <div
              key={index}
              className="bg-white shadow-md border border-gray-200 px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition duration-300"
            >
              {company}
            </div>
          ))}
        </div>
      </section>

     

    </div>
  );
}

export default Home;