import React from "react";
import { showModal } from "../../store/ModalWindow/Actions";
import AddNoteButton from "../AddNoteButton/AddNoteButton";
import { storeContextHOC } from "../Common/StoreContextConsumerHoc";
import { NoteItem } from "../NoteItem/NoteItem";
import { AddEditModal } from "../Modals/AddEditModal";
import "./_NoteList.scss";
import { getNotes } from "../../store/NoteList/Actions";
import { Spinner } from "../Spinner/Spinner";
import { DeleteModal } from "../Modals/DeleteModal";

class NoteListInternal extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
    this.props.store.dispatch(getNotes());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  openEditModal(note) {
    this.props.store.dispatch(
      showModal(
        <AddEditModal
          id={note.id}
          header={note.header}
          text={note.text}
          color={note.color}
          type="Edit"
        />
      )
    );
  }

  openDeleteModal(event, note) {
    event.stopPropagation();
    this.props.store.dispatch(
      showModal(
        <DeleteModal id={note.id} header={note.header} />
      )
    );
  }

  openAddModal() {
    this.props.store.dispatch(
      showModal(
        <AddEditModal
          id=""
          header=""
          text=""
          color="#ffffff"
          type="Add"
        />
      )
    )
  }

  renderItems() {
    return this.props.store.getState().spinner.loading
      ? null
      : this.props.store.getState().reducerItem.searchMode
      ? this.props.store.getState().reducerItem.filterNotes.map((item) => {
          return (
            <NoteItem
              key={item.id}
              note={item}
              handler={() => this.openEditModal(item)}
              openDeleteModal={(event) => this.openDeleteModal(event, item)}
            />
          );
        })
      : this.props.store.getState().reducerItem.notes.map((item) => {
          return (
            <NoteItem
              key={item.id}
              note={item}
              handler={() => this.openEditModal(item)}
              openDeleteModal={(event) => this.openDeleteModal(event, item)}
            />
          );
        })
  }

  render() {
    const style = this.props.store.getState().spinner.loading
      ? "note-list"
      : "note-list note-list_column"; 
    return (
      <div className={style}>
        {this.renderItems()}
        {this.props.store.getState().spinner.loading ? null : (
          <AddNoteButton
            onClick={() => this.openAddModal()}
          />
        )}
        <Spinner
          loading={this.props.store.getState().spinner.loading}
          text={this.props.store.getState().spinner.text}
        />
      </div>
    );
  }
}

export const NoteList = storeContextHOC(NoteListInternal);
