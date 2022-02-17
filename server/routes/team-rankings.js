const express = require('express');
const router = express.Router();
const db = require('../config/database');
const TeamRanking = require('../models/TeamRanking');
const Sequelize = require('sequelize');

router.get('/', (request, response) =>
  TeamRanking.findAll()
    .then(teamRankings => {
      console.log(teamRankings)
      response.sendStatus(200);
    })
    .catch(error => console.log(error)));

module.exports = router;
