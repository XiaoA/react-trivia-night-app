'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Game}) {
      // define association here
      this.hasOne(Game, {foreignKey: 'playerId', as: 'game' })
    }

    toJSON(){
      return { ...this.get(), id: undefined }
    }
  }
  Player.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userUuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true        
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
    }, {
    sequelize,
      tableName: 'players',
      modelName: 'Player',
  });
  return Player;
};
