import { useNavigate } from "react-router-dom";

function PopularJobs({ title, categories }) {
  const navigate = useNavigate();

  return (
    <section className="py-10 px-5 text-center">
      <h2 className="text-2xl font-semibold mb-6 lwd-text">{title}</h2>

      <div className="flex justify-center gap-5 flex-wrap py-10">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => navigate(`/jobs/${cat.slug}`)}
            className="lwd-badge cursor-pointer w-37.5 transition duration-200 shadow-sm hover:shadow-md"
          >
            {cat.name}
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularJobs;