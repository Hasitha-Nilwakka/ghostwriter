"use client"
import * as React from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { Button } from "./button";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const mounted = React.useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
    const { resolvedTheme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <Button
            variant="outline"
            size="icon"
            className="rounded-full transition-colors duration-200 relative overflow-hidden cursor-pointer"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <FaSun
                className={`size-4.5 text-amber-500 transition-all duration-200 ${
                    mounted && resolvedTheme === "dark"
                        ? "-rotate-90 scale-0 opacity-0"
                        : "rotate-0 scale-100 opacity-100"
                }`}
            />
            <FaMoon
                className={`absolute size-4 text-sky-400 transition-all duration-200 ${
                    mounted && resolvedTheme === "dark"
                        ? "rotate-0 scale-100 opacity-100"
                        : "rotate-90 scale-0 opacity-0"
                }`}
            />
        </Button>
    );
}