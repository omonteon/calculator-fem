import React from "react";

function Display({ value = 0 }) {
  return <div className="display">{parseFloat(value).toLocaleString()}</div>;
}

export default Display;
