'use strict';

import nets from 'nets';
import config from './config.js';

let fetch = function (url, callback) {
  nets({
    method: 'get',
    encoding: undefined,
    headers: {
      'Content-Type': 'application/json'
    },
    url: url
  }, function (err, resp, body) {
    if (err) {
      console.log(err);
    }
    if (resp.statusCode === 200) {
      callback(JSON.parse(body));
    } else {
      callback(null);
    }
  });
};

module.exports.fetchJurisditction = function (id, callback) {
  return fetch(`${config.apiUrl}/jurisdictions/${id}/`, callback);
};

module.exports.fetchStates = function (callback) {

};

module.exports.checkUrl = function (url) {
  let myRe = /(http:\/\/|https:\/\/)/;
  if (!myRe.test(url)) {
    return 'http://' + url;
  } else {
    return url;
  }
};
