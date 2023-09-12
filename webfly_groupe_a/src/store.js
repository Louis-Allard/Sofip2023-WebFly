// ../store.js
import { createStore, combineReducers } from 'redux';

// Actions creators
const setConversationParams = (discutionId, utilisateurId) => ({
    type: 'SET_CONVERSATION_PARAMS',
    payload: { discutionId, utilisateurId },
});

// Reducer
const initialState = {
    discutionId: null,
    utilisateurId: null,
};

const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CONVERSATION_PARAMS':
            return {
                ...state,
                discutionId: action.payload.discutionId,
                utilisateurId: action.payload.utilisateurId,
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    conversation: conversationReducer,
    // Autres réducteurs de votre application
});

// Create the Redux store
const store = createStore(rootReducer);

export { store, setConversationParams }; // Assurez-vous d'exporter l'action ici
