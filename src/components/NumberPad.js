import React, { useState } from "react";

const BUTTONS = [
  { text: "7" },
  { text: "8" },
  { text: "9" },
  { text: "DEL", type: "secondary" },
  { text: "4" },
  { text: "5" },
  { text: "6" },
  { text: "+" },
  { text: "1" },
  { text: "2" },
  { text: "3" },
  { text: "-" },
  { text: "." },
  { text: "0" },
  { text: "/" },
  { text: "x" },
  { text: "RESET", type: "secondary" },
  { text: "=", type: "primary" },
];

const OPERAND = { FIRST: 1, SECOND: 2 };

const STATE_TABLE = [
  [0, 1, 2, 0, 0, 0, 5], // State 0
  [1, 1, 2, 0, 2, 1, 5], // State 1
  [3, 3, 2, 0, 2, 2, 3], // State 2
  [3, 3, 4, 0, 4, 3, 6], // State 3
  [4, 3, 2, 0, 4, 4, 4], // State 4
  [1, 1, 0, 0, 0, 0, 5], // State 5
  [3, 3, 4, 0, 4, 3, 5], // State 6
];

function NumberPad({ displayValue = "", setDisplayValue = () => {} }) {
  const [state, setState] = useState(0);
  const [firstOperand, setFirstOperand] = useState(0);
  const [secondOperand, setSecondOperand] = useState(0);
  const [operator, setOperator] = useState(null);

  function handleDeleteButtonClick() {
    if (displayValue.length > 1) {
      setDisplayValue((displayValue) => {
        return displayValue.slice(0, -1);
      });
      setFirstOperand((firstOperand) => {
        return parseFloat(firstOperand.toString().slice(0, -1));
      });
    } else {
      setDisplayValue("0");
      setFirstOperand(0);
    }
  }
  function handleNumberButtonClick(buttonText, operandNumber = OPERAND.FIRST) {
    if (parseFloat(displayValue) === 0 && !displayValue.includes(".")) {
      setDisplayValue(buttonText);
      setFirstOperand(parseFloat(buttonText));
    } else if (operandNumber === OPERAND.FIRST) {
      setDisplayValue(`${displayValue}${buttonText}`);
      setFirstOperand(parseFloat(`${displayValue}${buttonText}`));
    } else if (operandNumber === OPERAND.SECOND) {
      // If previous state was 2 or 4 (It was in the middle of a transition)
      if (state === 2 || state === 4) {
        if (buttonText === ".") {
          setDisplayValue("0.");
        } else {
          setDisplayValue(buttonText);
        }
        setSecondOperand(parseFloat(buttonText));
      } else {
        setDisplayValue(`${displayValue}${buttonText}`);
        setSecondOperand(parseFloat(`${displayValue}${buttonText}`));
      }
    }
  }
  function handleDecimalPointClick() {
    if (!displayValue.includes(".")) {
      setDisplayValue(`${displayValue}.`);
    }
  }
  function calculateResult(buttonText) {
    let result = 0;
    console.log(operator);
    if (operator === "+") {
      result = firstOperand + secondOperand;
    } else if (operator === "-") {
      result = firstOperand - secondOperand;
    } else if (operator === "x") {
      result = firstOperand * secondOperand;
    } else if (operator === "/") {
      result = firstOperand / secondOperand;
    }
    if (
      buttonText.includes("+") ||
      buttonText.includes("-") ||
      buttonText.includes("x") ||
      buttonText.includes("/")
    ) {
      setOperator(buttonText);
    }
    setFirstOperand(result);
    setDisplayValue(result.toString());
  }
  function handleButtonClick(event) {
    let inputIndex = null;
    const buttonText = event.target.innerText;
    switch (buttonText) {
      case "0":
        inputIndex = 0;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        inputIndex = 1;
        break;
      case "+":
      case "-":
      case "x":
      case "/":
        inputIndex = 2;
        break;
      case "RESET":
        inputIndex = 3;
        break;
      case "=":
        inputIndex = 4;
        break;
      case "DEL":
        inputIndex = 5;
        break;
      case ".":
        inputIndex = 6;
        break;
      default:
        return;
    }
    const newState = STATE_TABLE[state][inputIndex];
    setState(newState);
    switch (newState) {
      case 0:
        setDisplayValue("0");
        setFirstOperand(0);
        setSecondOperand(0);
        break;
      case 1:
        // TODO: Maybe a new state for DEL to delete these conditions
        if (buttonText === "DEL") {
          handleDeleteButtonClick();
        } else {
          handleNumberButtonClick(buttonText, OPERAND.FIRST);
        }
        break;
      case 2:
        setSecondOperand(0);
        if (buttonText !== "0") {
          setOperator(buttonText);
        }
        break;
      case 3:
        if (buttonText === "DEL") {
          handleDeleteButtonClick();
        } else {
          handleNumberButtonClick(buttonText, OPERAND.SECOND);
        }
        break;
      case 4:
        if (buttonText === "DEL") {
          handleDeleteButtonClick();
        } else {
          calculateResult(buttonText);
        }
        break;
      case 5:
      case 6:
        if (buttonText === "DEL") {
          handleDeleteButtonClick();
        } else {
          handleDecimalPointClick();
        }
        break;
      default:
        throw new Error(`The state ${newState} is not supported`);
    }
    console.log(
      state,
      newState,
      `First: ${firstOperand}, Second: ${secondOperand}, Operator ${operator}`
    );
  }
  return (
    <div className="number-pad">
      {BUTTONS.map((btn) => {
        return (
          <button
            key={btn.text}
            type="button"
            className={btn.type || ""}
            onClick={handleButtonClick}
          >
            <span className="btn__text">{btn.text}</span>
          </button>
        );
      })}
    </div>
  );
}

export default NumberPad;
