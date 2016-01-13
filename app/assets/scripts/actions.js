'use strict';

module.exports.fetchJurisdiction = function fetchJurisdiction (jurisdiction) {
  return { type: 'FETCH_JURISDICTION', data: jurisdiction };
};

module.exports.resetJurisdiction = function resetJurisdiction () {
  return { type: 'RESET_JURISDICTION' };
};

module.exports.stateChangeToFalse = function () {
  return { type: 'CANCEL', data: false };
};
