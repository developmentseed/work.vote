'use strict';

import React from 'react';
import config from '../config';
import mapboxgl from 'mapbox-gl';
import Box from '../components/box';

let MapView = React.createClass({

  componentDidMount: function () {
    mapboxgl.accessToken = config.accessToken;

    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/devseed/cife4hfep6f88smlxfhgdmdkk',
      zoom: 4,
      minZoom: 2,
      doubleClickZoom: false,
      center: [-97.43, 38.54]
    });

    map.on('style.load', function () {
      map.addSource('counties', {
        type: 'vector',
        url: 'mapbox://devseed.66m20amp'
      });
      map.addLayer({
        'id': 'county-fill',
        'type': 'fill',
        'source': 'counties',
        'source-layer': 'jursidictions',
        'interactive': true,
        'layout': {},
        'paint': {
          'fill-color': 'rgba(138,255,247,0.4)',
          'fill-opacity': 1
        }
      });
      map.addLayer({
        'id': 'county-line',
        'type': 'line',
        'source': 'counties',
        'source-layer': 'jursidictions',
        'layout': {},
        'paint': {
          'line-color': '#9fb7bf',
          'line-width': 0.4
        }
      });
      map.addLayer({
        'id': 'county-hover',
        'type': 'fill',
        'source': 'counties',
        'source-layer': 'jursidictions',
        'layout': {},
        'paint': {
          'fill-color': '#fff64d',
          'fill-opacity': 0.6
        },
        'filter': ['==', 'NAME', '']
      });
    });

    let usemap = document.querySelector('.usemap');
    let toggle = document.querySelector('#Search-enabler');

    usemap.addEventListener('click', function () {
      document.querySelector('#Search-container').style.display = 'none';
      document.querySelector('#Search-enabler').style.display = 'block';
      toggle.style.display = 'block';
    });

    toggle.addEventListener('click', function () {
      document.querySelector('#Search-container').style.display = 'block';
      document.querySelector('#Search-enabler').style.display = 'none';
      toggle.style.display = 'none';
    });
  },

  render: function () {
    return (
      <Box>
        <div id='map'></div>
      </Box>
    );
  }
});

module.exports = MapView;
