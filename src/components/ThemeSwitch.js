import React, { useState } from "react";

function ThemeSwitch() {
  const [theme, setTheme] = useState("1");
  return (
    <div className="theme-picker">
      <span className="theme-picker__title">Theme</span>
      <div className="theme-picker__switch">
        <div className="switch-option-numbers">
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>
        <div className="triple-switch">
          <div className="wrapper">
            <input
              type="radio"
              name="theme"
              id="theme-1"
              value="1"
              onChange={(e) => {
                setTheme(e.currentTarget.value);
              }}
              checked={theme === "1"}
              aria-checked={theme === "1" ? "true" : "false"}
            />
            <label htmlFor="theme-1"></label>
          </div>
          <div className="wrapper">
            <input
              type="radio"
              name="theme"
              id="theme-2"
              value="2"
              onChange={(e) => {
                setTheme(e.currentTarget.value);
              }}
              checked={theme === "2"}
              aria-checked={theme === "2" ? "true" : "false"}
            />
            <label htmlFor="theme-2"></label>
          </div>
          <div className="wrapper">
            <input
              type="radio"
              name="theme"
              id="theme-3"
              value="3"
              onChange={(e) => {
                setTheme(e.currentTarget.value);
              }}
              checked={theme === "3"}
              aria-checked={theme === "3" ? "true" : "false"}
            />
            <label htmlFor="theme-3"></label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitch;
