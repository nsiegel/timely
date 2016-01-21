'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  transportation: {
    type: String,
    required: true,
    enum: ['train', 'walk', 'bike', 'drive']
  },
  currLocation: {
    lat: {
      type: Number
    },
    long: {
      type: Number
    }
  },
  endLocation: {
    lat: {
      type: Number,
      required: true
    },
    long: {
      type: Number,
      required: true
    }
  },
  title: {
    type: String
  },
  details: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Event', schema);
