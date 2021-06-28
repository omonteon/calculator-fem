import React from "react";
import Display from "./Display";
import NumberPad from "./NumberPad";
import ThemeSwitch from "./ThemeSwitch";

function Calculator({ displayValue = 399981 }) {
  return (
    <div className="calculator">
      <div className="calculator__header">
        <h2>calc</h2>
        <ThemeSwitch />
      </div>
      <Display value={displayValue} />
      <NumberPad />
    </div>
  );
}

export default Calculator;
