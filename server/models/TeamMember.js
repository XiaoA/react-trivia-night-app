const Sequelize = require('sequelize');
const db = require('../config/database');

const TeamMember = db.define('team_member', {
  playerId: {
    field: 'player_id',
    type: Sequelize.INTEGER,
    foreignKey: true
  },
  teamId: {
    field: 'team_id',
    type: Sequelize.INTEGER,
    foreignKey: true
  },
  isLeader: {
    field: 'is_leader',
    type: Sequelize.BOOLEAN
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

TeamMember.sync().then(() => {
  console.log('table created');
});

module.exports = TeamMember;
