'use strict';

import _ from 'lodash';
import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

let initJurisdiction = {
  data: {
    state: {}
  },
  notFound: false
};

const jurisdiction = function (state = initJurisdiction, action) {
  state = _.cloneDeep(state);

  switch (action.type) {
  case 'RECEIVE_JURISDICTION':
    state.data = action.data;
    break;
  case 'RESET_JURISDICTION':
    state = initJurisdiction;
    break;
  case 'NOTFOUND_JURISDICTION':
    state.notFound = true;
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

const state_jurisdictions = function (state = {}, action) {
  state = _.cloneDeep(state);

  switch (action.type) {
  case 'RECEIVE_STATE_JURISDICTIONS':
    state[action.data[0].state.id] = action.data;
    break;
  }

  return state;
};

export default combineReducers({
  jurisdiction,
  states,
  state_jurisdictions,
  routing: routeReducer
});
