import React from "react";
import { useNavigate } from "react-router-dom";

function PopularJobs({ title, categories }) {
  const navigate = useNavigate();

  return (
    <section className="categories">
      <h2>{title}</h2>

      <div className="category-cards">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="card"
            onClick={() => navigate(`/jobs/${cat.slug}`)}
            style={{ cursor: "pointer" }}
          >
            {cat.name}
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularJobs;
