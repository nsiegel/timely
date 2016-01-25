app.factory('GeoFactory', function($window, $q, $http) {
    return {
        getGeoLocation: function() {
            var deferred = $q.defer();

            if (!$window.navigator.geolocation) {
                deferred.reject('Geolocation not supported.');
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        deferred.resolve(position);
                    },
                    function (err) {
                        deferred.reject(err);
                    });
            }

            return deferred.promise;
        },
        getDirectionCoords: function(url) {
            return $http.get(url)
            .then(function(res) {
                return res.data;
            }).then(null, console.err);
        }
    };
});
