const express = require('express');
const router = express.Router();

const { userController } = require('../app/controllers/users-controller');
const { employeeController } = require('../app/controllers/employee-controller');
const { eventController } = require('../app/controllers/event-controller');
const { managerController } = require('../app/controllers/manager-controller');

router.use('/user', userController);
router.use('/user/manager',managerController);
router.use('/employee',employeeController);
router.use('/event',eventController);

module.exports = {
    routes : router
}
