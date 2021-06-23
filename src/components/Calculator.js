import React from "react";
import Display from "./Display";
import NumberPad from "./NumberPad";
import Switch from "./Switch";

function Calculator({ displayValue = 399981 }) {
  return (
    <div className="calculator">
      <div className="calculator__header">
        <h2>calc</h2>
        <Switch />
      </div>
      <Display value={displayValue} />
      <NumberPad />
    </div>
  );
}

export default Calculator;
