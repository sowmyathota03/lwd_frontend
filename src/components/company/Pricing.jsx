import React from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Rocket, 
  Crown, 
  Sparkles,
  ArrowRight
} from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: 4999,
      subtitle: "For Small Teams",
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      theme: "blue",
      features: [
        { text: "Post Jobs", included: true },
        { text: "3 jobs per month", included: true },
        { text: "500 resumes/day", included: true },
        { text: "Up to 100 resumes/day", included: true },
        { text: "Basic Filters", included: false },
        { text: "Basic Support", included: false },
        { text: "No Profile Boosting", included: false },
      ],
      button: "Get Started",
    },
    {
      name: "Standard",
      price: 9999,
      subtitle: "For Growing Companies",
      popular: true,
      icon: <Rocket className="w-6 h-6 text-amber-500" />,
      theme: "amber",
      features: [
        { text: "Post Jobs", included: true },
        { text: "10 jobs per month", included: true },
        { text: "500 resumes/day", included: true },
        { text: "Up to 300 resumes/day", included: true },
        { text: "Basic Filters", included: true },
        { text: "CRM & Email Tools", included: true },
        { text: "Premium Support", included: true },
      ],
      button: "Choose Plan",
    },
    {
      name: "Premium",
      price: 14999,
      subtitle: "For High-Volume Hiring",
      icon: <Crown className="w-6 h-6 text-indigo-500" />,
      theme: "indigo",
      features: [
        { text: "Unlimited Job Posts", included: true },
        { text: "Unlimited Resume Search", included: true },
        { text: "All resumes access", included: true },
        { text: "Unlimited search", included: true },
        { text: "Advanced Filters", included: true },
        { text: "CRM & Email Tools", included: true },
        { text: "Premium Support", included: true },
      ],
      button: "Choose Plan",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="lwd-page min-h-screen py-24 px-6 relative overflow-hidden bg-slate-900">
      
      {/* Decorative Atmospheric Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl space-y-20 relative z-10"
      >
        
        {/* HEADING SECTION */}
        <motion.div variants={itemVariants} className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm">
             <Sparkles size={12} />
             Commercial Access
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
            Talent Ingress <span className="text-blue-500 italic">Protocols</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed">
            Scalable hiring solutions for small teams to high-volume recruitment engines. Find and hire top talent with flexible investment tiers.
          </p>
        </motion.div>

        {/* PRICING GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`
                relative p-1 rounded-[2.5rem] transition-all duration-500 group
                ${plan.popular 
                  ? "bg-gradient-to-b from-amber-500/50 to-transparent shadow-2xl shadow-amber-500/10 z-20 scale-105 lg:scale-110" 
                  : "bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50"
                }
              `}
            >
              
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg border border-amber-400/30 flex items-center gap-2">
                   <Sparkles size={12} className="animate-pulse" /> MOST POPULAR
                </div>
              )}

              <div className="lwd-card-glass bg-slate-900/95 dark:bg-slate-900/95 p-10 rounded-[2.2rem] h-full flex flex-col">
                
                {/* Header Unit */}
                <div className="flex items-center justify-between mb-8">
                   <div className={`p-4 rounded-2xl bg-slate-800 border border-slate-700/50 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                      {plan.icon}
                   </div>
                   <div className="text-right">
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-none">
                        {plan.name}
                      </h2>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">
                        {plan.subtitle}
                      </p>
                   </div>
                </div>

                {/* Price Display */}
                <div className="mb-10 pb-10 border-b border-slate-800/50">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-black text-white tabular-nums">₹{plan.price.toLocaleString()}</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">/ Month</span>
                  </div>
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-3 italic">Billed annually at ₹{(plan.price * 12).toLocaleString()}</p>
                </div>

                {/* Features Protocol */}
                <div className="flex-1 space-y-6 mb-10">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-none">Access Protocol</h4>
                   <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className={`flex gap-3 items-center text-xs font-bold uppercase tracking-widest transition-opacity duration-300 ${feature.included ? "text-slate-300" : "text-slate-600 opacity-40 italic"}`}>
                        {feature.included ? (
                          <CheckCircle2 size={16} className={`shrink-0 ${plan.popular ? "text-amber-500" : "text-blue-500"}`} />
                        ) : (
                          <XCircle size={16} className="shrink-0" />
                        )}
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CALL TO ACTION */}
                <button
                  className={`
                    w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 flex items-center justify-center gap-2 group/btn
                    ${plan.popular
                        ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-1"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50 hover:border-slate-600"
                    }
                  `}
                >
                  {plan.button}
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>

              </div>
            </motion.div>
          ))}
        </div>

        {/* TRUST SIGNALS */}
        <motion.div variants={itemVariants} className="pt-20 border-t border-slate-800/50 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center pb-20">
           <div className="space-y-2">
              <p className="text-3xl font-black text-white tabular-nums">1.2M+</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Seekers</p>
           </div>
           <div className="space-y-2">
              <p className="text-3xl font-black text-white tabular-nums">45K+</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Partner Entities</p>
           </div>
           <div className="space-y-2">
              <p className="text-3xl font-black text-white tabular-nums">150K+</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Successful Hires</p>
           </div>
           <div className="space-y-2">
              <p className="text-3xl font-black text-white tabular-nums">99.9%</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ingress Uptime</p>
           </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Pricing;