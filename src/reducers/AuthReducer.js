import {
	CHANGE_EMAIL,
	CHANGE_TOKEN,
	CHANGE_DEVICE_TOKEN,
	CHANGE_NAME,
	CHANGE_RESETAR_SENHA,
} from "../actions/types";

const INITIAL_STATE = {
    token: null,           // Armazena o token de autenticação do usuário.
    deviceToken: null,     // Armazena o token do dispositivo, usado para notificações ou autenticações específicas.
    resetarSenha: false,   // Indica se o processo de redefinição de senha está ativo.
    email: "",             // Armazena o email do usuário.
    name: null,            // Armazena o nome do usuário.
};

// Função redutora que gerencia o estado relacionado à autenticação e informações do usuário.
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        // Atualiza o estado com o novo token de autenticação.
        case CHANGE_TOKEN:
            return { ...state, token: action.payload };
        
        // Atualiza o estado com o novo token do dispositivo.
        case CHANGE_DEVICE_TOKEN:
            return { ...state, deviceToken: action.payload };
        
        // Atualiza o estado com o novo email do usuário.
        case CHANGE_EMAIL:
            return { ...state, email: action.payload };
        
        // Atualiza o estado com o novo nome do usuário.
        case CHANGE_NAME:
            return { ...state, name: action.payload };
        
        // Atualiza o estado para indicar se o usuário está no processo de redefinição de senha.
        case CHANGE_RESETAR_SENHA:
            return { ...state, resetarSenha: action.payload };
        
        // Retorna o estado atual se a ação não for reconhecida.
        default:
            return state;
    }
};
