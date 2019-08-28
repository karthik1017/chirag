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

module.exports = {
    eventController: router
}