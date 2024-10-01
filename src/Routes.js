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
    
    if (token) {
        // Usuário autenticado
        if (resetarSenha) {
            routes = [
                // {path: "mudar_senha", element: <ChangePassword />, loader: () => checkAuthLoader(dispatch)},
                // {path: "*", element: <Navigate to="/mudar_senha" />},
            ];
        }
        else {
            routes = [
                {path: "dashboard", element: <Dashboard />, loader: () => checkAuthLoader(dispatch)},
                {path: "*", element: <Navigate to="/dashboard" />}
            ];
        }
    } else {
        // Usuário não autenticado
        routes = [
            {path: "forgot_pwd", element: <ForgotPwd />},
            {path: "check_code", element: <CheckCode />},
            {path: "reset_pwd", element: <ResetPwd />},
            {index: true, element: <Login />},
            {path: "*", element: <Navigate to="/" />}
        ];
    }

    return createBrowserRouter([
        {
            path: "/",
            errorElement: <Error />,
            element: <NavBar />,
            children: routes
        },
    ]);
};