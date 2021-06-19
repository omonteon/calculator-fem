import React from "react";

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

function NumberPad() {
  return (
    <div className="number-pad">
      {BUTTONS.map((btn) => {
        return (
          <button key={btn.text} type="button" className={btn.type || ""}>
            <span className="btn__text">{btn.text}</span>
          </button>
        );
      })}
    </div>
  );
}

export default NumberPad;
