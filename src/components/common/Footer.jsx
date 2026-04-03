import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  Send
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="lwd-footer">
      <div className="lwd-container">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & About - 4 Columns */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <h3 className="text-3xl font-black tracking-tighter text-blue-600 dark:text-blue-500">LWD</h3>
            </Link>
            <p className="lwd-text-muted mb-8 max-w-sm">
              Connecting talented professionals with India's most innovative companies. 
              Our mission is to simplify the hiring process through intelligence and transparency.
            </p>
            <div className="flex gap-4">
              <a href="#" className="lwd-footer-social" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="lwd-footer-social" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="lwd-footer-social" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="lwd-footer-social" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links - Job Seekers - 2 Columns */}
          <div className="lg:col-span-2">
            <h4 className="lwd-footer-heading">For Talent</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/jobs" className="lwd-footer-link group">
                  <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/resume-upload" className="lwd-footer-link group">
                  <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Upload Resume
                </Link>
              </li>
              <li>
                <Link to="/job-alert" className="lwd-footer-link group">
                  <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Job Alerts
                </Link>
              </li>
              <li>
                <Link to="/career-advice" className="lwd-footer-link group">
                  <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Career Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links - Employers - 2 Columns */}
          <div className="lg:col-span-2">
            <h4 className="lwd-footer-heading">Employers</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/register/recruiter" className="lwd-footer-link group">
                  <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/plans/recruiter" className="lwd-footer-link group">
                  <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link to="/login" className="lwd-footer-link group">
                  <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Recruiter Portal
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="lwd-footer-link group">
                  <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Enterprise 
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details - 4 Columns */}
          <div className="lg:col-span-4">
            <h4 className="lwd-footer-heading">Get in Touch</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                <MapPin size={20} className="text-blue-600 shrink-0" />
                <span>123 Tech Park, Hitech City, Hyderabad, TS 500081, India</span>
              </li>
              <li>
                <a href="mailto:support@lwd.com" className="lwd-footer-link">
                  <Mail size={20} className="text-blue-600" />
                  support@lwd.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="lwd-footer-link">
                  <Phone size={20} className="text-blue-600" />
                  +91 98765 43210
                </a>
              </li>
            </ul>
            
            {/* Newsletter Mini Form */}
            <div className="relative">
              <input 
                type="email" 
                placeholder="Join our newsletter" 
                className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-xl py-3 pl-4 pr-12 focus:ring-2 focus:ring-blue-600/50 transition-all"
              />
              <button className="absolute right-2 top-1.5 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            © {currentYear} LWD. Designed with precision in India.
          </p>
          
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">Terms</Link>
            <Link to="/about-us" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;