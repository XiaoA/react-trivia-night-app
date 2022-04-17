'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('games', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      total_questions: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total_correct_answers: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total_incorrect_answers: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      playerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
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
    await queryInterface.dropTable('games');
  }
};
