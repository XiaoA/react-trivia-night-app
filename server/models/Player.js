const Sequelize = require('sequelize');
const db = require('../config/database');

const Player = db.define('player', {
  username: {
    type: Sequelize.STRING
  },
  userId: {
    field: 'user_id',    
    type: Sequelize.INTEGER
  },
  email: {
    type: Sequelize.STRING //limit?
  },
  createdAt: {
    field: 'created_at',
    type: Sequelize.DATE
  },
  updatedAt: {
    field: 'updated_at',
    type: Sequelize.DATE
  }
  
});

Player.sync().then(() => {
  console.log('table created');
});

module.exports = Player;
