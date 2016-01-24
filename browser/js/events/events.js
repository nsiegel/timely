app.config(function ($stateProvider) {
  $stateProvider.state('add-event', {
    url: '/add-event',
    templateUrl: '/js/events/add.event.html',
    controller: 'EventCtrl',
    resolve: {
      user: function (AuthService) {
        return AuthService.getLoggedInUser();
      }
    }
  })
  $stateProvider.state('my-events', {
    url: '/my-events',
    templateUrl: '/js/events/my.events.html',
    controller: 'EventCtrl',
    resolve: {
      user: function (AuthService) {
        return AuthService.getLoggedInUser();
      }
    }
  })
});


app.controller('EventCtrl', function ($scope, $state, $stateParams, EventFactory, user) {
  $scope.user = user;

  EventFactory.getAllUserEvents(user._id)
  .then(function (events) {
    $scope.allEvents = events;
    for (var i = 0; i < $scope.allEvents.length; i++) {
      var when = Date.parse($scope.allEvents[i].date) - Date.now();
      // set to notify five minutes before an event
      if (when <= 300000 && when > 0) {
        notifyMe();
      }
    }
  })

  $scope.sendEvent = function (eventObj) {
    eventObj.user = user._id;
    EventFactory.createEvent(eventObj)
    .then(function () {
      $state.go('my-events');
    });
  }

});