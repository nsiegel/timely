app.config(function($stateProvider) {
  $stateProvider.state('map', {
    url: '/my-events/:eventId/map',
    templateUrl: '/js/map/map.html',
    controller: 'MapCtrl'
  })
});

app.controller('MapCtrl', function($scope) {
  mapboxgl.accessToken = 'pk.eyJ1IjoibnNpZWdlbDIiLCJhIjoiY2lqcHY1OTBuMDFkMXRvbTV3eTZ6MXdycSJ9.AO_LTuXwMnDabyGfYydArw';
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
    center: [-73.99, 40.73], // starting position
    zoom: 13 // starting zoom
  });

});
