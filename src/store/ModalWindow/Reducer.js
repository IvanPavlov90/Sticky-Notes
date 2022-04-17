const initialState = {
  open: false,
  element: null,
}

function reducerModal (state = initialState, action) {
  switch (action.type) {
    case 'open_modal':
      return Object.assign({}, state, {
        open: action.payload.open,
        element: action.payload.element,
      });
    case 'close_modal':
      return Object.assign({}, state, {
        open: action.payload.open,
      });   
    default:
      return state;
    }
}

export { reducerModal };