// store.js

import { legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// Store
const initStore = {
  connected: true,
  idUser: "1",
  entreprise: "",
};

// Actions creators
const setConnected = (value) => ({
  type: "setConnected",
  payload: value,
});

const setIdUser = (value) => ({
  type: "setIdUser",
  payload: value,
});

const setEntreprise = (value) => ({
  type: "setEntreprise",
  payload: value,
});

// Reducer
const comparisonReducer = (state = initStore, action) => {
  switch (action.type) {
    case "setConnected":
      return {
        ...state,
        connected: action.payload,
      };
    case "setIdUser":
      return {
        ...state,
        idUser: action.payload,
      };
    case "setEntreprise":
      return {
        ...state,
        entreprise: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = legacy_createStore(comparisonReducer, composeWithDevTools());

export { store, setConnected, setIdUser, setEntreprise };
