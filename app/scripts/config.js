'use strict';
const merge = require('lodash.merge');
/*
 * App configuration.
 *
 * Any properties from config/production.js or config/local.js overrides
 * properties set in this file.
 *
 * This file should not be modified.  Instead, modify one of:
 *
 *  - config/production.js
 *      Production settings (base).
 *  - config/local.js
 *      Overrides if local.js exists.
 *      This last file is git ignored, so you can safely change it without
 *      polluting the repo.
 */

let config = {};
let configOverrides;

if (process.env.DS_ENV === 'production') {
  configOverrides = require(`./config/production.js`);
} else {
  configOverrides = require('./config/local.js') || {};
}

let i = 1;
let technologyOptions = [];
while (i < 6) {
  technologyOptions.push({
    value: i, label: i.toString()
  });
  i++;
}

config.apiUrl = 'https://api.workelections.com';
config.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q'; 
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

config.ga = 'UA-65976828-4';
config.pixel = '267782117400714';
config.cookieName = 'workelections_com_seen_survey';

config.technologyOptions = technologyOptions;

config = merge(config, configOverrides);

module.exports = config;
