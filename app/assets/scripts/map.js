  mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q';

  // var hovermap = new mapboxgl.Map({
  //   container: 'map',
  //   style: hoverStyle,
  //   center: [-97.43, 38.54],
  //   zoom: 3 
  // })

  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/devseed/cife4hfep6f88smlxfhgdmdkk',
      center: [-97.43, 38.54],
      zoom: 3 
  });

  map.on('style.load', function () {
      map.addSource('counties', {
          type: 'vector',
          url: 'mapbox://devseed.66m20amp'
      });
      map.addLayer({
          "id": "county-fill",
          "type": "fill",
          "source": "counties",
          "source-layer": "jursidictions",
          "layout": {},
          "paint": {
              "fill-color": "#f7f5a8",
              "fill-opacity": 1
          }
      });
      map.addLayer({
          "id": "county-line",
          "type": "line",
          "source": "counties",
          "source-layer": "jursidictions",
          "layout": {},
          "paint": {
              "line-color": "black",
              "line-width": 1
          }
      });    
      map.addLayer({
          "id": "county-hover",
          "type": "fill",
          "source": "counties",
          "source-layer": "jursidictions",
          "layout": {},
          "paint": {
              "fill-color": "#a8f7e8",
              "fill-opacity": 1
          },
          "filter": ["==", "NAME", ""]
      });
  });

  map.on("click", function(e) {
        map.featuresAt(e.point, {
            radius: 5,
            layers: ["county-fill"]
        }, function (err, features) {
            if (!err && features.length) {
                map.setFilter("county-hover", ["==", "NAME", features[0].properties.NAME]);
                console.log(features[0].properties.NAME);
            } else {
                map.setFilter("county-hover", ["==", "NAME", ""]);
            }
        });
    });

