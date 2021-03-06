'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Book.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 // Or Sequelize.UUIDV1
    },
    owner: DataTypes.STRING,
    title: DataTypes.STRING,
    finished: DataTypes.BOOLEAN,
    pages: DataTypes.INTEGER,
    maxPagesPerPerson: DataTypes.INTEGER,
    allowText: DataTypes.BOOLEAN,
    allowDrawing: DataTypes.BOOLEAN,
    defaultPageType: DataTypes.STRING,
    maxPageLength: DataTypes.INTEGER,
    viewDistance: DataTypes.INTEGER,
    titleAlwaysVisible: DataTypes.BOOLEAN,
    public: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};