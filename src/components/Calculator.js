import React, { useState } from "react";
import Display from "./Display";
import NumberPad from "./NumberPad";
import ThemeSwitch from "./ThemeSwitch";

const THEME_COLORS = { 1: "#3a4663", 2: "#E6E6E6", 3: "#17062a" };

function Calculator({ displayValue = 399981 }) {
  const [theme, setTheme] = useState("1");
  function handleThemeChange(theme) {
    const root = window.document.documentElement;
    root.style.setProperty("--background-color", THEME_COLORS[theme]);
    setTheme(theme);
  }
  return (
    <div className={`calculator theme-${theme}`}>
      <div className="calculator__header">
        <h2>calc</h2>
        <ThemeSwitch theme={theme} onThemeChange={handleThemeChange} />
      </div>
      <Display value={displayValue} />
      <NumberPad />
    </div>
  );
}

export default Calculator;
