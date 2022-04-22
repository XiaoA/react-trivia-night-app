'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Player }) {
      // define association here
      this.belongsTo(Player, { foreignKey: 'playerId', as: 'player', unique: true })
    }

    toJSON() {
      return { ...this.get(), id: undefined, playerId: undefined }
    }
  }
  Game.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      playerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      total_questions: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        }
      },
      total_correct_answers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        }
      },
      total_incorrect_answers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        }
      },
    }, {
    sequelize,
    tableName: 'games',
    modelName: 'Game',
    // indexes: [{ unique: true, fields: ['playerId']}]
  }
  )
  return Game;
};
