const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventName: {
        type: String,
    },
    venue: {
        type: String,
    },
    eventCreater: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    requirements: [{
        productName: {
            type: String,
            required: true
        },
        department: {
            type: ['electronics','infrastructure','food']
        },
        quantity: {
            type: Number,
            required: true
        },
        price: { // will be updated by department employees
            type: Number,
        }
    }],
    status: {
        type: String,
        enum: ['yet_to_review','in_progress','success'],
        required: true
    },
    dateOfEvent: {
        type: Date,
        required: true,
    },
    invoiceTotal: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }	
});

const Event = mongoose.model('Event', eventSchema)

module.exports.Event = Event
