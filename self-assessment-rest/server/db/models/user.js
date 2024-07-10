'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Todo, Post, Like }) {
      this.hasMany(Todo, { foreignKey: 'user_id' });
      this.belongsToMany(Post, {
        through: Like,
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};


