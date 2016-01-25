app.config(function($stateProvider) {
    $stateProvider.state('add-event', {
        url: '/add-event',
        templateUrl: '/js/events/add.event.html',
        controller: 'EventCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    })
    $stateProvider.state('my-events', {
        url: '/my-events',
        templateUrl: '/js/events/my.events.html',
        controller: 'EventCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    })
});

app.controller('EventCtrl', function($scope, $state, $stateParams, Socket, EventFactory, user) {

    function notifyMe() {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            alert("This browser does not support system notifications");
        } else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            var n = {
                body: 'leave now to be on timely!',
                icon: 'http://i.imgur.com/am171kR.png'
            }

            var notification = new Notification('timely', n);
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function(permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    var notification = new Notification("Hi there!");
                }
            });
        }
    }

    $scope.user = user;

    EventFactory.getAllUserEvents(user._id)
        .then(function(events) {
            $scope.allEvents = events;
            for (var i = 0; i < $scope.allEvents.length; i++) {
                var when = Date.parse($scope.allEvents[i].date) - Date.now();
                // set to notify five minutes before an event
                if (when <= 300000 && when > 0) {
                    notifyMe();
                }
            }
        })

    $scope.sendEvent = function(eventObj) {
        eventObj.user = user._id;
        EventFactory.createEvent(eventObj)
            .then(function(event) {
                console.log('im adding event ', event);
                Socket.emit('reminders', event)
                $state.go('my-events');
            });
    }
});
