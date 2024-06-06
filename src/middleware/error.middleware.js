const {ResponseError} = require("../error/response-error");
const errorMiddleware = (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        return res.status(err.status).json({
            errors: err.message
        }).end();
    } else {
        return res.status(500).json({
            errors: err.message
        }).end();
    }
}

module.exports = {
    errorMiddleware
}