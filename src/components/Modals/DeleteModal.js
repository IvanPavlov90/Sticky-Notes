import { closeModalAction } from "../../store/ModalWindow/Actions";
import { deleteNote } from "../../store/NoteList/Actions";
import { storeContextHOC } from "../Common/StoreContextConsumerHoc";

function DeleteModalInternal(props) {
  return (
    <div className="modal">
      <p className="modal__delete-text">
        Do you really want to delete <b>{props.header} ?</b>
      </p>
      <div className="modal__btn-container">
        <input
          type="button"
          value="Confirm"
          className="modal__confirm-btn"
          onClick={() => {
            props.store.dispatch(deleteNote(props.id));
            props.store.dispatch(closeModalAction());
          }}
        />
        <input
          type="button"
          value="Close"
          className="modal__close-btn"
          onClick={() => props.store.dispatch(closeModalAction())}
        />
      </div>
    </div>
  );
}

export const DeleteModal = storeContextHOC(DeleteModalInternal);
