'use strict';

import _ from 'lodash';
import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

const jurisdiction = function (state = {id: null}, action) {
  state = _.cloneDeep(state);

  switch (action.type) {
  case 'RECEIVE_JURISDICTION':
    state = action.data;
    break;
  case 'RESET_JURISDICTION':
    state = {id: null};
    break;
  }

  return state;
};

const states = function (state = [], action) {
  state = _.cloneDeep(state);

  switch (action.type) {
  case 'RECEIVE_STATES':
    state = action.data;
  }

  return state;
};

// const state_jurisdictions = function (state = [],)

export default combineReducers({
  jurisdiction,
  states,
  routing: routeReducer
});
