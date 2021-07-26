import React from "react";

function Display({ value = 0 }) {
  const formattedValue = numberWithCommas(value);

  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
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
