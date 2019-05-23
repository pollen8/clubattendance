/// <reference path="../../global.d.ts"/>
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducer from '../../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};

const loggerMiddleware = createLogger({
  collapsed: true,
  level: 'error',
});

const enhancer = composeEnhancers(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);

const store = createStore(reducer, initialState, enhancer);

// Export as any as I can't work out how to add Thunk middleware type definitions to the store.dispatch
export default store as any;
