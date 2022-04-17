import { ItemData } from "../../services/DataService";
import { hideSpinner, showSpinner } from "../Spinner/Actions";
import { modalNotesTypes } from "./ActionTypes";

let counter = 9;

function getID() {
  return counter++;
}

export const getNotes = () => {
  return async (dispatch) => {
    dispatch(showSpinner("Loading Notes..."));
    await ItemData.getNotes().then((value) => {
      dispatch(getNotesAction(value));
      dispatch(hideSpinner());
    });
  };
};

export const addNote = (headerText, text, itemColor) => {
  return async (dispatch) => {
    dispatch(showSpinner("Adding note..."));
    await ItemData.addNote(headerText, text, itemColor).then((value) => {
      dispatch(addNoteAction(value.headerText, value.text, value.itemColor));
      dispatch(hideSpinner());
    });
  };
};

export const editNote = (id, headerText, text, itemColor) => {
  return async (dispatch) => {
    dispatch(showSpinner("Editing note..."));
    await ItemData.editNote(id, headerText, text, itemColor).then((value) => {
      dispatch(
        editNotesAction(value.id, value.headerText, value.text, value.itemColor)
      );
      dispatch(hideSpinner());
    });
  };
};

export const deleteNote = (id) => {
  return async (dispatch) => {
    dispatch(showSpinner('Deleting note...'));
    await ItemData.deleteNote(id).then((value) => {
      dispatch(deleteNoteAction(value));
      dispatch(hideSpinner());
    });
  };
};

export const searchNote = (value) => {
  if (value.length === 0) {
    return {
      type: modalNotesTypes.search,
      payload: {
        searchMode: false,
      },
    };
  }
  return {
    type: modalNotesTypes.search,
    payload: {
      searchMode: true,
      searchValue: value,
    },
  };
};

const getNotesAction = (notes) => {
  return {
    type: modalNotesTypes.getNotes,
    payload: {
      notes: notes,
    },
  };
};

const editNotesAction = (id, headerText, text, itemColor) => {
  return {
    type: modalNotesTypes.editNote,
    payload: {
      id: id,
      header: headerText,
      text: text,
      color: itemColor,
    },
  };
};

const deleteNoteAction = (id) => ({
  type: modalNotesTypes.deleteNote,
  payload: {
    id: id,
  },
});

const addNoteAction = (headerText, text, itemColor) => ({
  type: modalNotesTypes.addNote,
  payload: {
    id: getID(),
    header: headerText,
    text: text,
    color: itemColor,
  },
});
