import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PopularJobs from "../../components/jobs/PopularJobs";
import JobSearchBlock from "../../components/jobs/JobSearchBlock";
import { getTopCategories } from "../../api/JobApi";
import JobActionButton from "../../components/jobs/JobActionButton";

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

      <JobSearchBlock />
      <PopularJobs title="Popular Job Categories" categories={categories} />

      {/* WHY LWD SECTION */}
      <section className="bg-[#A7F3D0] py-10 px-5 text-center">
        <h2 className="text-2xl font-semibold mb-6">Why Choose LWD?</h2>

        <div className="flex justify-center gap-8 flex-wrap py-8">
          <div className="text-base">✔ Verified Jobs</div>
          <div className="text-base">✔ Trusted Companies</div>
          <div className="text-base">✔ Career Guidance</div>
          <div className="text-base">✔ Free Job Alerts</div>
        </div>
      </section>

      {/* TOP COMPANIES SECTION */}
      <section className="py-10 px-5 text-center">
        <h2 className="text-2xl font-semibold mb-6">Top Companies Hiring</h2>

        <div className="flex justify-center gap-5 flex-wrap p-10">
          <div className="bg-gray-200 px-6 py-3 rounded font-bold">
            ArahInfotech
          </div>
          <div className="bg-gray-200 px-6 py-3 rounded font-bold">
            Google
          </div>
          <div className="bg-gray-200 px-6 py-3 rounded font-bold">
            TCS
          </div>
          <div className="bg-gray-200 px-6 py-3 rounded font-bold">
            Infosys
          </div>
          <div className="bg-gray-200 px-6 py-3 rounded font-bold">
            Wipro
          </div>
          <div className="bg-gray-200 px-6 py-3 rounded font-bold">
            Amazon
          </div>
          <div className="bg-gray-200 px-6 py-3 rounded font-bold">
            Accenture
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#FED7AA] text-white py-10 px-5 text-center gap-4 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6">
          Ready to take the next step?
        </h2>

        {user?.role === "JOB_SEEKER" ? (
          <JobActionButton />
        ) : (
          <button
            onClick={() => navigate("/register/jobseeker")}
            className="px-6 py-2 bg-white text-[#0a66c2] rounded text-base"
          >
            Create Profile
          </button>
        )}
      </section>

    </div>
  );
}

export default Home;
