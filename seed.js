/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Event = Promise.promisifyAll(mongoose.model('Event'));

var seedEvents = function() { 
    var events = [
        {
            date: new Date('January 25, 2016 09:00:00'),
            startLocation: {
                latitude: 40.7282239, 
                longitude: -73.7948516
            },
            endLocation: {
                latitude: 40.7050758,
                longitude: -74.0091604
            },
            transportation: 'drive',
            title: 'First Event',
            details: 'Yay! this is my first event'
        },
        {
            date: new Date('January 25, 2016 07:00:00'),
            startLocation: {
                latitude: 40.782222,
                longitude: -74.0091604
            },
            endLocation: {
                latitude: 40.7050758,
                longitude: -73.9785551
            },
            transportation: 'train',
            title: 'Second Event',
            details: 'Yay! this is my second event'
        }
    ]
    return Event.createAsync(events);
};

var seedUsers = function (events) {
    
    var users = [
        {
            email: 'nsiegal@fsa.com',
            password: 'password',
            events: [events[Math.floor(Math.random()*events.length)]._id]
        },
        {
            email: 'jpark@fsa.com',
            password: 'password',
            events: [events[Math.floor(Math.random()*events.length)]._id]
        }
    ];

    return User.createAsync(users)
    .then(function(users) {
        var usersPromises = [];
        users.forEach(function(user) {
            user.events.forEach(function(eventId) {
                var eventPromise = Event.findById(eventId)
                .then(function(foundEvent) {
                    foundEvent.user = user._id;
                    return foundEvent.save()
                    .then(function() {
                      console.log('Events updated with users successfully');
                    });
                })
                usersPromises.push(eventPromise);
            });
        })
        return Promise.all(usersPromises)
        .then(function() {
            return users;
        });
    });
};

connectToDb.then(function () {
    var savedUsers;
    var savedEvents;
    
    seedEvents()
    .then(function(events){
        savedEvents = events;
        console.log(chalk.green('Events seeded successfully!'));
        return seedUsers(savedEvents, []);
    })
    .then(function(users){
        savedUsers = users;
        console.log(chalk.green('Users seeded successfully!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
    });

    // User.findAsync({}).then(function (users) {
    //     if (users.length === 0) {
    //         return seedUsers();
    //     } else {
    //         console.log(chalk.magenta('Seems to already be user data, exiting!'));
    //         process.kill(0);
    //     }
    // }).then(function () {
    //     console.log(chalk.green('Seed successful!'));
    //     process.kill(0);
    // }).catch(function (err) {
    //     console.error(err);
    //     process.kill(1);
    // });
});
