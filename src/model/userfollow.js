'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFollow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserFollow.belongsTo(models.User, {
        foreignKey: 'follower_id',
        as: 'follower'
      })

      UserFollow.belongsTo(models.User, {
        foreignKey: 'followed_id',
        as: 'followed'
      })
    }
  }
  UserFollow.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    follower_id: DataTypes.STRING,
    followed_id: DataTypes.STRING
  },  {
    sequelize,
    modelName: 'UserFollow',
    tableName: 'user_follows',
    underscored: true,
    timestamps: false
  });
  return UserFollow;
};
