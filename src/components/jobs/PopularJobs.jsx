import { useNavigate } from "react-router-dom";

function PopularJobs({ title, categories }) {
  const navigate = useNavigate();

  return (
    <section className="py-10 px-5 text-center">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <div className="flex justify-center gap-5 flex-wrap py-10">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => navigate(`/jobs/${cat.slug}`)}
            className="bg-gray-100 hover:bg-gray-200 
                       p-3 w-37.5 
                       rounded-md font-semibold 
                       cursor-pointer 
                       transition duration-200 
                       shadow-sm hover:shadow-md"
          >
            {cat.name}
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularJobs;
