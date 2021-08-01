import React, { useState } from "react";
import Display from "./Display";
import NumberPad from "./NumberPad";
import useStateMachine from "../hooks/stateMachine";

function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const { dispatchInput } = useStateMachine(displayValue, setDisplayValue);

  function handleNumberPadButtonClick(event) {
    const input = event.target.innerText;
    dispatchInput(input);
  }
  return (
    <>
      <Display value={displayValue} />
      <NumberPad onButtonClick={handleNumberPadButtonClick} />
    </>
  );
}

export default Calculator;
