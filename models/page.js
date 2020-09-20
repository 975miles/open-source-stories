'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Page.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 // Or Sequelize.UUIDV1
    },
    author: DataTypes.STRING,
    book: DataTypes.STRING,
    type: DataTypes.STRING,
    content: DataTypes.STRING,
    pageNum: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Page',
  });
  return Page;
};