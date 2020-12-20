import '../styles/global.css';
import { AppProps } from 'next/app';
import "../styles/main-layout.scss";
import "../styles/info.scss";
import {combineReducers, createStore} from "redux";
import {HeaderReducer, initialState, wrapper} from "../store/header.reducer";
import {Provider} from "react-redux";
import React from "react";
import '../styles/home.scss'
import ReactGA from 'react-ga';

// const store = createStore(combineReducers({HeaderReducer}));
const WrappedApp = ({ Component, pageProps }) => {
    ReactGA.initialize('G-6QKVW0QB9Z');
    return <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp)

