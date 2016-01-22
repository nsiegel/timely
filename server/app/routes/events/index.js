'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Event = mongoose.model('Event');
module.exports = router;

// GET /api/events
router.get('/', function (req, res, next) {
  Event.find({}).exec()
    .then(function (events) {
      res.status(200).json(events);
    }).then(null, function (err) {
      err.message = "Something went wrong finding all events!";
      next(err);
    });
});

// GET /api/events/:eventId
router.get('/:eventId', function (req, res, next) {
  Event.findById({ _id: req.params.eventId }).exec()
    .then(function (event) {
      res.status(200).json(event);
    }).then(null, function (err) {
      err.message = "Something went wrong finding one event!";
      next(err);
    });
});

// POST/CREATE /api/events
router.post('/', function (req, res, next) {
  var day = req.body.date.split('/');
  var time = req.body.time.split(':');
  var date = new Date(day[2], day[0], day[1], time[0],time[1]);
  req.body.date = date;
  Event.create(req.body)
    .then(function (createdEvent) {
      res.status(201).json(createdEvent);
    }).then(null, function (err) {
      err.message = "Something went wrong creating an event!";
      next(err);
    });
});

// PUT/UPDATE /api/events/:eventId
router.put('/:eventId', function (req, res, next) {
  var id = req.params.eventId;
  Event.findByIdAndUpdate(id, { $set: req.body })
    .then(function (updatedEvent) {
      res.status(200).json(updatedEvent);
    }).then(null, function (err) {
      err.message = "Something went wrong updating this event!";
      next(err);
    });
});

// DELETE /api/events/:eventId
router.delete('/:eventId', function (req, res, next) {
  var id = req.params.eventId;
  Event.find({ _id: id }).remove()
    .then(function () {
      res.status(204).end();
    }).then(null, function (err) {
      err.message = "Something went wrong deleting this event!";
      next(err);
    });
});