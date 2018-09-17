import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
const initialState = {};
const store = createStore(reducer, initialState, compose(applyMiddleware(thunkMiddleware)));
export default store;
