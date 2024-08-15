import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import SnackReducer from "./SnackReducer";

const rootReducer = combineReducers({
	AuthReducer,
	SnackReducer
});

export default rootReducer;