'use strict';
var mongoose = require('mongoose');
var rp = require('request-promise');

var schema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    startLocation: {
        lat: {
          type: Number
        },
        lng: {
          type: Number
        }
    },
    endLocation: {
        place: {
          type: String
        },
        lat: {
            type: Number
            // required: true
        },
        lng: {
            type: Number
            // required: true
        }
    },
    transportation: {
        type: String,
        // required: true,
        enum: ['train', 'walk', 'bike', 'drive']
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
