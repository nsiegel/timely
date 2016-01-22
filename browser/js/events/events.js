app.config(function ($stateProvider) {
  $stateProvider.state('events', {
    url: '/events',
    templateUrl: '/js/events/events.html',
    controller: 'EventCtrl',
    resolve: {
      user: function (AuthService) {
        return AuthService.getLoggedInUser();
      }
    }
  });
});

app.controller('EventCtrl', function ($scope, EventFactory, user) {

  $scope.user = user;

  EventFactory.getAllUserEvents(user._id)
  .then(function (events) {
    $scope.userEvents = events;
  });

  $scope.sendEvent = function (eventObj) {
    EventFactory.createEvent(eventObj);
  }

});
