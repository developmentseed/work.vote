'use strict';

import cloneDeep from 'lodash.clonedeep';
import isUndefined from 'lodash.isundefined';
import { combineReducers } from 'redux';

const initJurisdiction = {
  data: {
    state: {},
    geometry: null
  },
  notFound: false
};

function jurisdiction (state = initJurisdiction, { type, next }) {
  state = cloneDeep(state);

  switch (type) {
    case 'RECEIVE_JURISDICTION':
      state.data = next;
      break;
    case 'RESET_JURISDICTION':
      state = initJurisdiction;
      break;
    case 'NOTFOUND_JURISDICTION':
      state.notFound = true;
      break;
  }

  return state;
}

function pages (page = {}, { type, next }) {
  page = cloneDeep(page);

  if (next && isUndefined(page[next.slug])) {
    page[next.slug] = {};
  }

  switch (type) {
    case 'RECEIVE_PAGES':
      page[next.slug] = next.page;
      page[next.slug].notFound = false;
      break;
    case 'NOTFOUND_PAGE':
      page[next.slug].notFound = true;
      break;
  }

  return page;
}

function states (state = [], { type, next }) {
  state = cloneDeep(state);

  switch (type) {
    case 'RECEIVE_STATES':
      state = next;
      break;
  }

  return state;
}

function stateJurisdictions (state = {}, { type, next }) {
  state = cloneDeep(state);

  switch (type) {
    case 'RECEIVE_STATE_JURISDICTIONS':
      state[next.stateId] = next;
      break;
  }

  return state;
}

const initSurvey = {
  showModal: false,
  formError: false,
  submittingForm: false,
  errorMessage: null
};

function survey (state = initSurvey, { type, next }) {
  state = cloneDeep(state);

  switch (type) {
    case 'SHOW_SURVEY_MODAL':
      state.showModal = true;
      break;
    case 'HIDE_SURVEY_MODAL':
      state.showModal = false;
      break;
    case 'SUBMIT_SURVEY_STARTED':
      state.submittingForm = true;
      break;
    case 'SUBMIT_SURVEY_SUCCEEDED':
      state.submittingForm = false;
      state.formError = false;
      state.showModal = false;
      break;
    case 'SUBMIT_SURVEY_FAILED':
      state.submittingForm = false;
      state.formError = true;
      state.errorMessage = 'An unexpected error occurred while submitting the form. Please try again!';
      state.showModal = true;
      break;
    case 'SURVEY_MISSING_FIELDS':
      state.submittingForm = false;
      state.formError = true;
      state.errorMessage = `These required fields are missing: ${next}`;
      break;
  }

  return state;
}

const initSearch = {
  value: '',
  suggestions: [],
  isLoading: false
};

function search (state = initSearch, { type, next }) {
  state = cloneDeep(state);
  const searching = 'Searching ...';
  const nothing = 'Nothing Found!';

  switch (type) {
    case 'UPDATE_INPUT_VALUE':
      state.value = next;
      if (state.value === searching || state.value === nothing) {
        state.value = '';
      }
      break;
    case 'CLEAR_SUGGESTIONS':
      state.suggestions = [];
      state.value = '';
      break;
    case 'LOAD_SUGGESTIONS_BEGIN':
      state.isLoading = true;
      state.suggestions = [{ name: searching, noLink: true }];
      break;
    case 'MAYBE_UPDATE_SUGGESTIONS':
      if (state.value !== next.value) {
        state.isLoading = false;
      } else {
        state.suggestions = next.suggestions;
        if (state.suggestions.length === 0) {
          state.suggestions = [{ name: nothing, noLink: true }];
        }
      }
      break;
  }
  return state;
}

export default combineReducers({
  jurisdiction,
  states,
  pages,
  stateJurisdictions,
  survey,
  search
});
