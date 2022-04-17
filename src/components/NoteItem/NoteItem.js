import React from "react";
import { storeContextHOC } from "../Common/StoreContextConsumerHoc";
import DeleteNoteButton from "../DeleteNoteButton/deleteNoteButton";
import "./_NoteItem.scss";

function NoteItemInternal(props) {
  const style = {
    backgroundColor: props.note.color,
  };
  return (
    <div
      id={props.note.id}
      className="note-list__note"
      style={style}
      onClick={props.handler}
    >
      <h2 className="note-list__note__header">{props.note.header}</h2>
      <p className="note-list__note__text">{props.note.text}</p>
      <DeleteNoteButton
        backgroundColor={props.note.color}
        onClick={props.openDeleteModal}
      />
    </div>
  );
}

export const NoteItem = storeContextHOC(NoteItemInternal);
