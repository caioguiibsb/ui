import React, {useState} from "react"; // Importa React e o hook useState para gerenciamento de estado.
import InputLabel from "@mui/material/InputLabel"; // Importa o componente InputLabel do Material UI para o rótulo do input.
import OutlinedInput from "@mui/material/OutlinedInput"; // Importa o campo de entrada com borda destacada do Material UI.
import InputAdornment from "@mui/material/InputAdornment"; // Importa o componente para adicionar ícones ou botões dentro do input.
import IconButton from "@mui/material/IconButton"; // Importa o botão icônico do Material UI para ações como visibilidade da senha.
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // Importa o ícone de "olho fechado" para esconder a senha.
import Visibility from "@mui/icons-material/Visibility"; // Importa o ícone de "olho aberto" para mostrar a senha.
import FormControl from "@mui/material/FormControl"; // Componente do Material UI para controle do formulário (envolve o input).
import {
	GRAY_BG_UX, // Cor de fundo personalizada para o input.
	GRAY_LABEL_UX, // Cor personalizada para o rótulo (label) do input.
	COLOR_THEME, // Cor personalizada para o tema principal (usada no ícone de visibilidade).
	GRAY_HEADER_UX // Cor personalizada para o texto dentro do input.
} from "../../shared/utils"; // Importa cores personalizadas de um arquivo compartilhado (utils).

/**
 * Componente de Input para Senha com funcionalidade de alternar visibilidade.
 * 
 * @param {object} props - As propriedades recebidas pelo componente.
 * @returns {JSX.Element} - O JSX para o campo de senha com controle de visibilidade.
 */
const InputPassword = (props) => {
	const [showPassword, setShowPassword] = useState(false); // Define o estado local para controlar se a senha será exibida ou escondida.

	return(
		<FormControl 
			error={props.error} // Exibe o estado de erro se props.error for verdadeiro.
			sx={{ width: "80%", marginTop: 0.5 }} // Estilos inline aplicados ao controle do formulário.
			variant="outlined" // Define a variante do input como "outlined" (com borda destacada).
		>
			{/* Rótulo do campo de senha */}
			<InputLabel 
				htmlFor="outlined-adornment-password" // Associa o rótulo ao input pelo ID.
				style={{color: GRAY_LABEL_UX, fontSize: props.matches ? "1rem" : "0.9rem"}} // Aplica estilos personalizados para cor e tamanho dinâmico da fonte com base em props.matches.
			>
				{props.label} {/* Exibe o rótulo (label) que foi passado como prop. */}
			</InputLabel>

			{/* Campo de entrada para senha */}
			<OutlinedInput
				data-testid="password-input" // Atributo para testes (usado em testes automatizados).
				id="outlined-adornment-password" // ID para conectar o rótulo ao campo de entrada.
				required // Torna o campo obrigatório.
				type={showPassword ? "text" : "password"} // Controla o tipo do input, alternando entre "text" (mostrar senha) e "password" (esconder senha).
				value={props.password} // Define o valor do campo de senha a partir de props.
				onChange={(e) => props.handleChange(e)} // Função para manipular a alteração do valor da senha, passada via props.
				style={{backgroundColor: GRAY_BG_UX, color: GRAY_HEADER_UX}} // Estilos personalizados para a cor de fundo e cor do texto.
				
				/* Adiciona um ícone ao final do campo de entrada para alternar a visibilidade da senha */
				endAdornment={
					<InputAdornment position="end"> {/* Componente para adornos (ícones) dentro do input */}
						<IconButton
							aria-label="toggle password visibility" // Atributo de acessibilidade para descrever a ação.
							onClick={() => setShowPassword(!showPassword)} // Alterna o estado de visibilidade da senha.
							edge="end" // Alinha o botão ao final do campo de entrada.
							style={{color: COLOR_THEME}} // Aplica a cor personalizada ao ícone de visibilidade.
						>
							{/* Alterna entre o ícone de visibilidade e o ícone de invisibilidade com base no estado */}
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label="Password" // Define o rótulo que aparecerá dentro do campo até que o usuário interaja.
			/>
		</FormControl>
	);
};

export default InputPassword; // Exporta o componente como padrão para ser usado em outras partes da aplicação.
