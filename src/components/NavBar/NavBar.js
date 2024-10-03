import React, {useEffect, useState} from "react"; 
// Importa React e os hooks useEffect e useState para gerenciar o ciclo de vida do componente e o estado interno.
import Cookies from "js-cookie";
// Importa a biblioteca js-cookie para manipulação de cookies, que será usada para gerenciar a autenticação do usuário.
import {Outlet} from "react-router-dom"; 
// Importa o componente Outlet do React Router para renderizar rotas aninhadas.
import { Grid } from "@mui/material"; 
// Importa o componente Grid do Material UI para layout responsivo.
import {
    COLOR_CONTAS2,
    WHITE_SUBITEM_NAVBAR,
    BLACK_LABEL_UX,
    BLUE_LIGHT_UX_THEME,
    COLOR_CONTAS1,
    GRAY_BG_UX
} from "../../shared/utils"; 
// Importa constantes de estilo da aplicação.

import List from "@mui/material/List"; 
// Importa o componente List do Material UI para criar listas de itens.
import {Link} from "react-router-dom"; 
// Importa o componente Link do React Router para navegação.
import ListItemButton from "@mui/material/ListItemButton"; 
// Importa o componente ListItemButton do Material UI para criar botões em listas.
import ListItemIcon from "@mui/material/ListItemIcon"; 
// Importa o componente ListItemIcon do Material UI para ícones em listas.
import ListItemText from "@mui/material/ListItemText"; 
// Importa o componente ListItemText do Material UI para exibir texto em listas.
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"; 
// Importa ícone para a página inicial.
import Typography from "@mui/material/Typography"; 
// Importa o componente Typography do Material UI para estilizar texto.
import Box from "@mui/material/Box"; 
// Importa o componente Box do Material UI para layout.
import DescriptionIcon from '@mui/icons-material/Description'; 
// Importa ícone para a seção de planilhas.
import LeaderboardIcon from '@mui/icons-material/Leaderboard'; 
// Importa ícone para a seção de dashboard.
import HomeIcon from '@mui/icons-material/Home'; 
// Importa ícone para a seção inicial.
import { useSelector, useDispatch } from "react-redux"; 
// Importa useSelector e useDispatch do Redux para gerenciar o estado da aplicação.
import api from "../../axios"; 
// Importa a instância de API personalizada para fazer requisições.
import {changeName} from "../../actions/AuthActions"; 
// Importa a ação para alterar o nome do usuário no estado global.
import LogoutIcon from '@mui/icons-material/Logout'; 
// Importa ícone de logout.
import AutoGraphIcon from '@mui/icons-material/AutoGraph'; 
// Importa ícone do sistema de gráficos.

