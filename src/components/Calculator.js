import React from "react";
import Display from "./Display";
import NumberPad from "./NumberPad";

function Calculator({ displayValue = 0 }) {
  return (
    <div className="calculator">
      <Display value={displayValue} />
      <NumberPad />
    </div>
  );
}

export default Calculator;
