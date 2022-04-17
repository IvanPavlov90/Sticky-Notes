import { modalActionTypes } from "./ActionTypes";

export const showModal = (modalelement) => ({
  type: modalActionTypes.openModal,
  payload: {
    open: true,
    element: modalelement,
  },
});

export const closeModalAction = () => ({
  type: modalActionTypes.hideModal,
  payload: {
    open: false,
  },
});
