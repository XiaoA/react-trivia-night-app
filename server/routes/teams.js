const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Team = require('../models/Team');
const Sequelize = require('sequelize');
const cors = require('cors');

// Get All Teams
router.get('/', (request, response) =>
  Team.findAll()
    .then(teams => {
      console.log(teams)
      response.sendStatus(200);
    })
    .catch(error => console.log(error)));

// Display Add Team Form
router.get('/add', (request, response) => response.render('add'));


//Add a Team
router.post('/add', (request, response) => {
  let { teamName } = request.body

  let errors = [];
  if (!teamName) {
    errors.push({ text: 'Please pick a team name' });
  }

  if (errors.length > 0) {
    response.json(response, {
      errors,
      teamName
    });
  } else {
    Team.create({
      teamName,
    })
      .then(team => response.redirect('/teams'))
      .catch(error => console.log(error));
  }
})

module.exports = router;
