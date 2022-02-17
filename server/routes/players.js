const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Player = require('../models/Player');
const Sequelize = require('sequelize');
const cors = require('cors');

// Get All Players
router.get('/', (request, response) =>
  Player.findAll()
    .then(players => {
      console.log(players)
      response.sendStatus(200);
    })
    .catch(error => console.log(error)));

// Display Add Player Form
router.get('/add', (request, response) => response.render('add'));


//Add a Player
router.post('/add', (request, response) => {
  let { username, userId, email } = request.body

  let errors = [];
  if (!username) {
    errors.push({ text: 'Please pick a username' });
  }

  if (errors.length > 0) {
    response.json(response, {
      errors,
      username,
      userId,
      email
    });
  } else {
    Player.create({
      username,
      userId,
      email
    })
      .then(player => response.redirect('/players'))
      .catch(error => console.log(error));
  }
})

module.exports = router;
