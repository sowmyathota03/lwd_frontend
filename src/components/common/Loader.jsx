import { motion } from "framer-motion";

function Loader({
  fullScreen = false,
  size = 40,
  borderWidth = 3,
  color = "border-blue-500", // tailwind color
}) {
  return (
    <div
      className={`w-full flex items-center justify-center ${fullScreen ? "min-h-screen lwd-page" : "py-12"
        }`}
    >
      <motion.div
        className={`rounded-full border-gray-200 ${color} lwd-loader`}
        style={{
          width: size,
          height: size,
          borderWidth: borderWidth,
          borderStyle: "solid",
          borderTopWidth: borderWidth,
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "linear",
        }}
      />
    </div>
  );
}

export default Loader;