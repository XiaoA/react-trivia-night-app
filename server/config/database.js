const { Sequelize } = require('sequelize');

module.exports = new Sequelize('react_trivia_app', 'abuckingham', 'nihongo', {
  host: 'localhost',
  dialect: 'postgres'
});
