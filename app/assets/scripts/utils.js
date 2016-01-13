'use strict';

import nets from 'nets';

export function fetch (url, callback) {
  nets({
    method: 'get',
    encoding: undefined,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    url: url
  }, function (err, resp, body) {
    callback(err, resp, body);
  });
};

export function checkUrl (url) {
  let myRe = /(http:\/\/|https:\/\/)/;
  if (!myRe.test(url)) {
    return 'http://' + url;
  } else {
    return url;
  }
};
