const {User} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const role = require('../helper/role.helper');
const gender = require('../helper/gender.helper');
const {ResponseError} = require('../error/response-error')
const userRepository = require('../repository/user.repository');
const {validate} = require('../validation/validate');
const {
    createUserSchema,
    loginUserSchema,
    updateUserSchema
} = require('../validation/user.validation');


const existByUsername = async (username) => {
    const user = await userRepository.findOneByUsername(username);
    if (user) {
        throw new ResponseError(409, "Username already registered")
    }
}

const existByEmail = async (email) => {
    const user = await userRepository.findOneByEmail(email);
    if (user) {
        throw new ResponseError(409, "Email already registered")
    }
}

const register = async (request) => {
    const user = validate(createUserSchema, request);

    await existByUsername(user.username);
    await existByEmail(user.email)

    user.password = await bcrypt.hash(user.password, 10);

    user.id = uuidv4();
    user.role = role.user;
    user.is_active = true;
    user.created_at = Date.now();

    await userRepository.create(user);
    return await userRepository.findOneById(user.id);
}

const login = async (request) => {
    const loginRequest = validate(loginUserSchema, request);

    const user = await userRepository.findOneByEmail(loginRequest.email);

    if (!user) {
        throw new ResponseError(401, "Email or password is incorrect");
    }

    const isPasswordValid = bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Email or password is incorrect");
    }

    const token = uuidv4().toString();

    user.token = token;
    user.updated_at = Date.now();
    user.save();

    return token;
}

const get = async (userId) => {
    const user = await userRepository.findOneById(userId);
    if (!user) {
        throw new ResponseError(404, "User not found");
    }

    return user;
}

const update = async (userId, request) => {
    const updateUserRequest = validate(updateUserSchema, request);
    const user = await userRepository.findOneById(userId);
    if (!user) {
        throw new ResponseError(404, "User not found");
    }

    user.username = updateUserRequest.username;
    user.avatar_url = updateUserRequest.avatar_url
    user.biography = updateUserRequest.biography;
    user.full_name = updateUserRequest.full_name;
    user.gender = updateUserRequest.gender;
    user.updated_at = Date.now();
    user.save();
}

const logout = async (userId) => {
    const user = await userRepository.findOneById(userId);
    if (!user) {
        throw new ResponseError(404, "User not found");
    }

    user.token = null;
    user.updated_at = Date.now();
    user.save();
}

module.exports = {
    register,
    login,
    get,
    logout,
    update
}