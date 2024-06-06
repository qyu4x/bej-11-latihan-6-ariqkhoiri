'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserFollow, {
        foreignKey: 'follower_id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
        as: 'followers'
      })

      User.hasMany(models.UserFollow, {
        foreignKey: 'followed_id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
        as: 'followed'
      })

      User.hasMany(models.Post, {
        foreignKey: 'user_id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
        as: 'posts'
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    full_name: DataTypes.STRING,
    biography: DataTypes.TEXT,
    avatar_url: DataTypes.STRING,
    gender: DataTypes.ENUM('MALE', 'FEMALE'),
    role: DataTypes.ENUM('USER', 'ADMIN'),
    token: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    created_at: DataTypes.BIGINT,
    updated_at: DataTypes.BIGINT,
  },  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    timestamps: false
  });
  return User;
};