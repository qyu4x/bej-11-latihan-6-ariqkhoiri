const express = require('express');
const healthRouter = express.Router();
const healthController = require('../controller/health.controller');

healthRouter.get('/', healthController.get);

module.exports = {
    healthRouter
}