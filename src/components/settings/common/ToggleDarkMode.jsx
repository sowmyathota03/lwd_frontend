import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export default function ToggleDarkMode() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-between gap-4">
      
      {/* Label Section */}
      <div>
        <p className="font-medium text-gray-800 dark:text-white">
          {darkMode ? "Dark Mode" : "Light Mode"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Switch your app theme
        </p>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={toggleTheme}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 
          ${darkMode ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300
            ${darkMode ? "translate-x-5" : "translate-x-1"}`}
        />
      </button>

    </div>
  );
}