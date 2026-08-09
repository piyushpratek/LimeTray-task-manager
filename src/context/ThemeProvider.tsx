import {
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    ThemeContext,
    type Theme,
} from "./ThemeContext";

interface ThemeProviderProps {
    children: ReactNode;
}

const THEME_STORAGE_KEY = "limetray-theme";

function getInitialTheme(): Theme {
    const storedTheme =
        localStorage.getItem(THEME_STORAGE_KEY);

    if (
        storedTheme === "light" ||
        storedTheme === "dark"
    ) {
        return storedTheme;
    }

    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    return prefersDark ? "dark" : "light";
}

export function ThemeProvider({
    children,
}: ThemeProviderProps) {
    const [theme, setTheme] =
        useState<Theme>(getInitialTheme);

    const toggleTheme = useCallback(() => {
        setTheme((currentTheme) =>
            currentTheme === "light"
                ? "dark"
                : "light"
        );
    }, []);

    useEffect(() => {
        document.documentElement.dataset.theme =
            theme;

        localStorage.setItem(
            THEME_STORAGE_KEY,
            theme
        );
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}