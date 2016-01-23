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
		},
		sendEmail: function (eventData, next) {
			console.log(eventData);
			$http.post('/api/mandrill', eventData)
			.then(function () {
				console.log('Email sent?!?!?! (This is the event factory!)');
			})
			.then(null, next);
		}
	}
});