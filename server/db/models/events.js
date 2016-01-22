'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    startLocation: {
        latitude: {
          type: Number
        },
        longitude: {
          type: Number
        }
    },
    endLocation: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    transportation: {
        type: String,
        required: true,
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
