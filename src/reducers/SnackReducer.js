import {
	SHOW_SNACK_MESSAGE,
	CLOSE_SNACK_MESSAGE
} from "../actions/types";

// Define o estado inicial para o gerenciador de mensagens de notificação (snackbar).
const INITIAL_STATE = {
    open: false,            // Indica se o snackbar está aberto ou fechado.
    duration: 2000,        // Duração padrão em milissegundos para a exibição do snackbar.
    message: "",           // Mensagem a ser exibida no snackbar.
    severity: "success"    // Tipo de mensagem, pode ser "success", "error", "warning" ou "info".
};

// Função redutora que gerencia o estado do snackbar com base nas ações recebidas.
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SHOW_SNACK_MESSAGE:  // Ação para mostrar o snackbar.
            return {
                ...state,          // Mantém o estado atual.
                open: true,       // Define o snackbar como aberto.
                message: action.message,   // Define a mensagem a ser exibida.
                duration: action.duration || state.duration, // Atualiza a duração, se fornecida, ou mantém a padrão.
                severity: action.severity || state.severity, // Atualiza o tipo de mensagem, se fornecido, ou mantém o padrão.
            };
        case CLOSE_SNACK_MESSAGE:  // Ação para fechar o snackbar.
            return INITIAL_STATE;   // Reseta o estado para o estado inicial.
        default:
            return state;           // Retorna o estado atual para qualquer ação não reconhecida.
    }
};

