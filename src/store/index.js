import { combineReducers } from "redux";
import { reducerItem } from "./NoteList/Reducer";
import { reducerModal } from "./ModalWindow/Reducer";
import { spinner } from "./Spinner/Reducer";

export default combineReducers({
  reducerItem,
  reducerModal,
  spinner,
});
