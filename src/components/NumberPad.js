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

const STATE_TABLE = [
  [0, 1, 2, 0, 0],
  [1, 1, 2, 0, 2],
  [2, 3, 2, 0, 2],
  [3, 3, 4, 0, 4],
  [4, 3, 2, 0, 4],
];

function NumberPad({ displayValue = "", setDisplayValue = () => {} }) {
  const [state, setState] = useState(0);
  const [firstOperand, setFirstOperand] = useState(0);
  const [secondOperand, setSecondOperand] = useState(0);
  const [operator, setOperator] = useState(null);

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
      default:
        return;
    }
    const newState = STATE_TABLE[state][inputIndex];
    setState(newState);
    switch (newState) {
      case 0:
        setDisplayValue(0);
        setFirstOperand(0);
        setSecondOperand(0);
        break;
      case 1:
        if (state === 0) {
          setDisplayValue(buttonText);
          setFirstOperand(parseFloat(buttonText));
        } else {
          setDisplayValue(`${displayValue}${buttonText}`);
          setFirstOperand(parseFloat(`${displayValue}${buttonText}`));
        }
        break;
      case 2:
        setSecondOperand(0);
        if (buttonText !== "0") {
          setOperator(buttonText);
        }
        break;
      case 3:
        if (state === 2 || state === 4) {
          setDisplayValue(buttonText);
          setSecondOperand(parseFloat(buttonText));
        } else {
          setDisplayValue(`${displayValue}${buttonText}`);
          setSecondOperand(parseFloat(`${displayValue}${buttonText}`));
        }
        break;
      case 4:
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
        // setSecondOperand(0);
        setDisplayValue(result);
      default:
        break;
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
