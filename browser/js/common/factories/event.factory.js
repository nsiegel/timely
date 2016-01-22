app.factory('EventFactory', function ($http) {
	return {
		getAllEvents: function () {
			return $http.get('/api/events')
			.then(function (events) {
				return events.data;
			});
		},
		getAllUserEvents: function (userId) {
			return $http.get('/api/users/' + userId + '/events')
			.then(function (usersEvents) {
				return usersEvents.data;
			})
			.then(null, function (err) {
				console.error(err);
			});
		},
		getOneUserEvent: function (userId, eventId) {
			return $http.get('/api/users/' + userId + '/events/' + eventId)
			.then(function (usersEvent) {
				return usersEvent.data;
			});
		},
		createEvent: function (eventObj) {
			return $http.post('/api/events', eventObj)
			.then(function (event) {
				return event.data;
			});
		}
	}
});