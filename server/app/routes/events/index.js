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
  var date = req.body.date.split('T')[0].split('-');
  var month = Number(date[1]) - 1;
  var day = Number(date[2]);
  var year = Number(date[0]);

  var time = req.body.time.split(':');
  var hour = time[0];
  var minutes = time[1];

  var eventDate = new Date(year, month, day, hour, minutes);

  req.body.date = eventDate;

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