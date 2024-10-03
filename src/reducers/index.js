import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import SnackReducer from "./SnackReducer";

// Combina diferentes redutores em um único redutor raiz, permitindo que o Redux gerencie múltiplos estados.
const rootReducer = combineReducers({
    AuthReducer,  // Redutor responsável pela autenticação e gerenciamento de informações do usuário.
    SnackReducer,  // Redutor responsável pelo controle de mensagens de notificação (snackbars).
});

// Exporta o redutor raiz para ser utilizado na configuração da loja Redux, facilitando a gestão do estado global da aplicação.
export default rootReducer;
