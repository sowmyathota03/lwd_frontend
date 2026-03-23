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
    <div className="lwd-page py-16 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center">
          <h1 className="lwd-title text-4xl">
            Recruiter Pricing
          </h1>
          <p className="lwd-text mt-2">
            Find and hire top talent with our flexible plans.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative lwd-card p-8 text-center transition hover:scale-105 ${plan.popular ? "border-2 border-yellow-400 scale-105" : ""
                }`}
            >
              {/* MOST POPULAR */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-white px-4 py-1 text-sm rounded-full shadow">
                  ⭐ MOST POPULAR
                </div>
              )}

              {/* Plan Name */}
              <h2 className="lwd-title text-2xl">
                {plan.name}
              </h2>

              {/* Subtitle */}
              <p className="lwd-text mt-1">{plan.subtitle}</p>

              {/* Price */}
              <p className="text-4xl font-bold mt-4">
                ₹{plan.price}
                <span className="text-sm lwd-text"> / month</span>
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex gap-2 items-center text-sm">
                    <span className="text-green-500">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`mt-8 w-full py-2 rounded-md font-semibold ${plan.popular
                    ? "bg-yellow-400 text-white hover:bg-yellow-500"
                    : "lwd-btn-secondary"
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