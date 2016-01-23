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

schema.pre('save', function(next) {
    var event = this;
    var query = event.endLocation.place.replace(' ', '+');
    console.log('THIS IS QUERY: ', query);
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + query + '.json?' +
        'access_token=pk.eyJ1IjoibnNpZWdlbDIiLCJhIjoiY2lqcHY1OTBuMDFkMXRvbTV3eTZ6MXdycSJ9.AO_LTuXwMnDabyGfYydArw';
    rp(url)
        .then(function(res) {
            var info = JSON.parse(res);
            event.endLocation.lat = info.features[0].geometry.coordinates[0];
            event.endLocation.lng = info.features[0].geometry.coordinates[1];
            console.log(event);
            next();
        }).then(null, console.err);

});

mongoose.model('Event', schema);
