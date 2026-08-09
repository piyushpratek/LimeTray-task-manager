import { useThemeContext } from "../../context/useThemeContext";

import "./ThemeToggle.css";

function ThemeToggle() {
    const {
        theme,
        toggleTheme,
    } = useThemeContext();

    const isDark = theme === "dark";

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }
            aria-pressed={isDark}
        >
            <span
                className="theme-toggle__icon"
                aria-hidden="true"
            >
                {isDark ? "☀" : "☾"}
            </span>

            <span className="theme-toggle__label">
                {isDark ? "Light" : "Dark"}
            </span>
        </button>
    );
}

export default ThemeToggle;