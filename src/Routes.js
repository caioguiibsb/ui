import React  from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import {checkAuthLoader} from "./shared/auth";
// import ChangePassword from "./containers/Auth/ChangePassword";
import Login from "./containers/Auth/Login";
import NavBar from "./components/NavBar/NavBar";
import ForgotPwd from "./containers/Auth/ForgotPwd";
import CheckCode from "./containers/Auth/CheckCode";
import ResetPwd from "./containers/Auth/ResetPwd";
import Dashboard from "./containers/Dashboard/Dashboard";
import Error from "./containers/Error/Error";


export const getRoutes = (dispatch, token, resetarSenha) => {
    let routes = [];
    
    // Verifica se o usuário está autenticado (presença de token)
    if (token) {
        // Caso o usuário precise resetar a senha, redireciona para a página de mudança de senha
        if (resetarSenha) {
            routes = [
                // Configuração de rotas para mudar senha, autenticando com o loader checkAuthLoader
            ];
        } else {
            // Se o usuário está autenticado e não precisa resetar senha, redireciona para o dashboard
            routes = [
                { path: "dashboard", element: <Dashboard />, loader: () => checkAuthLoader(dispatch) }, // Verifica autenticação antes de acessar o Dashboard
                { path: "*", element: <Navigate to="/dashboard" /> } // Redireciona qualquer rota não reconhecida para o dashboard
            ];
        }
    } else {
        // Caso o usuário não esteja autenticado, define rotas para login e recuperação de senha
        routes = [
            { path: "forgot_pwd", element: <ForgotPwd /> },  // Página de "Esqueci a senha"
            { path: "check_code", element: <CheckCode /> },  // Página de verificação do código de recuperação
            { path: "reset_pwd", element: <ResetPwd /> },  // Página de redefinição de senha
            { index: true, element: <Login /> },  // Página de login
            { path: "*", element: <Navigate to="/" /> }  // Redireciona rotas desconhecidas para a página de login
        ];
    }

    // Cria o roteamento principal, com a NavBar como elemento principal e rotas definidas dentro
    return createBrowserRouter([
        {
            path: "/",
            errorElement: <Error />,  // Página de erro padrão para rotas não existentes
            element: <NavBar />,  // Componente de navegação que envolve as rotas
            children: routes  // Rotas definidas com base na autenticação do usuário
        },
    ]);
};
