import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { ArrowRight, UserPlus } from "lucide-react";

function JobActionButton() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate("/jobs");
      setTimeout(() => { window.scrollTo(0, 0); }, 0);
    } else {
      navigate("/register");
    }
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={handleClick}
      className={`
        group flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base text-white
        transition-all duration-200 shadow-lg
        ${user
          ? "bg-blue-600 hover:bg-blue-500 shadow-blue-500/30 hover:shadow-blue-500/50"
          : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/30 hover:shadow-indigo-500/50"
        }
      `}
    >
      {user ? (
        <>
          <span>Browse Jobs</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </>
      ) : (
        <>
          <UserPlus size={18} />
          <span>Create Free Profile</span>
        </>
      )}
    </motion.button>
  );
}

export default JobActionButton;