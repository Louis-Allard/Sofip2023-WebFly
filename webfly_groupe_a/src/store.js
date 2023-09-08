// store.js

import { legacy_createStore } from "redux";

// Store

// const initStore = {
//     valueA: "",
//     valueB: "",
// };

// Actions creators

// const setValueA = (value) => ({
//     type: "setValueA",
//     payload: value,
// });

// const setValueB = (value) => ({
//     type: "setValueB",
//     payload: value,
// });

// Reducer

// const comparisonReducer = (state = initStore, action) => {
//     switch (action.type) {
//         case "setValueA":
//             return {
//                 ...state,
//                 valueA: action.payload,
//             };
//         case "setValueB":
//             return {
//                 ...state,
//                 valueB: action.payload,
//             };
//         default:
//             return state;
//     }
// };

// Create the Redux store
const store = legacy_createStore(comparisonReducer);

// Export values
// export { store, setValueA, setValueB };
export { store };
