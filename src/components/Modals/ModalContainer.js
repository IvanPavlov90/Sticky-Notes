import React from "react";
import ReactDOM from "react-dom";
import { storeContextHOC } from "../Common/StoreContextConsumerHoc";
import { subscribeHOC } from "../Common/SubscribeHoc";
import "./_modals.scss";

class ModalContainerInternal extends React.Component {
  modalRenderer = (element) => (
    <>
      <div className="wrapper"></div>
      {element}
    </>
  );

  render() {
    return this.props.store.getState().reducerModal.open
      ? ReactDOM.createPortal(
          this.modalRenderer(this.props.store.getState().reducerModal.element),
          document.body
        )
      : null;
  }
}

export const ModalContainer = storeContextHOC(subscribeHOC(ModalContainerInternal));
