import React from 'react';
import ReactDOM from 'react-dom';

import {ConnectedRouter} from "connected-react-router";

import configureStore, {history} from "./store/config";
import {Provider} from 'react-redux';

import App from './App';


const store = configureStore();


ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <App/>
    </ConnectedRouter>
</Provider>, document.getElementById('root'));
