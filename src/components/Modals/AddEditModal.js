import React from "react";
import { closeModalAction } from "../../store/ModalWindow/Actions";
import { addNote, editNote } from "../../store/NoteList/Actions";
import { storeContextHOC } from "../Common/StoreContextConsumerHoc";

class AddEditModalInternal extends React.Component {
  state = {
    headerInputValue: this.props.header,
    textInputValue: this.props.text,
    headerInputError: false,
    textInputError: false,
    headerErrorContainerVisibility: false,
    textErrorContainerVisibility: false,
    headerInputWhiteSpaceError: false,
    headerInputLengthError: false,
    color: this.props.color,
  };

  validator = () => {
    if (
      this.state.textInputValue.length === 0 &&
      this.state.headerInputValue.length === 0
    ) {
      this.setState({
        headerInputError: true,
        headerErrorContainerVisibility: true,
        headerInputWhiteSpaceError: true,
        headerInputLengthError: false,
        textInputError: true,
        textErrorContainerVisibility: true,
      });
      return false;
    }
    if (
      this.state.textInputValue.length === 0 &&
      this.state.headerInputValue.length > 30
    ) {
      this.setState({
        headerInputError: true,
        headerErrorContainerVisibility: true,
        headerInputWhiteSpaceError: false,
        headerInputLengthError: true,
        textInputError: true,
        textErrorContainerVisibility: true,
      });
      return false;
    }
    if (
      this.state.textInputValue.length > 0 &&
      this.state.headerInputValue.length > 30
    ) {
      this.setState({
        headerInputError: true,
        headerErrorContainerVisibility: true,
        headerInputWhiteSpaceError: false,
        headerInputLengthError: true,
        textInputError: false,
        textErrorContainerVisibility: false,
      });
      return false;
    }
    return true;
  };

  changeHeaderValidation(text) {
    this.setState({ headerInputValue: text });
    text.length === 0
      ? this.setState({
          headerInputError: true,
          headerErrorContainerVisibility: true,
          headerInputWhiteSpaceError: true,
          headerInputLengthError: false,
        })
      : text.length > 30
      ? this.setState({
          headerInputError: true,
          headerErrorContainerVisibility: true,
          headerInputWhiteSpaceError: false,
          headerInputLengthError: true,
        })
      : this.setState({
          headerInputError: false,
          headerErrorContainerVisibility: false,
          headerInputWhiteSpaceError: false,
          headerInputLengthError: false,
        });
  }

  changeTextValidation(text) {
    this.setState({ textInputValue: text });
    text.length === 0
      ? this.setState({
          textInputError: true,
          textErrorContainerVisibility: true,
        })
      : this.setState({
          textInputError: false,
          textErrorContainerVisibility: false,
        });
  }

  changeColor(itemColor) {
    this.setState({ color: itemColor });
  }

  sendData() {
    if (this.validator() && this.props.id === "") {
      this.props.store.dispatch(
        addNote(
          this.state.headerInputValue,
          this.state.textInputValue,
          this.state.color,
        )
      );
      this.props.store.dispatch(closeModalAction());
    }
    if (this.validator() && this.props.id !== "") {
      this.props.store.dispatch(
        editNote(
          this.props.id,
          this.state.headerInputValue,
          this.state.textInputValue,
          this.state.color,
        )
      );
      this.props.store.dispatch(closeModalAction());
    }
  }

  render() {
    const headerInputClass = this.state.headerInputError
      ? "modal__input error"
      : "modal__input";
    const textInputClass = this.state.textInputError
      ? "modal__textarea error"
      : "modal__textarea";
    const headerErrorClass = this.state.headerErrorContainerVisibility
      ? "modal__error-notification"
      : "modal__error-notification  invisible";
    const textErrorClass = this.state.textErrorContainerVisibility
      ? "modal__error-notification"
      : "modal__error-notification  invisible";
    const headerWhiteSpaceErrorText = this.state.headerInputWhiteSpaceError
      ? "Header cant consist only of white spaces"
      : "";
    const headerLengthErrorText = this.state.headerInputLengthError
      ? "Length cant be more then 30 symbols"
      : "";
    return (
      <div className="modal">
        <input
          type="text"
          className={headerInputClass}
          placeholder="Введите заголовок"
          defaultValue={this.props.header}
          onChange={(event) =>
            this.changeHeaderValidation(event.target.value.trim())
          }
        />
        <span className={headerErrorClass}>
          {headerWhiteSpaceErrorText} {headerLengthErrorText}
        </span>
        <textarea
          className={textInputClass}
          placeholder="Текст заметки"
          defaultValue={this.props.text}
          onChange={(event) =>
            this.changeTextValidation(event.target.value.trim())
          }
        />
        <span className={textErrorClass}>
          Text can't consist only of white spaces
        </span>
        <label htmlFor="color" className="modal__color__label">
          {" "}
          Choose note color:
          <input
            id="color"
            type="color"
            className="modal__color"
            defaultValue={this.props.color}
            onChange={(event) => this.changeColor(event.target.value)}
          />
        </label>
        <div className="modal__btn-container">
          <input
            type="submit"
            value={this.props.type === "Edit" ? "Save" : "Create Note"}
            className="modal__confirm-btn"
            onClick={(event) => {
              event.preventDefault();
              this.sendData();
            }}
          />
          <input
            type="button"
            value="Close"
            className="modal__close-btn"
            onClick={() => this.props.store.dispatch(closeModalAction())}
          />
        </div>
      </div>
    );
  }
}

export const AddEditModal = storeContextHOC(AddEditModalInternal);
