'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      id: {
        type: Sequelize.STRING
      },
      owner: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      finished: {
        type: Sequelize.BOOLEAN
      },
      pages: {
        type: Sequelize.INTEGER
      },
      maxPagesPerPerson: {
        type: Sequelize.INTEGER
      },
      allowText: {
        type: Sequelize.BOOLEAN
      },
      allowDrawing: {
        type: Sequelize.BOOLEAN
      },
      defaultPageType: {
        type: Sequelize.STRING
      },
      maxPageLength: {
        type: Sequelize.INTEGER
      },
      viewDistance: {
        type: Sequelize.INTEGER
      },
      titleAlwaysVisible: {
        type: Sequelize.BOOLEAN
      },
      public: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Books');
  }
};