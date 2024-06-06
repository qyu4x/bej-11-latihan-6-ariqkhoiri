const healthRepository = require('../repository/health.repository');
const {ResponseError} = require("../error/response-error");
const {formatCurrency} = require("../helper/i18n-currency.helper");
const get = () => {
    return healthRepository.get();
}

module.exports = {
    get
}
