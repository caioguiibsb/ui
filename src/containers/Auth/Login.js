import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Link as LinkRouter} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import api from "../../axios";
import {changeName, loginUser} from "../../actions/AuthActions";
import Loading from "../../components/Loading/Loading";
import InputPassword from "../../components/Input/InputPassword";
import { GRAY_LABEL_UX, RED_ERROR_UX, GRAY_HEADER_UX, styleYellowButton, GRAY_BORDER_TABLE, LINE_TABLE, GRAY_BG_BODY } from "../../shared/utils";
import "./Login.css";

const Login = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);


    const handleSubmit = () => {
        const data = {
            username: name,
            password,
        };
        setLoading(true);
        api.GetLogin(data).then(response => {
            let token = response.data.access_token;

            setLoading(false);
            dispatch(loginUser(token));
            window.location.reload();
        }).catch(error => {
            setLoading(false);
            if (error.response && error.response.status === 400) {
                setPasswordError(true);
            }
        });
    };


    return (
        <Box
            sx={{
                backgroundColor: GRAY_BG_BODY,
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
			<Grid container sx={{backgroundColor: LINE_TABLE, width: "500px", borderRadius: 2, border: `1px solid ${GRAY_BORDER_TABLE}`, padding: 2}}>
                <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={styles.header}>Entre em sua conta</p>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <h1 style={styles.text}>Insira as credenciais fornecidas para realizar o acesso ao sistema</h1>
                </Grid>
                <Grid item xs={12}>
                    <Box component="form" sx={{ marginTop: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <TextField
                            data-testid="email-input"
                            margin="normal"
                            fullWidth
                            label="Nome"
                            autoComplete="nome"
                            autoFocus
                            onChange={(e) => {setName(e.target.value.trim());}}
                            value={email}
                            variant="outlined"
                            sx={{ 
                                width: "80%",
                            }}
                        />
                        <InputPassword label="Senha" password={password} error={passwordError} handleChange={(e) => setPassword(e.target.value)} />
                        {
                            passwordError && (
                                <p data-testid="email-pwd-error" style={{color: RED_ERROR_UX, fontSize: "12px"}}>O email ou senha informados estão incorretos!</p>
                            )
                        }
                        <Grid container sx={{marginTop: 2, marginBottom: 2}}>
                            <Grid item xs={12} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <LinkRouter data-testid="forgot-password-button" to='/forgot_pwd' variant="body2" style={{textDecoration: "none", color: GRAY_LABEL_UX, fontWeight: "600", fontSize: "14px"}}>
                                    Esqueci minha senha
                                </LinkRouter>
                            </Grid>
                        </Grid>
                        {
                            loading ? (
                                <Loading />
                            ) : (
                                <React.Fragment>
                                    { (emailError || (password === "")) ? (
                                        <Button
                                            disabled
                                            data-testid="unabled-submit-button"
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ ...styles.buttonSubmit }}
                                            style={{fontWeight: "600"}}
                                        >
                                            Entrar
                                        </Button>
                                    ) : (
                                        <Button
                                            data-testid="submit-button"
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ ...styles.buttonSubmit }}
                                            onClick={() => handleSubmit()}
                                            style={styleYellowButton}
                                        >
                                            Entrar
                                        </Button>
                                    )
                                    }
                                </React.Fragment>
                            )
                        }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;

const styles = {
    center: {
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    logo: {
        userDrag: "none",
        userSelect: "none",
        pointerEvents: "none",
        width: "191px",
        height: "36px"
    },
    header: {
        width: "398px",
        height: "15px",
        fontWeight: "bold",
        fontSize: "36px",
        lineHeight: "32px",
        color: GRAY_HEADER_UX,
        textAlign: "center",
    },
    text: {
        width: "411px",
        height: "50px",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "20px",
        color: GRAY_LABEL_UX,
        textAlign: "center",
    },
    copyright: {
        textAlign: "center",
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "end",
        paddingBottom: "40px"
    },
    buttonSubmit: {
        marginTop: 3,
        marginBottom: 2,
        width: "80%",
    }
};