'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      userUuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('players');
  }
};
