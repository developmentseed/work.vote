'use strict';
var defaultsDeep = require('lodash.defaultsdeep');
/*
 * App configuration.
 *
 * Uses settings in config/production.js, with any properties set by
 * config/staging.js or config/local.js overriding them depending upon the
 * environment.
 *
 * This file should not be modified.  Instead, modify one of:
 *
 *  - config/production.js
 *      Production settings (base).
 *  - config/staging.js
 *      Overrides to production if ENV is staging.
 *  - config/local.js
 *      Overrides if local.js exists.
 *      This last file is gitignored, so you can safely change it without
 *      polluting the repo.
 */

var configurations = require('./config/*.js', {mode: 'hash'});
var config = configurations.local || {};

if (process.env.DS_ENV === 'staging') {
  defaultsDeep(config, configurations.staging);
}
defaultsDeep(config, configurations.production);

let i = 1;
let technologyOptions = [];
while (i < 11) {
  technologyOptions.push({
    value: i, label: i.toString()
  });
  i++;
}

config.ageOptions = [
    { value: 0, label: '16 to 18' },
    { value: 1, label: '19 to 25' },
    { value: 2, label: '26 to 35' },
    { value: 3, label: '36 to 50' },
    { value: 4, label: '51 to 50' },
    { value: 5, label: '65 and older' }
];

config.languageOptions = [
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Bengali', label: 'Bengali' },
  { value: 'Cantonese', label: 'Cantonese' },
  { value: 'Hopi', label: 'Hopi' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Korean', label: 'Korean' },
  { value: 'Navajo', label: 'Navajo' },
  { value: 'O\'odham', label: 'O\'odham' },
  { value: 'Persian', label: 'Persian' },
  { value: 'Quechan/Yumac', label: 'Quechan/Yuma' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'Tagalog', label: 'Tagalog' },
  { value: 'Vietnamese', label: 'Vietnamese' },
  { value: 'Yaqui', label: 'Yaqui' },
  { value: 'Zuni', label: 'Zuni' }
];

config.technologyOptions = technologyOptions;

module.exports = config;
