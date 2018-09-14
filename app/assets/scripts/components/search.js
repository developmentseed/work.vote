'use strict';

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import Autosuggest from 'react-autosuggest';
import { fetch } from '../utils';
import config from '../config';

let juris = {};

let Search = React.createClass({
  displayName: 'Search',
  propTypes: {
    dispatch: React.PropTypes.func
  },
  getSuggestions: function (input, callback) {
    let options = new Set();
    callback(null, ['Searching...']);
    fetch(`${config.apiUrl}/search/?q=${input}`, function (err, resp, body) {
      if (err) {
        callback(null, ['nothing found!']);
      }
      let results = JSON.parse(body);
      for (let j = 0; j < results.length; j++) {
        let option = '';
        let segment = '';
        if (results[j].type === 'jurisdiction') {
          option = results[j].name + ', ' + results[j].state_alpha;
          segment = 'j';
        } else if (results[j].type === 'state') {
          option = results[j].name;
          segment = 'states';
        }

        juris[option] = {
          'id': results[j].id,
          'segment': segment
        };
        options.add(option);
      }

      let response = Array.from(options);
      if (_.isEmpty(response)) {
        callback(null, ['nothing found!']);
      } else {
        callback(null, response);
      }
    });
  },

  componentDidMount: function () {
    this.refs.searchbox.refs.input.focus();
  },

  onSuggestionSelected: function (value, event) {
    this.props.dispatch(routeActions.push(`${juris[value].segment}/${juris[value].id}`));
  },

  render: function () {
    return (
      <div>
        <div id='Search-container'>
          <div id='Address-Finder'>
            <div className='search-label'>Enter your state, county, city, zip code or address</div>
            <Autosuggest suggestions={this.getSuggestions} onSuggestionSelected={this.onSuggestionSelected} ref='searchbox'/>
          </div>
        </div>
        <div id='Search-enabler'><img src='/assets/graphics/layout/search.png'></img></div>
      </div>
    );
  }
});

export default connect()(Search);
