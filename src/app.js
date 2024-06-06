const express = require('express');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const {errorMiddleware} = require("./middleware/error.middleware");
const {routeNotFoundMiddleware} = require("./middleware/route-not-found.middleware");
const {route} = require('./route/api');

const port = process.env.APP_PORT || 3000;
const appName = process.env.APP_NAME || 'pinstagram';

const app = express();
app.use(express.json());

app.use(route)

app.use(errorMiddleware);
app.use(routeNotFoundMiddleware);
app.listen(port, () => {
    console.log(`${appName} running on port ${port}`);
})