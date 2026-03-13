import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export default function ToggleDarkMode() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="flex items-center gap-3">
            {/* Label */}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {darkMode ? "Dark Mode" : "Light Mode"}
            </span>

            {/* Toggle Switch */}
            <button
                onClick={toggleTheme}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ease-in-out
          ${darkMode ? "bg-green-500" : "bg-gray-400"}`}
            >
                <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out
            ${darkMode ? "translate-x-7" : "translate-x-1"}`}
                />
            </button>
        </div>
    );
}