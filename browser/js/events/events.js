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
  $stateProvider.state('single-event', {
    url: '/my-events/:eventId',
    templateUrl: '/js/events/single.event.html',
    controller: 'SingleEventCtrl'
  })
});


app.controller('EventCtrl', function ($scope, $state, $stateParams, EventFactory, user) {

  $scope.user = user;

  EventFactory.getAllUserEvents(user._id)
  .then(function (events) {
    $scope.allEvents = events;
  })

  $scope.sendEvent = function (eventObj) {
    eventObj.user = user._id;
    EventFactory.createEvent(eventObj)
    .then(function () {
      $state.go('my-events');
    });
  }

});

app.controller('SingleEventCtrl', function ($scope, $stateParams, EventFactory, user) {
  $scope.user = user;
  console.log(user._id, $stateParams.eventId)
  EventFactory.getOneUserEvent(user._id, $stateParams.eventId)
  .then(function (event) {
    $scope.oneEvent = event;
  });
});