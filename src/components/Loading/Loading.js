import React from "react"; // Importa a biblioteca React para criação de componentes funcionais.
import CircularProgress from "@mui/material/CircularProgress"; // Importa o componente CircularProgress do Material UI para exibir um indicador de carregamento.
import { BLACK_LABEL_UX } from "../../shared/utils"; // Importa uma cor personalizada (preto) para estilizar o componente de carregamento.

const Loading = () => { 
    // Define o componente funcional "Loading". Não recebe props e renderiza um spinner de carregamento.

	return(
        // Retorna o JSX para ser renderizado na tela.
		<div style={styles.center} data-testid="loading">
			<CircularProgress sx={{color: BLACK_LABEL_UX}}/>
		</div>
	);
};

// Cria uma constante de estilos
const styles = {
	center: {
        // Define o estilo que será usado no container para centralizar o conteúdo.
		textAlign: "center" // Centraliza o texto (e o spinner) horizontalmente.
	}
};

export default Loading; 
// Exporta o componente para ser usado em outras partes da aplicação.
