import { useState } from "react";
import exactMath from "exact-math";

const OPERAND = { FIRST: 1, SECOND: 2 };
const INPUT = {
  ZERO: 0,
  DIGIT: 1,
  OPERATOR: 2,
  RESET: 3,
  EQUALS: 4,
  DEL: 5,
  DECIMAL_POINT: 6,
};
const STATE_TABLE = [
  [0, 1, 2, 0, 0, 0, 5], // State 0 Initial state
  [1, 1, 2, 0, 2, 1, 5], // State 1 firstOperand
  [3, 3, 2, 0, 2, 2, 3], // State 2 operator
  [3, 3, 4, 0, 4, 3, 6], // State 3 secondOperand
  [4, 3, 2, 0, 4, 4, 4], // State 4 result
  [1, 1, 0, 0, 0, 0, 5], // State 5 decimalPoint firstOperand
  [3, 3, 4, 0, 4, 3, 5], // State 6 decimalPoint secondOperand
];

export default function useStateMachine(displayValue, setDisplayValue) {
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
  function handleNumberButtonClick(input, operandNumber = OPERAND.FIRST) {
    if (parseFloat(displayValue) === 0 && !displayValue.includes(".")) {
      setDisplayValue(input);
      setFirstOperand(parseFloat(input));
    } else if (operandNumber === OPERAND.FIRST) {
      setDisplayValue(`${displayValue}${input}`);
      setFirstOperand(parseFloat(`${displayValue}${input}`));
    } else if (operandNumber === OPERAND.SECOND) {
      // If previous state was 2 or 4 (It was in the middle of an operation)
      if (state === 2 || state === 4) {
        if (input === ".") {
          setDisplayValue("0.");
        } else {
          setDisplayValue(input);
        }
        setSecondOperand(parseFloat(input));
      } else {
        setDisplayValue(`${displayValue}${input}`);
        setSecondOperand(parseFloat(`${displayValue}${input}`));
      }
    }
  }
  function handleDecimalPointClick() {
    if (!displayValue.includes(".")) {
      setDisplayValue(`${displayValue}.`);
    }
  }
  function calculateResult(input) {
    let result = 0;
    console.log(operator);
    switch (operator) {
      case "+":
        result = exactMath.add(firstOperand, secondOperand);
        break;
      case "-":
        result = exactMath.sub(firstOperand, secondOperand);
        break;
      case "x":
        result = exactMath.mul(firstOperand, secondOperand);
        break;
      case "/":
        result = exactMath.div(firstOperand, secondOperand);
        console.log(result);
        break;
      default:
        throw new Error(`The operator ${operator} is invalid`);
    }
    if (input.match(/[+-x/]/) !== null) {
      setOperator(operator);
    }
    setFirstOperand(result);
    setDisplayValue(`${result}`);
  }
  function getNewState(input) {
    switch (input) {
      case "0":
        return STATE_TABLE[state][INPUT.ZERO];
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return STATE_TABLE[state][INPUT.DIGIT];
      case "+":
      case "-":
      case "x":
      case "/":
        return STATE_TABLE[state][INPUT.OPERATOR];
      case "RESET":
        return STATE_TABLE[state][INPUT.RESET];
      case "=":
        return STATE_TABLE[state][INPUT.EQUALS];
      case "DEL":
        return STATE_TABLE[state][INPUT.DEL];
      case ".":
        return STATE_TABLE[state][INPUT.DECIMAL_POINT];
      default:
        throw new Error(`Unknown input: ${input}`);
    }
  }
  function handleStateChange(newState, input) {
    setState(newState);
    switch (newState) {
      case 0:
        setDisplayValue("0");
        setFirstOperand(0);
        setSecondOperand(0);
        break;
      case 1:
        if (input === "DEL") {
          handleDeleteButtonClick();
        } else {
          handleNumberButtonClick(input, OPERAND.FIRST);
        }
        break;
      case 2:
        setSecondOperand(0);
        if (input !== "0") {
          setOperator(input);
        }
        break;
      case 3:
        if (input === "DEL") {
          handleDeleteButtonClick();
        } else {
          handleNumberButtonClick(input, OPERAND.SECOND);
        }
        break;
      case 4:
        if (input === "DEL") {
          handleDeleteButtonClick();
        } else if (operator === "/" && secondOperand === 0) {
          alert("Cannot divide by zero");
          setState(0);
        } else {
          calculateResult(input);
        }
        break;
      case 5:
      case 6:
        if (input === "DEL") {
          handleDeleteButtonClick();
        } else {
          handleDecimalPointClick();
        }
        break;
      default:
        throw new Error(`The state ${newState} is not supported`);
    }
  }
  function onInput(input) {
    const newState = getNewState(input);
    handleStateChange(newState, input);
    console.log(
      state,
      newState,
      `First: ${firstOperand}, Second: ${secondOperand}, Operator ${operator}`
    );
  }
  function dispatchInput(input) {
    onInput(input);
  }

  return {
    dispatchInput,
  };
}
