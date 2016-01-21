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
  return Event.createAsync({
    date: new Date().getDate() + 5,
    time: new Date().getHours() + ':00',
    currLocation: { lat:40.71, long: -73.98 },
    endLoacation: { lat: 40.75, long: -74 },
    title: 'First Event',
    details: 'Yay! this is my first event',
    transportation: 'train'
  });
}

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
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
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
