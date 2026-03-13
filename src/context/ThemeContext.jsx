import { createContext, useState, useEffect } from "react";

// Create ThemeContext
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // State to track dark mode
    const [darkMode, setDarkMode] = useState(false);

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            setDarkMode(savedTheme === "dark");
        } else {
            // If no preference, use system setting
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setDarkMode(prefersDark);
        }
    }, []);

    // Apply or remove dark class on <html> whenever darkMode changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    // Toggle theme
    const toggleTheme = () => setDarkMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
} 