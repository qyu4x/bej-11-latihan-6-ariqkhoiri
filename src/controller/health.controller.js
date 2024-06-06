const healthService = require('../service/health.service');
const get = (req, res, next) => {
    try {
        const healthResponse = healthService.get();
        return res.status(200).json({
            data: healthResponse
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get
}