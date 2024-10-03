import {redirect} from "react-router-dom";
import Cookies from "js-cookie";
import {showSnackMessage} from "../actions/SnackActions";

// Função que verifica a autenticação do usuário antes de acessar uma rota protegida.
export const checkAuthLoader = (dispatch) => {
    // Obtém o token de autenticação armazenado nos cookies.
    const token = Cookies.get("tk");
    
    // Verifica se o token não existe, indicando que o usuário não está autenticado.
    if (!token) {
        // Dispara uma ação para mostrar uma mensagem de notificação ao usuário.
        dispatch(showSnackMessage({message: "Por favor, faça login novamente.", severity: "warning"}));
        // Atualiza a página, redirecionando o usuário para a rota inicial.
        window.location.reload();
        return redirect("/");  // Redireciona o usuário para a página inicial.
    }
    
    return true;  // Retorna verdadeiro se o usuário estiver autenticado.
};
