'use strict';

import React from 'react';
import d3 from 'd3';
const topojson = require('topojson');
import { shape } from '../utils';

let Shape = React.createClass({

  propTypes: {
    state_id: React.PropTypes.number
  },

  makeShape: function (el, state_id) {
    d3.json('/assets/us.json', function (json) {
      for (let i in json.objects.states.geometries) {
        let obj = json.objects.states.geometries[i];
        if (obj.id === state_id) {
          shape(el, topojson.feature(json, obj));
        }
      }
    });
  },

  componentDidMount: function () {
    this.makeShape(this.refs.stateShape, this.props.state_id);
  },

  render: function () {
    return (
      <div ref='stateShape' className='state-shape'></div>
    );
  }
});

module.exports = Shape;
