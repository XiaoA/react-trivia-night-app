const Sequelize = require('sequelize');
const db = require('../config/database');

const TeamRanking = db.define('team_ranking', {
  totalQuestions: {
    field: 'cumulative_questions',
    type: Sequelize.INTEGER,
  },
  totalCorrectAnswers: {
    field: 'cumulative_correct_answers',
    type: Sequelize.INTEGER,
  },

  totalIncorrectAnswers: {
    field: 'cumulative_incorrect_answers',
    type: Sequelize.INTEGER,
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

TeamRanking.sync().then(() => {
  console.log('table created');
});

module.exports = TeamRanking;
