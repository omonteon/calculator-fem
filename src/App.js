import React, { useState } from "react";
import ReactDOM from "react-dom";
import ThemeSwitch from "./components/ThemeSwitch";
import Calculator from "./components/Calculator";
import "./App.css";

// In this project I'm learning/Using for the first time:
// BEM
// CSS Variables
// CSS Grid
// Figma

// Resources that helped me with the project
// https://webdesign.tutsplus.com/tutorials/how-to-make-custom-accessible-checkboxes-and-radio-buttons--cms-32074
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript

const THEME_BG_COLOR = { 1: "#3a4663", 2: "#E6E6E6", 3: "#17062a" };

function App() {
  const [theme, setTheme] = useState("1");

  function handleThemeChange(theme) {
    const root = window.document.documentElement;
    root.style.setProperty("--background-color", THEME_BG_COLOR[theme]);
    setTheme(theme);
  }
  return (
    <>
      <div className={`app theme-${theme}`}>
        <div className="app__header">
          <h2>calc</h2>
          <ThemeSwitch theme={theme} onThemeChange={handleThemeChange} />
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
