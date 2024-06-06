const {User} = require("../model");
const {Op} = require("sequelize");

const findOneByUsername = async (username) => {
    return await User.findOne({
        where: {username: username, is_active: true},
        attributes: ['id']
    });
}

const findOneByEmail = async (email) => {
    return await User.findOne({
        where: {email: email, is_active: true},
        attributes: ['id', 'email', 'password']
    });
}

const findOneByToken = async (token) => {
    return await User.findOne({
        where: {
            token: {
                [Op.eq]: token
            }
        },
        attributes: ['id', 'username', 'email','role', 'full_name', 'created_at']
    })
}

const create = async (user) => {
    return await User.create(user);
}


const findOneById = async (userId) => {
    return await User.findOne({
        where: {id: userId},
        attributes: ['id', 'email', 'full_name', 'biography', 'gender', 'role', 'created_at', 'updated_at']
    })
}

module.exports = {
    findOneByUsername,
    findOneByEmail,
    findOneById,
    findOneByToken,
    create
}