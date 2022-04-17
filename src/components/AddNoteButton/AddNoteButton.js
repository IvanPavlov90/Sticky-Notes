import React from "react";
import "./_AddNoteButton.scss";

function AddNoteButton(props) {
  return (
    <input
      type="button"
      className="container__add-note-btn"
      value="+"
      onClick={props.onClick}
    />
  );
}

export default AddNoteButton;
