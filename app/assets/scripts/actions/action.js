'use strict';

import config from '../config.js';
import { fetch, fetchWithPagination } from '../utils';

export function receiveJurisdiction (jurisdiction) {
  return { type: 'RECEIVE_JURISDICTION', data: jurisdiction };
};

export function resetJurisdiction () {
  return { type: 'RESET_JURISDICTION' };
};

export function notFoundJurisdiction () {
  return { type: 'NOTFOUND_JURISDICTION' };
};

export function fetchJurisdiction (id) {
  return dispatch => {
    dispatch(resetJurisdiction());
    fetch(`${config.apiUrl}/jurisdictions/${id}/`, function (err, resp, body) {
      if (err) {
        console.log(err);
      }
      if (resp.statusCode === 200) {
        dispatch(receiveJurisdiction(JSON.parse(body)));
      } else {
        dispatch(notFoundJurisdiction());
      }
    });
  };
};

export function receiveStates (states) {
  return { type: 'RECEIVE_STATES', data: states};
};

export function fetchStates () {
  return dispatch => {
    fetch(`${config.apiUrl}/states/`, function (err, resp, body) {
      if (err) {
        console.log(err);
      }
      if (resp.statusCode === 200) {
        let b = JSON.parse(body);
        dispatch(receiveStates(b.results));
      }
    });
  };
};

export function receiveStateJurisdictions (data) {
  return { type: 'RECEIVE_STATE_JURISDICTIONS',
           data: data };
};

export function resetStateJurisdictions () {
  return { type: 'RESET_STATE_JURISDICTIONS' };
};

export function receivePages (slug, page) {
  return { type: 'RECEIVE_PAGES', data: page, slug: slug};
};

export function notFoundPage (slug) {
  return { type: 'NOTFOUND_PAGE', slug: slug};
};

export function fetchPage (slug) {
  return dispatch => {
    fetch(`${config.apiUrl}/pages/${slug}/`, function (err, resp, body) {
      if (err) {
        console.log(err);
        return dispatch(notFoundPage(slug));
      }
      if (resp.statusCode === 200) {
        let b = JSON.parse(body);
        dispatch(receivePages(slug, b));
      } else {
        dispatch(notFoundPage(slug));
      }
    });
  };
};

export function fetchStateJurisdictions (state_id) {
  return dispatch => {
    fetchWithPagination(`${config.apiUrl}/jurisdictions/?summary=true&state_id=${state_id}`, null, function (err, resp, body) {
      if (err) {
        console.log(err);
      }
      if (resp.statusCode === 200) {
        body.state_id = state_id;
        dispatch(receiveStateJurisdictions(body));
      }
    });
  };
};
