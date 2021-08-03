import React from "react";

function ThemeSwitch({ theme = "1", onThemeChange = () => {} }) {
  return (
    <div className="theme-picker">
      <span className="theme-picker__title">Theme</span>
      <div className="theme-picker__switch">
        <div className="switch-option-numbers">
          <label htmlFor="theme-1">1</label>
          <label htmlFor="theme-2">2</label>
          <label htmlFor="theme-3">3</label>
        </div>
        <div className="triple-switch">
          <div className="wrapper">
            <input
              type="radio"
              name="theme"
              id="theme-1"
              value="1"
              onChange={(e) => {
                onThemeChange(e.currentTarget.value);
              }}
              checked={theme === "1"}
              aria-checked={theme === "1" ? "true" : "false"}
            />
            <span></span>
          </div>
          <div className="wrapper">
            <input
              type="radio"
              name="theme"
              id="theme-2"
              value="2"
              onChange={(e) => {
                onThemeChange(e.currentTarget.value);
              }}
              checked={theme === "2"}
              aria-checked={theme === "2" ? "true" : "false"}
            />
            <span></span>
          </div>
          <div className="wrapper">
            <input
              type="radio"
              name="theme"
              id="theme-3"
              value="3"
              onChange={(e) => {
                onThemeChange(e.currentTarget.value);
              }}
              checked={theme === "3"}
              aria-checked={theme === "3" ? "true" : "false"}
            />
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitch;
