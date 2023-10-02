const mongoose = require('mongoose')

const LocationLog  = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title'],
    },
    description: {
        type: String,
        maxLength: [100, "max length is 200 characters"],
    },
    dateVisited: {
        type: Date,
    },
    longitude:{
        type:Number,
        min: -180,
        max: 180,
        required: [true, 'Please enter longitude'],
    },
    latitude: {
        type: Number,
        min: -90,
        max: 90,
        required: [true, 'Please enter latitude'],

    }
})

module.exports = mongoose.model('LocationLog', LocationLog)