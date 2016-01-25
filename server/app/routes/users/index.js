'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var User = mongoose.model('User');
module.exports = router;

// GET /api/users
router.get('/', function (req, res, next) {
  User.find({}).exec()
    .then(function (users) {
      res.status(200).json(users);
    }).then(null, function (err) {
      err.message = "Something went wrong finding all users!";
      next(err);
    });
});

// GET /api/users/:userId
router.get('/:userId', function (req, res, next) {
  var id = req.params.userId;
  User.findById(id).exec()
    .then(function (user) {
      res.status(200).json(user);
    }).then(null, function (err) {
      err.message = "Something went wrong finding a user!";
      next(err);
    });
});

// GET ALL EVENTS FOR ONE USER
// GET /api/users/:userId/events/
router.get('/:userId/events', function (req, res, next) {
  var id = req.params.userId;
  Event.find({ user: id }).populate('user').exec()
    .then(function (events) {
      res.status(200).json(events);
    }).then(null, function (err) {
      err.message = "Something went wrong finding user's events!";
      next(err);
    });
});

// GET SPECIFIC EVENT FOR ONE USER
// GET /api/users/:userId/events/:eventId
router.get('/:userId/events/:eventId', function (req, res, next) {
  var id = req.params.eventId;
  Event.findById(id).exec()
    .then(function (event) {
      res.status(200).json(event);
    }).then(null, function (err) {
      err.message = "Something went wrong finding a user's event!";
      next(err);
    });
});

// POST/CREATE /api/users/
router.post('/', function (req, res, next) {
  User.create(req.body)
    .then(function (createdUser) {
      res.status(201).json(createdUser);
    }).then(null, function (err) {
      err.message = "Something went wrong creating a user!";
      next(err);
    });
});

// PUT/UPDATE /api/users/:userId
router.put('/:userId', function (req, res, next) {
  var id = req.params.userId;
  User.findByIdAndUpdate(id, { $set: req.body })
    .then(function (updatedUser) {

      res.status(200).json(updatedUser);
    }).then(null, function (err) {
      err.message = "Something went wrong updating this user!";
      next(err);
    });
});

// DELETE /api/users/:userId
router.delete('/:userId', function (req, res, next) {
  var id = req.params.userId;
  User.find({ _id: id }).remove()
    .then(function () {
      res.status(204).end();
    }).then(null, function (err) {
      err.message = "Something went wrong deleting this user!";
      next(err);
    });
});
