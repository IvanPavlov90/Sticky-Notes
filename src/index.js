import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./App";
import { compose, applyMiddleware, createStore } from "redux";
import combineReducers from "./store/index";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers,
  composeEnhancers(applyMiddleware(thunk))
);
export const myContext = React.createContext(store);

ReactDOM.render(
  <React.StrictMode>
    <myContext.Provider value={store}>
      <App />
    </myContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
