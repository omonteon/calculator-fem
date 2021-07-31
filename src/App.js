import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ThemeSwitch from "./components/ThemeSwitch";
import Calculator from "./components/Calculator";
import "./App.css";

// In this project I'm learning/using for the first time:
// BEM
// CSS custom properties(variables)
// CSS Grid
// Color scheme media query

// Resources that helped me with the project
// https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
// https://webdesign.tutsplus.com/tutorials/how-to-make-custom-accessible-checkboxes-and-radio-buttons--cms-32074
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
// https://www.joshwcomeau.com/react/dark-mode/#adding-a-toggle
// https://www.joshwcomeau.com/animation/3d-button/
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript

const THEME_BG_COLOR = { 1: "#3a4663", 2: "#E6E6E6", 3: "#17062a" };

function App() {
  const defaultTheme = getDefaultTheme();
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    localStorage.setItem("selected-theme", theme);
    const root = window.document.documentElement;
    root.style.setProperty("--background-color", THEME_BG_COLOR[theme]);
  }, [theme]);

  function getDefaultTheme() {
    const persistedThemePreference = localStorage.getItem("selected-theme");
    const hasPersistedPreference = typeof persistedThemePreference === "string";

    if (hasPersistedPreference) {
      return persistedThemePreference;
    }
    try {
      // If they haven't been explicit, let's check the media query
      const preferedColorScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      const hasMediaQueryPreference =
        typeof preferedColorScheme.matches === "boolean";

      if (hasMediaQueryPreference) {
        return preferedColorScheme.matches ? "1" : "2";
      }
    } catch (error) {
      throw new Error("prefers-color-scheme is not supported by the browser");
    }

    // Default to Light
    return "2";
  }

  return (
    <>
      <div className={`app theme-${theme}`}>
        <div className="app__header">
          <h2>calc</h2>
          <ThemeSwitch theme={theme} onThemeChange={setTheme} />
        </div>
        <Calculator />
        <div className="attribution">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="https://github.com/omonteon">Omar Monteon</a>.
        </div>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
