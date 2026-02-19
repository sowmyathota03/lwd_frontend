import { motion } from "framer-motion";

function Loader() {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-green-500",
  ];

  return (
    <div className="w-full flex items-center justify-center py-16">
      <motion.div
        className="flex space-x-3"
        initial="start"
        animate="end"
        transition={{
          staggerChildren: 0.15,
          repeat: Infinity,
        }}
      >
        {colors.map((color, index) => (
          <motion.span
            key={index}
            className={`w-4 h-4 rounded-full ${color}`}
            variants={{
              start: { y: 0 },
              end: { y: -12 },
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default Loader;
