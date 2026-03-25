import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export default function ToggleDarkMode() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="lwd-toggle-wrapper">

            {/* Label */}
            <span className="lwd-toggle-label">
                {darkMode ? "Dark Mode" : "Light Mode"}
            </span>

            {/* Toggle */}
            <button
                onClick={toggleTheme}
                className={`lwd-toggle ${darkMode ? "lwd-toggle-dark" : "lwd-toggle-light"
                    }`}
            >
                <span
                    className={`lwd-toggle-thumb ${darkMode
                            ? "lwd-toggle-thumb-dark"
                            : "lwd-toggle-thumb-light"
                        }`}
                />
            </button>

        </div>
    );
}