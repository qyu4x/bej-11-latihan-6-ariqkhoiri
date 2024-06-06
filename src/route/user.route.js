const userController = require('../controller/user.controller');
const {authorize} = require("../middleware/auth.middleware");

const userRouter = require('express').Router();

userRouter.post('/', userController.register);
userRouter.post('/', authorize(['USER', 'ADMIN']), userController.update);
userRouter.post('/login', userController.login);
userRouter.post('/logout', authorize(['USER', 'ADMIN']), userController.logout);
userRouter.get('/current', authorize(['USER', 'ADMIN']), userController.get);

module.exports = {
    userRouter
}