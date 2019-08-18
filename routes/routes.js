const express = require('express');
const router = express.Router();

const { userController } = require('../app/controllers/users-controller');

router.use('/user', userController);

module.exports = {
    routes: router
}
