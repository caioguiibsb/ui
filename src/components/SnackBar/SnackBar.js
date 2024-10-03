import React, {useCallback}  from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {useSelector, useDispatch} from "react-redux";
import {closeSnackMessage} from "../../actions/SnackActions";

const Alert = React.forwardRef(function Alert(props, ref) {
    // Cria um componente Alert utilizando MuiAlert do Material UI, que permite utilizar a referência (ref) e aplicar propriedades passadas como props.
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Componente principal SnackBar que exibe mensagens de alerta na interface.
const SnackBar = (props) => {
	const {open, duration, severity, message} = useSelector(state => state.SnackReducer);
    // Obtém os valores de estado necessários (aberto, duração, severidade e mensagem) do Redux usando useSelector.

	const dispatch = useDispatch();
    // Cria uma referência para o dispatch do Redux, que será usado para enviar ações.

	const handleClose = useCallback((event, reason) => {
		// Função para fechar o Snackbar. A função é otimizada com useCallback para evitar recriações desnecessárias.
		if (reason === "clickaway") {
			// Se o fechamento for causado por um clique no Snackbar, não faz nada.
			return;
		}

		dispatch(closeSnackMessage());
        // Se o fechamento não for por clique, despacha a ação para fechar o Snackbar.
	}, []);

	return(
		<React.Fragment>
			<Snackbar open={open} autoHideDuration={duration} onClose={handleClose} data-testid="snackbar">
                // Exibe o Snackbar com as propriedades definidas (aberto, duração e fechamento) e atribui um teste de identificação.
				<Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }} data-testid="snackbar-alert">
                    // Exibe o componente Alert dentro do Snackbar, configurando sua severidade e mensagem.
					{message}
				</Alert>
			</Snackbar>
			{props.children}
            // Renderiza qualquer filho passado para o componente SnackBar.
		</React.Fragment>
	);
};

export default React.memo(SnackBar);
// O componente é exportado como um componente memorizado para otimizar a renderização.
