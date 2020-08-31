import {applyMiddleware, compose, createStore} from "redux";
import thunk from 'redux-thunk';

import {createBrowserHistory} from "history";

import createRootReducer from './reducer';


export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore() {
  return createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(thunk))
  );
}
