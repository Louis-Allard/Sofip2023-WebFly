import { combineReducers } from "redux";
import authReducer from "./authReducer.tsx";

const rootReducer = combineReducers({
  authReducer,
});
export default rootReducer;
