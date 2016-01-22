'use strict';
var router = require('express').Router();
var Event = mongoose.model('Event');
module.exports = router;

router.get('/', function(req, res, next) {
  Event.find({}).exec()
    .then(function(events) {
      res.status(200).json(events);
    }).then(null, function(err) {
      err.message = "Something went wrong finding all events!";
      next(err);
    });
});

router.post('/', function(req, res, next) {
  Event.create(req.body)
    .then(function(createdEvent) {
      res.status(201).json(createdEvent);
    }).then(null, function(err) {
      err.message = "Something went wrong creating an event!";
      next(err);
    });
});

router.put('/:eventId', function(req, res, next) {
  var id = req.params.eventId;
  Event.findByIdAndUpdate(id, { $set: req.body })
    .then(function(updatedEvent) {
      res.status(200).json(updatedEvent);
    }).then(null, function(err) {
      err.message = "Something went wrong updating this event!";
      next(err);
    });
});
