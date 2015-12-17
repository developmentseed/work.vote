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
        "id": "jursidictions",
        "type": "fill",
        "source": "counties",
        "source-layer": "jursidictions",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#ff69b4",
            "line-width": 0.001
        }
    });
});