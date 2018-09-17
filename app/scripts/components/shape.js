'use strict';

import React from 'react';
import d3 from 'd3';
import { shape } from '../utils';
const topojson = require('topojson');

class Shape extends React.Component {
  makeShape (el, stateId) {
    d3.json('/us.json', function (json) {
      for (const i in json.objects.states.geometries) {
        const obj = json.objects.states.geometries[i];
        if (obj.id === stateId) {
          shape(el, topojson.feature(json, obj));
        }
      }
    });
  }

  componentDidMount () {
    this.makeShape(this.refs.stateShape, this.props.stateId);
  }

  render () {
    return (
      <div ref='stateShape' className='state-shape'></div>
    );
  }
}

export default Shape;
