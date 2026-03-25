import React from "react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: 4999,
      subtitle: "For Small Teams",
      features: [
        "Post Jobs",
        "3 jobs per month",
        "500 resumes/day",
        "Up to 100 resumes/day",
        "Basic Filters ❌",
        "Basic Support ❌",
        "No Profile Boosting ❌",
      ],
      button: "Get Started",
    },
    {
      name: "Standard",
      price: 9999,
      subtitle: "For Growing Companies",
      popular: true,
      features: [
        "Post Jobs",
        "10 jobs per month",
        "500 resumes/day",
        "Up to 300 resumes/day",
        "Basic Filters ✔",
        "CRM & Email Tools ✔",
        "Premium Support ✔",
      ],
      button: "Choose Plan",
    },
    {
      name: "Premium",
      price: 14999,
      subtitle: "For High-Volume Hiring",
      features: [
        "Unlimited Job Posts ✔",
        "Unlimited Resume Search ✔",
        "All resumes access ✔",
        "Unlimited search ✔",
        "Advanced Filters ✔",
        "CRM & Email Tools ✔",
        "Premium Support ✔",
      ],
      button: "Choose Plan",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Recruiter Pricing
          </h1>
          <p className="text-gray-600 mt-2">
            Find and hire top talent with our flexible plans.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl p-8 text-center transition transform hover:scale-105 ${plan.popular ? "border-2 border-yellow-400 scale-105" : ""
                }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-white px-4 py-1 text-sm rounded-full shadow">
                  ⭐ MOST POPULAR
                </div>
              )}

              {/* Plan Name */}
              <h2 className="text-2xl font-semibold text-gray-800">
                {plan.name}
              </h2>

              {/* Subtitle */}
              <p className="text-gray-500 mt-1">{plan.subtitle}</p>

              {/* Price */}
              <p className="text-4xl font-bold mt-4 text-gray-900">
                ₹{plan.price}
                <span className="text-sm text-gray-500"> / month</span>
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex gap-2 items-center text-sm text-gray-700">
                    <span className="text-green-500">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`mt-8 w-full py-3 rounded-lg font-semibold transition ${plan.popular
                    ? "bg-yellow-400 text-white hover:bg-yellow-500"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Pricing;