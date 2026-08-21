import { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("portfolio-theme") || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("portfolio-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}