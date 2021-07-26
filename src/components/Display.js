import React from "react";

function Display({ value = 0 }) {
  const formattedValue = parseFloat(value)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return (
    <input
      type="text"
      className={`display ${formattedValue.length > 15 ? "long-number" : ""}`}
      readOnly={true}
      value={formattedValue}
    />
  );
}

export default Display;
