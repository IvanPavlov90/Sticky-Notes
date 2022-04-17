import React from "react";
import "./_Spinner.scss";

export function Spinner(props) {
  return props.loading ? (
    <div>
      <div className="spinner"></div>
      <p className="spinner__text">{props.text}</p>
    </div>
  ) : null;
}
