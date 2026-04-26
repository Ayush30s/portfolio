import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="theme-toggle-thumb">
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
    </button>
  );
};

export default ThemeToggle;
