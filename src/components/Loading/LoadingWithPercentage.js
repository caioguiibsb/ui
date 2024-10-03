import React, {useState, useEffect} from "react"; 
// Importa React e os hooks useState e useEffect para gerenciar o estado e os efeitos colaterais.
import CircularProgress from "@mui/material/CircularProgress";
// Importa o componente CircularProgress do Material UI para exibir um indicador circular de progresso.
import Typography from "@mui/material/Typography"; 
// Importa o componente Typography do Material UI para exibir o texto do percentual de progresso.
import Box from "@mui/material/Box"; 
// Importa o componente Box do Material UI para posicionamento e layout.
import {
    WHITE_ESCRITA_THEME,
    GRAY_LABEL_UX
} from "../../shared/utils"; 
// Importa temas de cores personalizadas da aplicação.

import { useSelector } from "react-redux"; 
// Importa useSelector para acessar o estado global gerenciado pelo Redux.

const LoadingWithPercentage = (props) => { 
    // Define o componente funcional "LoadingWithPercentage". Recebe props como percentual de progresso, tamanho, espessura e uma função para sinalizar que o progresso está completo.

    const {percentage, size = 100, thickness = 4, setProgressComplete} = props; 
    // Desestrutura as props. Define valores padrão para "size" (100) e "thickness" (4), garantindo que o componente possa ser usado sem passar esses valores manualmente.

    const temaEscuro = useSelector(state => state.AuthReducer.temaEscuro); 
    // Usa o useSelector para acessar o estado "temaEscuro" do Redux, que determina se o tema escuro está ativo.

    const [progress, setProgress] = useState(0); 
    // Usa o hook useState para gerenciar o progresso atual (inicialmente 0).

    useEffect(() => { 
        // Usa o hook useEffect para executar um efeito colateral que simula o incremento do progresso ao longo do tempo.
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    // Se o progresso atingir 100%, limpa o intervalo, chama "setProgressComplete" e define o progresso como 100.
                    clearInterval(timer);
                    setProgressComplete(true);
                    return 100;
                }
                return prevProgress + percentage; 
                // Incrementa o progresso com base no valor de "percentage" passado via props.
            });
        }, 800); 
        // A cada 800ms, o progresso é atualizado.
        return () => clearInterval(timer); 
        // Limpa o intervalo quando o componente é desmontado ou quando o valor de "percentage" muda.
    }, [percentage, setProgressComplete]); 
    // O efeito depende de "percentage" e "setProgressComplete", atualizando sempre que esses valores mudam.

    return (
        // Retorna o JSX que renderiza o componente de progresso.
        <Box sx={{ position: "relative", display: "inline-flex", width: size, height: size }}>
            {/* Usa o componente Box para controlar o layout e posicionamento. Define tamanho e posição com base no valor de "size". */}
            <CircularProgress 
                // Componente CircularProgress do Material UI. O valor do progresso é controlado pelo estado "progress".
                variant="determinate" 
                value={progress} 
                size={size} 
                thickness={thickness} 
                // O tamanho e a espessura do progresso circular são ajustados com base nas props.
            />
            <Box
                // Outra Box para centralizar o texto dentro do círculo de progresso.
                sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                }}
            >
                <Typography
                    // Exibe o percentual de progresso no centro do círculo. O estilo do texto muda com base no tema (escuro ou claro).
                    variant="caption"
                    component="div"
                    sx={{ color: temaEscuro ? WHITE_ESCRITA_THEME : GRAY_LABEL_UX, fontWeight: 600, fontSize: "20px" }}
                >
                {`${Math.round(progress)}%`} 
                {/* Mostra o valor do progresso arredondado para um número inteiro. */}
                </Typography>
            </Box>
        </Box>
    );
};

export default React.memo(LoadingWithPercentage); 
// Usa React.memo para otimizar o componente, evitando re-renderizações desnecessárias quando as props não mudam.
