// store.js

import { legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// Store

const initStore = {
  connected: localStorage.getItem('connected') === 'true' || false,
  idUser: parseInt(localStorage.getItem('myNumber'), 10) || 0, // Par défaut, 0 si aucune valeur n'est trouvée
  entreprise: localStorage.getItem('entreprise') || '',
  nom: localStorage.getItem('nom') || '',
  prenom: localStorage.getItem('prenom') || ''
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

const setNom = (value) => ({
  type: "setNom",
  payload: value,
});

const setPrenom = (value) => ({
  type: "setPrenom",
  payload: value,
});

// Reducer
const comparisonReducer = (state = initStore, action) => {
  switch (action.type) {
    case "setConnected":
      localStorage.setItem('connected', action.payload.toString());
      return {
        ...state,
        connected: action.payload,
      };
    case "setIdUser":
      localStorage.setItem('myNumber', action.payload.toString());
      return {
        ...state,
        idUser: action.payload,
      };
    case "setEntreprise":
      localStorage.setItem('entreprise', action.payload);
      return {
        ...state,
        entreprise: action.payload,
      };
    case "setNom":
      localStorage.setItem('nom', action.payload);
      return {
        ...state,
        nom: action.payload,
      };
    case "setPrenom":
      localStorage.setItem('prenom', action.payload);
      return {
        ...state,
        prenom: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = legacy_createStore(comparisonReducer, composeWithDevTools());

export { store, setConnected, setIdUser, setEntreprise, setNom, setPrenom };
