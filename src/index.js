import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from "./reducers";
import ReduxThunk from "redux-thunk";


// Cria a store do Redux utilizando os reducers definidos, aplicando middleware ReduxThunk para lidar com ações assíncronas.
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

// Obtém a raiz do DOM onde a aplicação React será renderizada.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza a aplicação dentro do Provider do Redux, permitindo que todos os componentes tenham acesso à store.
root.render(
    <Provider store={store}>
        <App /> // Renderiza o componente principal da aplicação.
    </Provider>
);

// Registra um service worker para permitir funcionalidades offline e melhorar o desempenho.
registerServiceWorker();

