import _ from 'lodash';
import geo from 'mapbox-geocoding';
import React from 'react';
import config from '../config'
import Select from 'react-select';

let Search = React.createClass({

  searching: function (input, callback) {
    geo.setAccessToken(config.accessToken);
    geo.geocode('mapbox.places', input, function (err, geoData) {
      if (geoData){
        let options = [];
        for (let i = 0; i < geoData.features.length; i++) {
          options.push({value: geoData.features[i].place_name, label: geoData.features[i].place_name})
        }
            callback(null, {
                options: options,
              });
      }
      else {
        let options=[{}];
        callback(null, {
          options: options,
        });
      }

    });
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
            />
            <div className="usemap">Locate via map???</div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Search;
