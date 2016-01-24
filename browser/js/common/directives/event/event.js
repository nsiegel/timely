app.directive('oneEvent', function ($state) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/event/event.html',
		scope: {
			event: '='
		},
		link: function (scope, element, attributes) {
			element.on('click', function () {
				$state.go('single-event', { eventId: scope.event._id })
			});
		}
	}
});