import React from "react";
import "./_DeleteNoteButton.scss";

function DeleteNoteButton(props) {
  const style = {
    backgroundColor: props.backgroundColor,
  }
  return (
    <button style={style} className="note-list__note__button" onClick={props.onClick}>
      <img alt="Delete" src="/pictures/1485477104-basket_78591.png"/>
    </button>
  );
}

export default DeleteNoteButton;
