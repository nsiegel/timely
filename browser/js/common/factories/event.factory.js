app.factory('EventFactory', function ($http) {
	return {
		getAllEvents: function () {
			return $http.get('/api/events')
			.then(function (events) {
				return events.data;
			});
		},
		getOneEvent: function () {
			return $http.get('/api/events' + eventId)
			.then(function (event) {
				return event.data;
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
			.then(function (oneEvent) {
				console.log(userId, eventId)
				return oneEvent.data;
			});
		},
		createEvent: function (eventObj) {
			return $http.post('/api/events/add-event', eventObj)
			.then(function (event) {
				return event.data;
			});
		},
		sendEmail: function (eventData, next) {
			console.log(eventData);
			$http.post('/api/email', eventData)
			.then(function () {
				console.log('Email sent?!?!?! (This is the event factory!)');
			})
			.then(null, next);
		}
	}
});