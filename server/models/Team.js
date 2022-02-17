const Sequelize = require('sequelize');
const db = require('../config/database');

const Team = db.define('team', {
  teamName: {
    field: 'team_name',
    type: Sequelize.STRING
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

Team.sync().then(() => {
  console.log('table created');
});

module.exports = Team;
