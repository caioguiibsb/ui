import {
	CLOSE_SNACK_MESSAGE,
	SHOW_SNACK_MESSAGE
} from "./types";

export const showSnackMessage = (payload) => {
	return {
		type: SHOW_SNACK_MESSAGE,
		...payload
	};
};

export const closeSnackMessage = () => {
	return {
		type: CLOSE_SNACK_MESSAGE,
	};
};