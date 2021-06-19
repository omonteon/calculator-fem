import React from "react";

const BUTTONS_TEXT = [
  "7",
  "8",
  "9",
  "DEL",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "-",
  ".",
  "0",
  "/",
  "X",
  "RESET",
  "=",
];

function NumberPad() {
  return (
    <div className="number-pad">
      {BUTTONS_TEXT.map((btnText) => {
        return (
          <button key={btnText} type="button">
            {btnText}
          </button>
        );
      })}
    </div>
  );
}

export default NumberPad;
