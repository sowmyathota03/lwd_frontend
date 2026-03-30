import { useNavigate } from "react-router-dom";

function PopularJobs({ title, categories }) {
  const navigate = useNavigate();

  return (
    <section className="py-2 md:py-6 text-center w-full">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-800 dark:text-slate-100 tracking-tight">
          {title}
        </h2>
      )}

      <div className="flex justify-center gap-4 md:gap-6 flex-wrap pb-4">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => navigate(`/jobs/${cat.slug}`)}
            className="group relative px-6 md:px-8 py-3.5 md:py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Hover gradient background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {cat.name}
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default PopularJobs;