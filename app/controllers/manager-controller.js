const express = require('express');
const _ = require('lodash');
const router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('../../auth/verify-token');
const { User } = require('../models/user');
const { Event } = require('../models/event');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * Configure JWT
 */

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');

router.get('/updateEvent/:id', VerifyToken, function (req, res, next) {
    User.findById(req.userId, { password: 0 }, function (err, user) {
        if(req.role === 'employee') return res.send("not authorised");
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        let id = req.params.id;
        Event.findByIdAndUpdate(id, { $set: body}, { new: true})
       .then((event) => {
        if(event) {
            res.send({
                event,
                notice: 'Successfully updated the status'
            });
        } else {
            res.send({
                notice: 'event not found'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})
        res.status(200).send({auth : true, user : user});
    });


    module.exports = {
        managerController: router
    }