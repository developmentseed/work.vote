'use strict';

import React from 'react';
import d3 from 'd3';
const topojson = require('topojson');

function MapClass (el, states) {
  this.$el = d3.select(el);
  const self = this;

  this.width = parseInt(this.$el.style('width'), 10);
  this.height = (this.width * 5) / 9;

  this._init = () => {
    const projection = d3.geo.albersUsa()
      .scale(this.width + this.width * 0.1)
      .translate([this.width / 2, this.height / 2]);

    const path = d3.geo.path().projection(projection);

    const svg = this.$el.append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    svg.append('rect')
      .attr('class', 'background')
      .attr('width', this.width)
      .attr('height', this.height);

    const g = svg.append('g');

    this.states = {};
    this.states_incomplete = [];
    for (const i in states) {
      const _id = states[i].topojson_id;

      if (_id) {
        this.states[_id] = {
          'id': states[i].id
        };
        if (states[i].is_active) {
          this.states[_id].fill = '#a55873';
          this.states[_id].hover = '#d85a7a';
        } else if (states[i].pollworker_website !== '') {
          this.states[_id].fill = '#d6a6b7';
          this.states[_id].hover = '#efacc4';
        }
      }
    }

    d3.json('../../us.json', (error, us) => {
      if (error) throw error;
      g.append('g')
        .attr('id', 'states')
        .selectAll('path')
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append('path')
        .attr('d', path)
        .style('fill', (d) => {
          if (d.id in this.states) {
            return this.states[d.id].fill;
          }
        })
        .style('cursor', (d) => {
          if (d.id in this.states) {
            return 'pointer';
          }
        })
        .style('transition', 'fill 0.2s')
        .on('mouseover', this.hover)
        .on('mouseout', this.hoverEnds)
        .on('click', this.click);

      g.append('path')
        .datum(topojson.mesh(us, us.objects.states, (a, b) => { return a !== b; }))
        .attr('id', 'state-borders')
        .attr('d', path);
    });
  };

  this.hover = function (d, i) {
    if (d.id in self.states) {
      d3.select(this).style('fill', self.states[d.id].hover);
    }
  };

  this.hoverEnds = function (d) {
    if (d.id in self.states) {
      d3.select(this).style('fill', self.states[d.id].fill);
    } else {
      d3.select(this).style('fill', '#cccccc');
    }
  };

  this.click = (d) => {
    if (d.id in this.states) {
      window.location.href = `#/states/${this.states[d.id].id}`;
    }
  };

  this._init();
}

class Map extends React.Component {
  componentDidMount () {
    this.map = new MapClass(this.refs.mymap, this.props.data);
  }

  render () {
    return (
      <div id='map' ref='mymap'></div>
    );
  }
}

export default Map;
