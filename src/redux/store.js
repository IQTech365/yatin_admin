import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import appReducer from './reducers'
import thunk from 'redux-thunk';
const store = createStore(appReducer, applyMiddleware(thunk, logger));

export default store;