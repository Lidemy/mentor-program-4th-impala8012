/* eslint-disable */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Articles.belongsTo(models.Categories)
      Articles.belongsTo(models.User)
    }
  };
  Articles.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    is_deleted: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'Articles',
  });
  return Articles;
};