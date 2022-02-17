const express = require('express');
const router = express.Router();
const db = require('../config/database');
const TeamMember = require('../models/TeamMember');
const Sequelize = require('sequelize');

router.get('/', (request, response) =>
  TeamMember.findAll()
    .then(teamMembers => {
      console.log(teamMembers)
      response.sendStatus(200);
    })
    .catch(error => console.log(error)));

module.exports = router;
