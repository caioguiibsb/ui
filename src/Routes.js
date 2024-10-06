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
import CreateAccount from "./containers/Auth/CreateAccount";


export const getRoutes = (dispatch, token, resetarSenha) => {
    let routes = [];

    console.log(token)
    
    if (token) {
        // Usuário autenticado
        routes = [
            {path: "dashboard", element: <Dashboard />, loader: () => checkAuthLoader(dispatch)},
            {path: "*", element: <Navigate to="/dashboard" />}
        ];
    } else {
        // Usuário não autenticado
        routes = [
            {path: "create_account", element: <CreateAccount />},
            {path: "*", element: <Navigate to="/" />},
            {index: true, element: <Login />},
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