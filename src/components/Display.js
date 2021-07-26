import React from "react";

function Display({ value = 0 }) {
  return (
    <input
      type="text"
      className="display"
      readOnly={true}
      value={parseFloat(value)
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
    />
  );
}

export default Display;
