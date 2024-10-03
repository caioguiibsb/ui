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
    // Utiliza o hook useDispatch para acessar a função de despachar ações do Redux.
    const dispatch = useDispatch();
    
    // Define estados locais para gerenciar o carregamento, nome do usuário, senha e erros de senha.
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = () => {
        // Prepara os dados de login para a requisição.
        const data = {
            username: name,
            password,
        };
        
        // Define o estado de carregamento como verdadeiro ao iniciar a requisição.
        setLoading(true);
        
        // Realiza a chamada à API para efetuar o login.
        api.GetLogin(data).then(response => {
            let token = response.data.access_token;

            // Se o login for bem-sucedido, despacha a ação de login e recarrega a página.
            setLoading(false);
            dispatch(loginUser(token));
            window.location.reload();
        }).catch(error => {
            // Se ocorrer um erro, trata o erro e, se for de status 400, define a flag de erro de senha como verdadeira.
            setLoading(false);
            if (error.response && error.response.status === 400) {
                setPasswordError(true);
            }
        });
    };

    return (
        <Box sx={{ backgroundColor: GRAY_BG_BODY, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Grid container sx={{ backgroundColor: LINE_TABLE, width: "500px", borderRadius: 2, border: `1px solid ${GRAY_BORDER_TABLE}`, padding: 2 }}>
                <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={styles.header}>Entre em sua conta</p>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <h1 style={styles.text}>Insira as credenciais fornecidas para realizar o acesso ao sistema</h1>
                </Grid>
                <Grid item xs={12}>
                    <Box component="form" sx={{ marginTop: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {/* Campo de entrada para o nome do usuário */}
                        <TextField
                            data-testid="email-input"
                            margin="normal"
                            fullWidth
                            label="Nome"
                            autoComplete="nome"
                            autoFocus
                            onChange={(e) => { setName(e.target.value.trim()); }}
                            value={name} // Corrigido: Usar 'name' em vez de 'email'
                            variant="outlined"
                            sx={{ width: "80%" }}
                        />
                        {/* Componente de entrada para senha */}
                        <InputPassword label="Senha" password={password} error={passwordError} handleChange={(e) => setPassword(e.target.value)} />
                        {/* Mensagem de erro caso a senha ou nome estejam incorretos */}
                        {
                            passwordError && (
                                <p data-testid="email-pwd-error" style={{ color: RED_ERROR_UX, fontSize: "12px" }}>
                                    O email ou senha informados estão incorretos!
                                </p>
                            )
                        }
                        <Grid container sx={{ marginTop: 2, marginBottom: 2 }}>
                            <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {/* Link para a página de recuperação de senha */}
                                <LinkRouter data-testid="forgot-password-button" to='/forgot_pwd' variant="body2" style={{ textDecoration: "none", color: GRAY_LABEL_UX, fontWeight: "600", fontSize: "14px" }}>
                                    Esqueci minha senha
                                </LinkRouter>
                            </Grid>
                        </Grid>
                        {
                            loading ? (
                                // Exibe o componente de carregamento enquanto a requisição está em andamento
                                <Loading />
                            ) : (
                                <React.Fragment>
                                    { (passwordError || (password === "")) ? (
                                        // Botão de login desabilitado se houver erro ou campos vazios
                                        <Button
                                            disabled
                                            data-testid="unabled-submit-button"
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ ...styles.buttonSubmit }}
                                            style={{ fontWeight: "600" }}
                                        >
                                            Entrar
                                        </Button>
                                    ) : (
                                        // Botão de login habilitado e chama a função de submit
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
                                    )}
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