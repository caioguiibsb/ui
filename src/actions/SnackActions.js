import {
	CLOSE_SNACK_MESSAGE, // Importa o tipo de ação para fechar a mensagem de snack.
	SHOW_SNACK_MESSAGE // Importa o tipo de ação para mostrar a mensagem de snack.
} from "./types"; // Importa as constantes de tipos de ação definidas em outro arquivo.

/**
 * Action creator para exibir uma mensagem de snack.
 * 
 * @param {object} payload - Dados da mensagem de snack (texto, tipo, etc.).
 * @returns {object} - A ação contendo o tipo e o payload.
 */
export const showSnackMessage = (payload) => {
	return {
		type: SHOW_SNACK_MESSAGE, // Tipo da ação para mostrar a mensagem.
		...payload // Espalha (spread) o payload no retorno da ação. Isso inclui as propriedades passadas, como a mensagem e o tipo de notificação (sucesso, erro, etc.).
	};
};

/**
 * Action creator para fechar a mensagem de snack.
 * 
 * @returns {object} - A ação que contém o tipo de fechamento da mensagem.
 */
export const closeSnackMessage = () => {
	return {
		type: CLOSE_SNACK_MESSAGE, // Tipo da ação para fechar a mensagem.
	};
};
