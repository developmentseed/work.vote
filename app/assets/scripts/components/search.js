import _ from 'lodash';
import geo from 'mapbox-geocoding';
import React from 'react';
import config from '../config'
import Select from 'react-select';
import nets from 'nets';
import { pushPath } from 'redux-simple-router'

let options = new Set();

let Search = React.createClass({

  searching: function (input, callback) {
    geo.setAccessToken(config.accessToken);
    geo.geocode('mapbox.places', input, function (err, geoData) {
      if (geoData){
        for (let i = 0; i < geoData.features.length; i++) {
          let coords = geoData.features[i].geometry.coordinates
          nets({
            method: 'get',
            encoding: undefined,
            headers: {
              "Content-Type": "application/json"
            },
            url: `${config.apiUrl}/jurisdictions/?contains=${coords.toString()}`
          }, function(err, resp, body) {
            let results = JSON.parse(body).results;
            for (let j = 0; j < results.length; j++) {
              options.add(results[j].name)
            }
          });

        }

        let temp = []
        for (let item of options) {
          temp.push({value: item , label: item})
        }

        callback(null, {
          options: temp,
        });
      }
      else {
        let emptyOptions=[{}];
        callback(null, {
          options: emptyOptions,
        });
      }

    });
  },

  linkToJurisdiction: function (value, event) {
    pushPath('/');
  },

  render: function () {
    return (
      <div>
        <div id='Search-container'>
          <div id="Address-Finder">
            <div className="center-text"></div>
            <Select.Async
                name="form-field-name"
                placeholder="Search ..."
                loadOptions={this.searching}
                autoload={false}
                isLoading={false}
                onOptionLabelClick={this.linkToJurisdiction}
            />
            <div className="usemap">Locate via map???</div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Search;