const NavBar = () => {

    const token = Cookies.get("tk"); 
    // Obtém o token de autenticação dos cookies, se existir.

    const dispatch = useDispatch(); 
    // Cria uma referência para o dispatch do Redux, que será usado para enviar ações.

    const [activeButton, setActiveButton] = useState("inicio"); 
    // Estado local para controlar qual botão da navbar está ativo.

    const name = useSelector(state => state.AuthReducer.name); 
    // Obtém o nome do usuário do estado global gerenciado pelo Redux.

    useEffect(() => {
        // Efeito que será executado quando o componente for montado.
        if (token) {
            getUserInfo(); 
            // Se o token existir, chama a função para obter as informações do usuário.
        }
    }, []); 

    const getUserInfo = () => {
        // Função para buscar informações do usuário na API.
        api.GetUserInfo()
            .then(response => {
                dispatch(changeName(response.data.username)); 
                // Se a requisição for bem-sucedida, despacha uma ação para atualizar o nome do usuário no estado global.
            })
            .catch(error => {
                if (error.response.status === 401) {
                    Cookies.remove("tk"); 
                    // Se a resposta for 401 (não autorizado), remove o token dos cookies.
                }
            });
    }

    const logoutUser = () => {
		// Função para realizar o logout do usuário.
		Cookies.remove("tk"); 
        // Remove o token de autenticação dos cookies.
        window.location.reload(); 
        // Atualiza a página para refletir o estado de logout.
	};

    const styleSelected = (pathList) => {
		// Retorna um estilo para destacar o item selecionado na lista de navegação.
		return {backgroundColor: pathList.includes(activeButton) ? BLUE_LIGHT_UX_THEME :  COLOR_CONTAS2}; 
	};

    const styleColor = (pathList) => {
        // Retorna uma cor para o texto do item com base no estado ativo.
        return {color: pathList.includes(activeButton) ? WHITE_SUBITEM_NAVBAR : BLACK_LABEL_UX}; 
	};

    const handleChangeClick = (local) => {
		// Atualiza o botão ativo quando um item é clicado.
		setActiveButton(local); 
	};

    return (
        // Condicional que renderiza a navbar se o usuário estiver autenticado.
        token ? (
            <Box sx={{display: "flex", height: "100vh", alignItems: "center"}}>
                <Grid container sx={{backgroundColor: COLOR_CONTAS2, height: "93%", borderRadius: "0 25px 25px 0", display: "flex", flexDirection: "row", alignItems: "center", padding: 2, width: "300px"}}>
                    {/* Contêiner para a navbar */}
                    <Grid item xs={12} sx={{display: "flex", gap: 0.5, justifyContent: "center", alignItems: "center"}}>
                        <p style={{fontSize: "35px", fontWeight: "bold", color: WHITE_SUBITEM_NAVBAR}}>SisDash</p>
                        {/* Título da aplicação */}
                        <AutoGraphIcon sx={{fontSize: "45px", fontWeight: "bold", color: WHITE_SUBITEM_NAVBAR}}/>
                        {/* Ícone da aplicação */}
                    </Grid>
                    <Grid item xs={12} sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "88%"}}>
                        <List component="nav" sx={{display: "flex", gap: 2, flexDirection: "column"}}>
                            {/* Lista de itens de navegação */}
                            <Link to="/inicio" className="text-link" role="item" style={{textDecoration: "none"}}>
                                <ListItemButton
                                    style={{
                                        ...styles.ListItem,
                                        ...styleSelected("inicio"),
                                    }}
                                    onClick={() => handleChangeClick("inicio")}
                                >
                                    <ListItemIcon>
                                        <HomeIcon style={styleColor(["inicio"])}/>
                                        {/* Ícone para a página inicial */}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                component="span"
                                                sx={{ fontSize: "16px", ...styleColor(["inicio"]), fontWeight: "400", fontFamily: "Rubik" }}
                                            >
                                                Início
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </Link>
                            <Link to="/planilhas" className="text-link" role="item" style={{textDecoration: "none"}}>
                                <ListItemButton
                                    style={{
                                        ...styles.ListItem,
                                        ...styleSelected("planilhas"),
                                    }}
                                    onClick={() => handleChangeClick("planilhas")}
                                >
                                    <ListItemIcon>
                                        <DescriptionIcon style={styleColor(["planilhas"])}/>
                                        {/* Ícone para a seção de planilhas */}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                component="span"
                                                sx={{ fontSize: "16px", ...styleColor(["planilhas"]), fontWeight: "400", fontFamily: "Rubik" }}
                                            >
                                                Planilhas
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </Link>
                            <Link to="/dashboard" className="text-link" role="item" style={{textDecoration: "none"}}>
                                <ListItemButton
                                    style={{
                                        ...styles.ListItem,
                                        ...styleSelected("dashboard"),
                                    }}
                                    onClick={() => handleChangeClick("dashboard")}
                                >
                                    <ListItemIcon>
                                        <LeaderboardIcon style={styleColor(["dashboard"])}/>
                                        {/* Ícone para a seção de dashboard */}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                component="span"
                                                sx={{ fontSize: "16px", ...styleColor(["dashboard"]), fontWeight: "400", fontFamily: "Rubik" }}
                                            >
                                                Dashboard
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </Link>
                        </List>
                        <Grid item sx={{backgroundColor: GRAY_BG_UX, borderRadius: "50px", width: "100%", paddingX: 2, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <p>Olá {name}</p>
                            {/* Exibe uma saudação com o nome do usuário */}
                            <LogoutIcon sx={{cursor: "pointer"}} onClick={() => logoutUser()} />
                            {/* Ícone de logout que, quando clicado, chama a função de logout */}
                        </Grid>
                    </Grid>
                </Grid>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: GRAY_BG_UX,
                        flexGrow: 1,
                        overflowX: "auto",
                        overflowY: "unset",
                        margin: "0 30px",
                        height: "93vh",
                        borderRadius: "25px",
                        border: "2px solid #E2E8F0",
                    }}
                >
                    <Outlet />
                    {/* Renderiza o conteúdo das rotas aninhadas */}
                </Box>
            </Box>
        ) : (
            <Outlet />
            // Se o usuário não estiver autenticado, apenas renderiza as rotas aninhadas.
        )
    );
};

const styles = {
	ListItem: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		padding: "10px 0px 10px 8px",
		width: "208px",
		height: "44px",
		borderRadius: "8px",
		flex: "none",
		order: "0",
		flexGrow: "0",
	},
	Administrativo: {
		width: "133px",
		height: "24px",
		fontFamily: "Inter",
		fontStyle: "normal",
		fontWeight: "500",
		fontSize: "16px",
		lineHeight: "24px",
		color: "#2D3748",
		flex: "none",
		order: "0",
		flexGrow: "0",
		marginLeft: "20px",
	},
	divider: {
		marginLeft: "20px",
		marginRight: "20px",
		borderColor: "unset",
		my: 2
	},
	styleIcon: {
		color: BLACK_LABEL_UX
	},
};

export default NavBar;
