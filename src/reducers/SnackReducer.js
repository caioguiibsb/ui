import {
	SHOW_SNACK_MESSAGE,
	CLOSE_SNACK_MESSAGE
} from "../actions/types";

const INITIAL_STATE = {
	open: false,
	duration: 2000,
	message: "",
	severity: "success" /** error | warning | info */
};


export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SHOW_SNACK_MESSAGE:
			return {
				...state,
				open: true,
				message: action.message,
				duration: action.duration || state.duration,
				severity: action.severity || state.severity,
			};
		case CLOSE_SNACK_MESSAGE:
			return INITIAL_STATE;
		default:
			return state;
	}
};
