'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate({User, Like}) {
      this.belongsToMany(User, {
        through: Like,
        foreignKey: 'post_id',
      });
    }
  }
  Post.init({
    post: DataTypes.STRING,
    title: DataTypes.STRING,
    img: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};