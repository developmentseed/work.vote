/* global localStorage */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routeReducer, UPDATE_PATH } from 'redux-simple-router';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const initialState = {
  frontpage: {
    name: 'something'
  }
};


const frontpage = function (state = {}, action) {
  switch (action.type) {
    case 'TEST':
      return Object.assign({}, state, { });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  frontpage,
  routing: routeReducer
});

export default createStoreWithMiddleware(rootReducer, initialState);
