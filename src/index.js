import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";

import { rootReducer } from './services/reducers/root-reducer';
import { compose, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

// Инициализируем хранилище с помощью корневого редьюсера
//const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); 


ReactDOM.render(
  <React.StrictMode>
    {/* Оборачиваем приложение компонентом Provider из пакета react-redux */}
    <Provider store={store}>
      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
