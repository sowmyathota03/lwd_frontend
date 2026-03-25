import React from "react";

function CareerAdvice() {
  const tips = [
    "Build a strong resume with clear skills and projects.",
    "Practice coding and technical interview questions daily.",
    "Improve communication and English speaking skills.",
    "Create LinkedIn and GitHub profiles.",
    "Apply for internships to gain real-time experience.",
    "Learn trending technologies like React, Java, Python.",
    "Attend webinars and tech workshops.",
  ];

  return (
    <div className="lwd-page flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-2xl lwd-card p-8 rounded-2xl">

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center lwd-title mb-6">
          Career Advice
        </h1>

        {/* Subtitle */}
        <h3 className="text-center lwd-text mb-6">
          Tips for Job Seekers
        </h3>

        {/* Tips List */}
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li
              key={index}
              className="lwd-text bg-gray-50 dark:bg-slate-700/40 px-4 py-2 rounded-md"
            >
              • {tip}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default CareerAdvice;  