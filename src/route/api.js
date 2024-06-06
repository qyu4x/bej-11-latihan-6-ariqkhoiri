const express = require('express');
const route = express.Router();

const {healthRouter} = require('./health.route');
const {userRouter} = require('./user.route');

route.use('/api/v1/healths', healthRouter);
route.use('/api/v1/users', userRouter)

module.exports = {
    route
}