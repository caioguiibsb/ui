import {redirect} from "react-router-dom";
import Cookies from "js-cookie";
import {showSnackMessage} from "../actions/SnackActions";

export const checkAuthLoader = (dispatch) => {
    const token = Cookies.get("tk");
    if(!token){
        dispatch(showSnackMessage({message: "Por favor, faça login novamente.",  severity: "warning"}));
        window.location.reload();
        return redirect("/");
    }
    return true;
};