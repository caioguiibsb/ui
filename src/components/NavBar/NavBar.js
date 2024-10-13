import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Outlet} from "react-router-dom";
import { Grid } from "@mui/material";
import {
    COLOR_CONTAS2,
    WHITE_SUBITEM_NAVBAR,
    BLACK_LABEL_UX,
    BLUE_LIGHT_UX_THEME,
    GRAY_BG_UX
} from "../../shared/utils";
import List from "@mui/material/List";
import {Link} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DescriptionIcon from '@mui/icons-material/Description';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector, useDispatch } from "react-redux";
import api from "../../axios";
import {changeName} from "../../actions/AuthActions";
import LogoutIcon from '@mui/icons-material/Logout';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';


const NavBar = () => {

    const token = Cookies.get("tk");

    const dispatch = useDispatch();

    const [activeButton, setActiveButton] = useState("inicio");
    const name = useSelector(state => state.AuthReducer.name);

    useEffect(() => {
        if (token) {
            getUserInfo();
        }
    }, [token]);

    const getUserInfo = () => {
        api.GetUserInfo()
            .then(response => {
                dispatch(changeName(response.data.username));
            })
            .catch(error => {
                if (error.response.status === 401) {
                    Cookies.remove("tk");
                }
            });
    }

    const logoutUser = () =>{
		Cookies.remove("tk");
        window.location.reload();
	};

    const styleSelected = (pathList) => {
		return {backgroundColor: pathList.includes(activeButton) ? BLUE_LIGHT_UX_THEME :  COLOR_CONTAS2};
	};

    const styleColor = (pathList) => {
        return {color: pathList.includes(activeButton) ? WHITE_SUBITEM_NAVBAR : BLACK_LABEL_UX};
	};

    const handleChangeClick = (local) => {
		setActiveButton(local);
	};

    return (
        // Verificando se o usuário está autenticado, se sim, exibe o menu lateral
        token ? (
            <Box sx={{display: "flex", height: "100vh", alignItems: "center"}}>
                <Grid container sx={{backgroundColor: COLOR_CONTAS2, height: "93%", borderRadius: "0 25px 25px 0", display: "flex", flexDirection: "row", alignItems: "end", padding: 2, width: "300px"}}>
                    <Grid item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", alignSelf: "start"}}>
                        <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                            <p style={{fontSize: "35px", fontWeight: "bold", color: WHITE_SUBITEM_NAVBAR}}>SisDash</p>
                            <AutoGraphIcon sx={{fontSize: "45px", fontWeight: "bold", color: WHITE_SUBITEM_NAVBAR}}/>
                        </Box>
                        <List component="nav" sx={{display: "flex", gap: 2, flexDirection: "column"}}>
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
                    </Grid>
                    <Grid item xs={12} sx={{backgroundColor: GRAY_BG_UX, borderRadius: "50px", width: "100%", paddingX: 2, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <p>{name}</p>
                        <LogoutIcon sx={{cursor: "pointer"}} onClick={() => logoutUser()} />
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
                        borderRadius: "25px 5px 5px 25px",
                        border: "2px solid #E2E8F0",
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        ) : (
            <Outlet />
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