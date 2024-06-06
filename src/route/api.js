const express = require('express');
const route = express.Router();

const {healthRouter} = require('./health.route');

route.use('/api/v1/healths', healthRouter);

module.exports = {
    route
}