import React from "react";

function Display({ value = 0 }) {
  return (
    <input
      type="text"
      className="display"
      readOnly={true}
      value={parseFloat(value).toLocaleString()}
    />
  );
}

export default Display;
