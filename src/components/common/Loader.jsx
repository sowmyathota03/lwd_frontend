import { motion } from "framer-motion";

function Loader({ fullScreen = false, size = 16 }) {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-green-500",
  ];

  return (
    <div
      className={`w-full flex items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-12"
      }`}
    >
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
            className={`rounded-full ${color}`}
            style={{ width: size, height: size }}
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
