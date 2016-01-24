app.config(function($stateProvider) {
    $stateProvider.state('single-event', {
        url: 'my-events/:eventId',
        templateUrl: '/js/events/single.event.html',
        controller: 'MapCtrl',
        resolve: {
        //     geoLocation: function(GeoFactory){
        //         return GeoFactory.getGeoLocation();
        //     },
            currEvent: function($stateParams, EventFactory) {
                var eventId = $stateParams.eventId;
                return EventFactory.getOneUserEvent(eventId);
            }
        }
    });
    $stateProvider.state('edit-event', {
      url: '/edit-event',
      templateUrl: '/js/events/edit.event.html',
      controller: 'EventCtrl',
      resolve: {
        user: function (AuthService) {
          return AuthService.getLoggedInUser();
        }
      }
    })
});

app.controller('MapCtrl', function ($scope, $state, $stateParams, currEvent, GeoFactory, EventFactory) {
    $scope.event = currEvent;
    var currLat;
    var currLng;
    // var remind = true;
    var eventLat = currEvent.endLocation.lat;
    var eventLng = currEvent.endLocation.lng;
    var transMethod = currEvent.transportation;
    var directionCoordinatesUrl;

    $scope.deleteEvent = function (eventId) {
      EventFactory.deleteOne(eventId)
      .then(function () {
        $state.go('my-events')
      });
    }
    
    $scope.editEvent = function (eventId) {
      EventFactory.changeOne(eventId)
      .then(function () {
        $state.go('edit-event')
      });
    }

    mapboxgl.accessToken = 'pk.eyJ1IjoibnNpZWdlbDIiLCJhIjoiY2lqcHY1OTBuMDFkMXRvbTV3eTZ6MXdycSJ9.AO_LTuXwMnDabyGfYydArw';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
        center: [eventLng, eventLat], // starting position
        zoom: 15, // starting zoom
    });

    map.on('style.load', function () {
        return GeoFactory.getGeoLocation()
        .then(function(geoLocation) {
            currLat = geoLocation.coords.latitude;
            currLng = geoLocation.coords.longitude;
            directionCoordinatesUrl = 'https://api.mapbox.com/v4/directions/mapbox.driving/' +
                currLng + ',' + currLat + ';' + eventLng + ',' + eventLat + '.json?'+
                // 'alternatives=false&instructions=html&geometry=polyline&steps=false&&' +
                'access_token=pk.eyJ1IjoibnNpZWdlbDIiLCJhIjoiY2lqcHY1OTBuMDFkMXRvbTV3eTZ6MXdycSJ9.AO_LTuXwMnDabyGfYydArw';
            console.log(directionCoordinatesUrl);
            return GeoFactory.getDirectionCoords(directionCoordinatesUrl);
        }).then(function(directions) {
            map.addSource("route", {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": directions.routes[0].geometry.coordinates
                    }
                }
            });
            function fly() {
                // Fly to a random location by offsetting the point -74.50, 40
                // by up to 5 degrees.
                map.flyTo({
                    center: [currLng, currLat]
                });
            }
            fly();

            map.addLayer({
                "id": "route",
                "type": "line",
                "source": "route",
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "rgb(231, 78, 152)",
                    "line-width": 5
                }
            });

        });
    });
});
