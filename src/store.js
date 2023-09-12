// store.js

import { legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Store

const initStore = {
  connected: false,
  idUser: 0, // Par défaut, 0 si aucune valeur n'est trouvée
  entreprise: '',
  nom: '',
  prenom: '',
  role: '',
  destinataireTchat: '',
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

const setRole = (value) => ({
  type: "setRole",
  payload: value,
});

const setDestinataireTchat = (value) => ({
  type: "setDestinataireTchat",
  payload: value,
});

// Reducer
const rootReducers = (state = initStore, action) => {
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
    case "setNom":
      return {
        ...state,
        nom: action.payload,
      };
    case "setPrenom":
      return {
        ...state,
        prenom: action.payload,
      };
    case "setRole":
      return {
        ...state,
        role: action.payload,
      };
    case "setDestinataireTchat":
      return {
        ...state,
        destinataireTchat: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const persistConfig = {
  key: 'root', // La clé racine pour le stockage local
  storage, // Utilisez le stockage local (vous pouvez changer cela en sessionStorage ou tout autre stockage)
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = legacy_createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

export { store, persistor, setConnected, setIdUser, setEntreprise, setNom, setPrenom, setRole, setDestinataireTchat };
