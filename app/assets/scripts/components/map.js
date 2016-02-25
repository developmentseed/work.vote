'use strict';

import _ from 'lodash';
import React from 'react';
import d3 from 'd3';
import topojson from 'topojson';

let MapClass = function (el, states) {
  this.$el = d3.select(el);
  let self = this;

  self.width = parseInt(this.$el.style('width'), 10);
  self.height = (self.width * 5) / 9;

  self._init = function () {
    let projection = d3.geo.albersUsa()
                       .scale(self.width + self.width * 0.1)
                       .translate([self.width / 2, self.height / 2]);

    let path = d3.geo.path()
                 .projection(projection);

    let svg = this.$el.append('svg')
                .attr('width', self.width)
                .attr('height', self.height);

    svg.append('rect')
        .attr('class', 'background')
        .attr('width', this.width)
        .attr('height', this.height);

    let g = svg.append('g');

    self.states = {};
    self.states_incomplete = [];
    for (let i in states) {
      let _id = states[i].topojson_id;

      if (_id) {
        self.states[_id] = {
          'id': states[i].id
        };
        if (states[i].is_active) {
          self.states[_id].fill = '#a55873' ;
        } else if (states[i].pollworker_website !== '') {
          self.states[_id].fill = '#d6a6b7';
        }
      }
    }

    d3.json('/assets/us.json', function (error, us) {
      if (error) throw error;
      g.append('g')
        .attr('id', 'states')
        .selectAll('path')
          .data(topojson.feature(us, us.objects.states).features)
        .enter().append('path')
          .attr('d', path)
          .style('fill', function (d) {
            if (d.id in self.states) {
              return self.states[d.id].fill;
            }
          })
          .on('mouseover', self.hover)
          .on('mouseout', self.hoverEnds)
          .on('click', self.click);

      g.append('path')
        .datum(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; }))
        .attr('id', 'state-borders')
        .attr('d', path);
    });

  };

  self.hover = function (d, i) {
    if (d.id in self.states) {
      d3.select(this).style('fill', '#394471');
    }
  };

  self.hoverEnds = function (d) {
    if (d.id in self.states) {
      d3.select(this).style('fill', self.states[d.id].fill);
    } else {
      d3.select(this).style('fill', '#aaa');
    }
  };

  self.click = function (d) {
    if (d.id in self.states) {
      window.location.href = `#/states/${self.states[d.id].id}`;
    }
  };

  self._init();
};

let Map = React.createClass({

  propTypes: {
    data: React.PropTypes.array
  },

  componentDidMount: function () {
    this.map = new MapClass(this.refs.mymap, this.props.data);
  },

  render: function () {
    return (
      <div id='map' ref='mymap'></div>
    );
  }
});

module.exports = Map;
