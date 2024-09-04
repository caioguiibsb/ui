import Cookies from "js-cookie";

import {
	CHANGE_TOKEN,
	CHANGE_EMAIL,
	CHANGE_NAME,
	CHANGE_RESETAR_SENHA,
	CHANGE_DEVICE_TOKEN,
} from "./types";


export const changeEmail = (email) => {
	return {
		type: CHANGE_EMAIL,
		payload: email
	};
};

export const changeDeviceToken = (token) => {
	return {
		type: CHANGE_DEVICE_TOKEN,
		payload: token
	};
};

export const changeName = (name) => {
	return {
		type: CHANGE_NAME,
		payload: name
	};
};

export const changeResetarSenha = (resetarSenha) => {
	return {
		type: CHANGE_RESETAR_SENHA,
		payload: resetarSenha
	};
};

export const changeToken = (token) => {
	return {
		type: CHANGE_TOKEN,
		payload: token
	};
};


export const loginUser = (token) => {
	return dispatch => {
		dispatch({
			type: CHANGE_TOKEN,
			payload: token
		});
		setToken(token);
	};
};

export const logoutUser = () => {
	return dispatch => {
		dispatch({
			type: CHANGE_TOKEN,
			payload: null
		});
		removeToken();
	};
};

export const setToken = async(token) =>{
	try {
		// 3 days -> (60000 ms * 60 m * 24 h) * 3
		const expirationDate = new Date(new Date().getTime() + (60000 * 60 * 24 * 3));
		Cookies.set("tk", token, {
			expires: expirationDate,
			// secure: (window.location.protocol === 'https:')
		});
	} catch (error) {
		// failed to set cookie
	}
};

export const removeToken = async() =>{
	try {
		Cookies.remove("tk");
	} catch(error) {
		// failed to remove cookie
	}
};
