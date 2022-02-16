const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Player = require('../models/Player');
const Sequelize = require('sequelize');

router.get('/', (request, response) =>
  Player.findAll()
    .then(players => {
      console.log(players)
      response.sendStatus(200);
    })
    .catch(error => console.log(error)));

module.exports = router;
