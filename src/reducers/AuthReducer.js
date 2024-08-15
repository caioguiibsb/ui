import {
	CHANGE_EMAIL,
	CHANGE_TOKEN,
	CHANGE_DEVICE_TOKEN,
	CHANGE_NAME,
	CHANGE_RESETAR_SENHA,
} from "../actions/types";

const INITIAL_STATE = {
	token: null,
	isAdmin: false,
	resetarSenha: false,
	email: "",
	name: null,
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
	case CHANGE_TOKEN:
		return { ...state, token: action.payload };
	case CHANGE_DEVICE_TOKEN:
		return { ...state, deviceToken: action.payload };
	case CHANGE_EMAIL:
		return { ...state, email: action.payload };
	case CHANGE_NAME:
		return { ...state, name: action.payload };
	case CHANGE_RESETAR_SENHA:
		return { ...state, resetarSenha: action.payload };
	default:
		return state;
	}
};
