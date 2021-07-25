import React, { useState } from "react";
import Display from "./Display";
import NumberPad from "./NumberPad";
import ThemeSwitch from "./ThemeSwitch";
import useStateMachine from "../utils/stateMachine";

const THEME_COLORS = { 1: "#3a4663", 2: "#E6E6E6", 3: "#17062a" };

function Calculator() {
  const [theme, setTheme] = useState("1");
  const [displayValue, setDisplayValue] = useState("0");
  const { dispatchInput } = useStateMachine(displayValue, setDisplayValue);

  function handleThemeChange(theme) {
    const root = window.document.documentElement;
    root.style.setProperty("--background-color", THEME_COLORS[theme]);
    setTheme(theme);
  }
  function handleNumberPadButtonClick(event) {
    const input = event.target.innerText;
    dispatchInput(input);
  }
  return (
    <div className={`calculator theme-${theme}`}>
      <div className="calculator__header">
        <h2>calc</h2>
        <ThemeSwitch theme={theme} onThemeChange={handleThemeChange} />
      </div>
      <Display value={displayValue} />
      <NumberPad onButtonClick={handleNumberPadButtonClick} />
    </div>
  );
}

export default Calculator;
