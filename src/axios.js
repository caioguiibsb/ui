import axios from "axios";
import Cookies from "js-cookie";

// Define a URL base para todas as requisições feitas pelo axios.
axios.defaults.baseURL = 'http://localhost:8002/';

// Cria uma instância do axios com cabeçalho padrão para JSON.
const instance = axios.create({
	// Configura o cabeçalho para indicar que o conteúdo é JSON.
	headers: {
		"Content-Type": "application/json"
	}
});

// Cria uma instância do axios com cabeçalho para formulários multipart.
const instanceFormData = axios.create({
	// Configura o cabeçalho para indicar que o conteúdo é multipart/form-data.
	headers: {
		"Content-Type": "multipart/form-data",
	}
});

// Interceptor para a instância que lida com dados do tipo multipart/form-data.
instanceFormData.interceptors.request.use(config => {
	let token = Cookies.get("tk"); // Recupera o token do cookie.
	if (token) {
		// Adiciona o token de autorização ao cabeçalho se ele existir.
		config.headers.Authorization = `Bearer ${token}`.replace(/(^)|($)/g, "");
	}
	return config; // Retorna a configuração do request.
}, err => {
	return Promise.reject(err); // Rejeita a promessa em caso de erro.
});

// Interceptor para a instância padrão do axios.
instance.interceptors.request.use(config => {
	let token = Cookies.get("tk"); // Recupera o token do cookie.
	if (token) {
		// Adiciona o token de autorização ao cabeçalho se ele existir.
		config.headers.Authorization = `Bearer ${token}`.replace(/(^)|($)/g, "");
	}
	return config; // Retorna a configuração do request.
}, err => {
	return Promise.reject(err); // Rejeita a promessa em caso de erro.
});

// Exporta um objeto que contém métodos para realizar requisições relacionadas à autenticação.
export default {
    // ======== AUTENTICATION ========
	// Método para realizar login autenticando o usuário com os dados fornecidos.
	GetLogin(data) {
		return instance.post("auth/login", data);
	},
	// Método para redefinir a senha do usuário.
	GetResetPwd(data) {
		return instance.put("auth/reset_pwd", data);
	},
	// Método para obter informações do usuário autenticado.
	GetUserInfo(data) {
		return instance.get("auth/detail", data);
	},
};
