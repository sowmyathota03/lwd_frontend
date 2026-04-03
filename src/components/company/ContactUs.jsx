import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock, 
  Globe,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      setIsSubmitting(false);
      return;
    }

    // Existing logic preserved
    console.log(form);
    setTimeout(() => {
      alert("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="lwd-page min-h-screen py-20 px-6 relative overflow-hidden">
      
      {/* Decorative Atmospheric Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl space-y-16 relative z-10"
      >
        
        {/* HERO HEADER */}
        <motion.div variants={itemVariants} className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest mb-4 shadow-sm">
             <MessageSquare size={12} />
             Contact Core
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 italic">Conversation</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Reach out to the LWD team for support, partnerships, or inquiries. We are here to help you navigate your journey.
          </p>
        </motion.div>

        {/* TWO-COLUMN MASTER LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* CONTACT DECK (LEFT) */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Direct Channels</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Always Connected</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="lwd-card bg-white dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 transition-all space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center border border-blue-100/50 dark:border-blue-800/20 shadow-sm">
                   <Mail size={20} />
                </div>
                <div>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email Protocol</h4>
                   <p className="text-sm font-black text-slate-800 dark:text-white">support@lwd.portal</p>
                </div>
              </div>

              <div className="lwd-card bg-white dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-xl hover:shadow-indigo-500/5 transition-all space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center border border-indigo-100/50 dark:border-indigo-800/20 shadow-sm">
                   <Phone size={20} />
                </div>
                <div>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Voice Channel</h4>
                   <p className="text-sm font-black text-slate-800 dark:text-white">+91 0000 000 000</p>
                </div>
              </div>

              <div className="lwd-card bg-white dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-xl hover:shadow-amber-500/5 transition-all space-y-4 sm:col-span-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center border border-amber-100/50 dark:border-amber-800/20 shadow-sm">
                   <MapPin size={20} />
                </div>
                <div>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">HQ Office</h4>
                   <p className="text-sm font-black text-slate-800 dark:text-white">Hyderabad, Telangana, India - Knowledge City Precinct</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 dark:bg-slate-800 text-white space-y-4 relative overflow-hidden">
               <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-blue-600/20 blur-[60px] rounded-full pointer-events-none rotate-12"></div>
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                     <Clock size={16} />
                  </div>
                  <h5 className="text-[10px] font-black uppercase tracking-widest leading-none">Global Awareness</h5>
               </div>
               <p className="text-xs font-medium text-slate-300 leading-relaxed relative z-10 italic">
                  Our intelligence grid is active 24/7. Critical inquiries are usually synthesized and responded to within <span className="text-blue-400 font-black">24 Standard Hours</span>.
               </p>
            </div>
          </motion.div>

          {/* COMMUNICATION PORTAL (RIGHT) */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="lwd-card-glass p-10 space-y-8 relative">
              <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-500/20 animate-pulse">
                   <Globe size={24} />
                </div>
                <div>
                   <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Signal Ingress</h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Protocol: Secure Form Transmit</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  
                  <div className="group/field">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 block group-focus-within/field:text-blue-500 transition">Identity</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={form.name}
                      onChange={handleChange}
                      className="lwd-input h-14 bg-white dark:bg-slate-900/50 focus:ring-blue-500/20 px-6 font-bold tracking-tight text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="group/field">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 block group-focus-within/field:text-blue-500 transition">Email Channel</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@organization.com"
                      value={form.email}
                      onChange={handleChange}
                      className="lwd-input h-14 bg-white dark:bg-slate-900/50 focus:ring-blue-500/20 px-6 font-bold tracking-tight text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="group/field">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 block group-focus-within/field:text-blue-500 transition">Narrative</label>
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Type your message here..."
                      value={form.message}
                      onChange={handleChange}
                      className="lwd-input bg-white dark:bg-slate-900/50 focus:ring-blue-500/20 px-6 py-4 font-bold tracking-tight text-slate-800 dark:text-white resize-none"
                    />
                  </div>

                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="lwd-btn-primary w-full h-14 rounded-2xl flex items-center justify-center gap-3 group/btn relative overflow-hidden active:scale-95 transition-all disabled:opacity-50"
                >
                  <span className="text-sm font-black uppercase tracking-widest relative z-10 transition group-hover/btn:translate-x-1">
                    {isSubmitting ? "Transmitting..." : "Send Signal"}
                  </span>
                  <Send className={`relative z-10 w-4 h-4 transition duration-500 ${isSubmitting ? "translate-x-20 opacity-0" : "group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"}`} />
                </button>

                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center italic">
                  By clicking send, you agree to our data transfer and privacy protocol.
                </p>
              </form>
            </div>
          </motion.div>

        </div>

      </motion.div>
    </div>
  );
}

export default ContactUs;