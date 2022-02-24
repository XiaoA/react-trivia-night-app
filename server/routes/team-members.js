const express = require('express');
const router = express.Router();
const db = require('../config/database');
const TeamMember = require('../models/TeamMember');
const Sequelize = require('sequelize');
const cors = require('cors');

router.get('/', (request, response) =>
  TeamMember.findAll()
    .then(teamMembers => {
      console.log(teamMembers)
      response.sendStatus(200);
    })
    .catch(error => console.log(error)));

module.exports = router;


// Get All Team Members
router.get('/', (request, response) =>
  TeamMember.findAll()
    .then(teamMembers => {
      console.log(teamMembers)
      response.sendStatus(200);
    })
    .catch(error => console.log(error)));

// Display Add Team Form
router.get('/add', (request, response) => response.render('add'));


//Add a Team Member
router.post('/add', (request, response) => {
  let { playerId, teamId, isLeader } = request.body

  let errors = [];
  if (!teamId) {
    errors.push({ text: 'No team found' });
  }

  if (errors.length > 0) {
    response.json(response, {
      errors,
      playerId, teamId, isLeader
    });
  } else {
    Team.create({
      playerId,
      teamId,
      isLeader
    })
      .then(teamMember => response.redirect('/team-members'))
      .catch(error => console.log(error));
  }
})

module.exports = router;
