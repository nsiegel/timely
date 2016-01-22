'use strict';
var router = require('express').Router();
var Event = mongoose.model('Event');
module.exports = router;

router.get('/', function(req, res, next) {
  Event.find({}).exec()
    .then(function(events) {
      res.status(200).json(events);
    });
});

