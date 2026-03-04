import React, { useState, useEffect } from "react";

const Pricing = () => {
  const [role, setRole] = useState("RECRUITER");
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    if (role === "RECRUITER") {
      setPlans([
        {
          id: 1,
          name: "Basic",
          price: 999,
          duration: "30 Days",
          limit: "Post up to 5 Jobs",
          features: [
            "Standard Job Listing",
            "Basic Support",
            "Manage Applications",
          ],
        },
        {
          id: 2,
          name: "Premium",
          price: 1999,
          duration: "30 Days",
          limit: "Unlimited Job Posting",
          popular: true,
          features: [
            "Featured Job Listing",
            "Priority Support",
            "Access Candidate Database",
            "Unlimited Job Posts",
          ],
        },
      ]);
    } else {
      setPlans([
        {
          id: 3,
          name: "Free",
          price: 0,
          duration: "30 Days",
          limit: "Apply to 10 Jobs",
          features: [
            "Basic Profile Visibility",
            "Standard Resume Upload",
            "Limited Applications",
          ],
        },
        {
          id: 4,
          name: "Premium",
          price: 499,
          duration: "30 Days",
          limit: "Unlimited Applications",
          popular: true,
          features: [
            "Profile Highlight",
            "Unlimited Job Applications",
            "Application Insights",
            "Priority Visibility",
          ],
        },
      ]);
    }
  }, [role]);

  return (
    <div className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Choose the Right Plan
          </h2>
          <p className="text-gray-500 mt-2">
            Simple and transparent pricing for recruiters and job seekers
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex justify-center mt-10">
          <div className="border rounded-md flex">
            <button
              onClick={() => setRole("RECRUITER")}
              className={`px-6 py-2 text-sm font-medium transition ${
                role === "RECRUITER"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700"
              }`}
            >
              Recruiter
            </button>
            <button
              onClick={() => setRole("JOB_SEEKER")}
              className={`px-6 py-2 text-sm font-medium transition ${
                role === "JOB_SEEKER"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700"
              }`}
            >
              Job Seeker
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-8 relative ${
                plan.popular ? "border-blue-600" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-md">
                  Recommended
                </span>
              )}

              <h3 className="text-xl font-semibold text-gray-800">
                {plan.name}
              </h3>

              <p className="mt-6 text-3xl font-bold text-blue-600">
                ₹{plan.price}
                <span className="text-base text-gray-500 font-normal">
                  {" "}
                  / {plan.duration}
                </span>
              </p>

              <p className="mt-4 text-gray-600 text-sm">{plan.limit}</p>

              <ul className="mt-6 space-y-3 text-gray-600 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-blue-600">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full py-2 rounded text-sm font-medium transition ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Pricing;