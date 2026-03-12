import { motion } from "framer-motion";

function Loader({ fullScreen = false, size = 40, borderWidth = 3, color = "border-blue-500" }) {
  return (
    <div
      className={`w-full flex items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-12"
      }`}
    >
      <motion.div
        className={`rounded-full border-t-${borderWidth} border-${borderWidth} border-gray-200 ${color}`}
        style={{
          width: size,
          height: size,
          borderWidth: borderWidth,
          borderStyle: "solid",
          borderTopColor: "currentColor",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
}

export default Loader;
