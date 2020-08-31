import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

import environmentReducer from './environment/reducer';
import optimizationReducer from './optimization/reducer';


export default history => combineReducers({
  router: connectRouter(history),
  environment: environmentReducer,
  optimization: optimizationReducer
});
