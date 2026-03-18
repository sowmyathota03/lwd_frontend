import React, { useEffect, useState } from "react";
import axios from "axios";

const Pricing = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/plans/RECRUITER"
      );
      setPlans(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 py-16">
      <div className="max-w-6xl mx-auto px-6">

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
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl p-8 text-center transition hover:scale-105 ${plan.popular ? "border-4 border-yellow-400 scale-105" : ""
                }`}
            >
              {/* MOST POPULAR */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-white px-4 py-1 text-sm rounded-full shadow">
                  ⭐ MOST POPULAR
                </div>
              )}

              {/* Plan Name */}
              <h2 className="text-2xl font-bold text-gray-800">
                {plan.name}
              </h2>

              {/* Price */}
              <p className="text-4xl font-bold text-gray-900 mt-4">
                ₹{plan.price}
                <span className="text-sm text-gray-500">
                  {" "}
                  / {plan.duration}
                </span>
              </p>

              {/* Limit */}
              <p className="text-gray-500 mt-2">{plan.limit}</p>

              {/* Features */}
              <ul className="mt-6 space-y-3 text-left">
                {plan.features?.map((feature, i) => (
                  <li key={i} className="flex gap-2 items-center">
                    <span className="text-green-500">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`mt-8 w-full py-2 rounded-lg font-semibold ${plan.popular
                    ? "bg-yellow-400 text-white hover:bg-yellow-500"
                    : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                {plan.name === "Basic"
                  ? "Get Started"
                  : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Pricing;