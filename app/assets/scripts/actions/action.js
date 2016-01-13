'use strict';

import nets from 'nets';
import config from '../config.js';

export function receiveJurisdiction (jurisdiction) {
  return { type: 'RECEIVE_JURISDICTION', data: jurisdiction };
};

export function fetchJurisdiction (id) {
  return dispatch => {
    nets({
      method: 'get',
      encoding: undefined,
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${config.apiUrl}/jurisdictions/${id}/`
    }, function (err, resp, body) {
      if (err) {
        console.log(err);
      }
      if (resp.statusCode === 200) {
        dispatch(receiveJurisdiction(JSON.parse(body)));
      } else {
        dispatch(resetJurisdiction());
      }
    });
  };
};

export function receiveStates (states) {
  return { type: 'RECEIVE_STATES', data: states};
};

export function fetchStates () {
  return dispatch => {
    nets({
      method: 'get',
      encoding: undefined,
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${config.apiUrl}/states/`
    }, function (err, resp, body) {
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

export function resetJurisdiction () {
  return { type: 'RESET_JURISDICTION' };
};

export function stateChangeToFalse () {
  return { type: 'CANCEL', data: false };
};
