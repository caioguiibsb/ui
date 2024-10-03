import Cookies from "js-cookie"; // Importa a biblioteca para manipulação de cookies.

// Importa os tipos de ações utilizados no Redux.
import {
	CHANGE_TOKEN,
	CHANGE_EMAIL,
	CHANGE_NAME,
	CHANGE_RESETAR_SENHA,
	CHANGE_DEVICE_TOKEN,
} from "./types";

// Action creator para mudar o e-mail no estado do Redux.
export const changeEmail = (email) => {
	return {
		type: CHANGE_EMAIL, // Define o tipo da ação.
		payload: email // Define o valor do e-mail como payload.
	};
};

// Action creator para mudar o token do dispositivo no estado do Redux.
export const changeDeviceToken = (token) => {
	return {
		type: CHANGE_DEVICE_TOKEN, // Tipo da ação.
		payload: token // Token do dispositivo passado como payload.
	};
};

// Action creator para mudar o nome do usuário no estado do Redux.
export const changeName = (name) => {
	return {
		type: CHANGE_NAME, // Tipo da ação.
		payload: name // Nome do usuário como payload.
	};
};

// Action creator para alterar a flag de resetar senha no estado do Redux.
export const changeResetarSenha = (resetarSenha) => {
	return {
		type: CHANGE_RESETAR_SENHA, // Tipo da ação.
		payload: resetarSenha // Valor booleano indicando se o reset de senha está ativo.
	};
};

// Action creator para mudar o token de autenticação no estado do Redux.
export const changeToken = (token) => {
	return {
		type: CHANGE_TOKEN, // Tipo da ação.
		payload: token // Token de autenticação como payload.
	};
};

// Função para logar o usuário.
// Dispara a ação que altera o token e armazena o token em um cookie.
export const loginUser = (token) => {
	return dispatch => {
		dispatch({
			type: CHANGE_TOKEN, // Dispara a ação para alterar o token.
			payload: token // Passa o token de autenticação.
		});
		setToken(token); // Chama a função para armazenar o token em um cookie.
	};
};

// Função para deslogar o usuário.
// Dispara uma ação que remove o token do estado e apaga o cookie correspondente.
export const logoutUser = () => {
	return dispatch => {
		dispatch({
			type: CHANGE_TOKEN, // Dispara a ação para remover o token (definido como null).
			payload: null // O token é removido (setado como null).
		});
		removeToken(); // Chama a função para remover o cookie.
	};
};

// Função para definir (setar) o token em um cookie.
export const setToken = async(token) =>{
	try {
		// Define a data de expiração do cookie para 3 dias a partir de agora.
		const expirationDate = new Date(new Date().getTime() + (60000 * 60 * 24 * 3));
		Cookies.set("tk", token, {
			expires: expirationDate, // Define o tempo de expiração.
			// secure: (window.location.protocol === 'https:') // Configura o cookie como seguro se a página usar HTTPS.
		});
	} catch (error) {
		// Tratamento de erro caso o cookie não possa ser setado.
	}
};

// Função para remover o token armazenado em um cookie.
export const removeToken = async() =>{
	try {
		Cookies.remove("tk"); // Remove o cookie com a chave "tk".
	} catch(error) {
		// Tratamento de erro caso o cookie não possa ser removido.
	}
};
