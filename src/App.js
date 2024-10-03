import React from "react";
import {useDispatch} from "react-redux";
import Cookies from "js-cookie";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import {getRoutes} from "./Routes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import SnackBar from "./components/SnackBar/SnackBar";


export default function App() {
    // Utiliza o hook useDispatch para obter a função de despachar ações no Redux.
    const dispatch = useDispatch();
    
    // Obtém o token de autenticação armazenado nos cookies.
    const token = Cookies.get("tk");
    
    return (
        // Configura o provedor de localizações para formatação de data.
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <SnackBar>
                {/* Renderiza o RouterProvider com as rotas configuradas, passando o dispatch e o token como argumentos. */}
                <RouterProvider router={getRoutes(dispatch, token)} />
            </SnackBar>
        </LocalizationProvider>
    );
}
