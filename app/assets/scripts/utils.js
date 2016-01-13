'use strict';

import nets from 'nets';
import config from './config.js';

module.exports.fetchJurisditction = function fetchJurisditction (id, callback) {
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
      callback(JSON.parse(body));
    } else {
      callback(null);
    }
  });
};

module.exports.checkUrl = function (url) {
  let myRe = /(http:\/\/|https:\/\/)/;
  if (!myRe.test(url)) {
    return 'http://' + url;
  } else {
    return url;
  }
};
