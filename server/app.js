const express = require('express');
const { sequelize, Player, Game } = require('./models');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors')

const corsOptions = {
  origin: process.env.PROD_REACT_APP_URL || "http://localhost:3000"
}

app.use(cors(corsOptions))
app.use(express.json())

// Create New Player 
app.post('/players', async (request, response) => {
  const { username, userUuid } = request.body

  try {
    const player = await Player.create({ username, userUuid })

    return response.json(player)
  } catch (error) {
    console.log(error)
    return response.status(500).json(error)
  }
})

// List All Players
app.get('/players', async (request, response) => {

  try {
    const players = await Player.findAll()

    return response.json(players)
  } catch (error) {
    console.log(error)
    return response.status(500).json(error)
  }
})

// Find a Player by userUuid
app.get('/players/:userUuid', async (request, response) => {
  const userUuid = request.params.userUuid;

  try {
    const player = await Player.findOne({
      where: { userUuid: userUuid },
      include: 'game'
    })

    return response.json(player)
  } catch (error) {
    console.log(error)
    return response.status(500).json(error)
  }
})

//Find Player's Game Stats by userUUid
app.get('/games/:userUuid', async (request, response) => {
  const userUuid = request.params.userUuid;

  try {
    const game = await Game.findOne({
      where: { userUuid: userUuid },
      include: 'player'
    })

    return response.json(game)
  } catch (error) {
    console.log(error)

    return response.status(500).json(error)
  }
})

// Create a New Game Stat Record
app.post('/games', async (request, response) => {
  const { totalQuestions, totalCorrectAnswers, totalIncorrectAnswers, userUuid } = request.body

  try {
    const player = await Player.findOne({ where: { userUuid: userUuid } })
    const game = await Game.create({
      playerId: player.id,
      total_questions: totalQuestions,
      total_correct_answers: totalCorrectAnswers,
      total_incorrect_answers: totalIncorrectAnswers,
    })
    return response.json(game)
  } catch (error) {
    console.log(error)

    return response.status(500).json(error)
  }
})

// Show All Game Stats
app.get('/games', async (request, response) => {

  try {
    const games = await Game.findAll({ include: 'player' })

    return response.json(games)
  } catch (error) {
    console.log(error)

    return response.status(500).json(error)
  }
})

//Update a Player's Game Stats
app.put('/games/:uuid', async (request, response) => {
  const uuid = request.params.uuid;
  const { totalQuestions, totalCorrectAnswers, totalIncorrectAnswers } = request.body

  try {
    const game = await Game.findOne({ where: { uuid } })

    game.total_questions = game.total_questions + totalQuestions,
    game.total_correct_answers = game.total_correct_answers + totalCorrectAnswers,
    game.total_incorrect_answers = game.total_incorrect_answers + totalIncorrectAnswers
    
    await game.save()

    return response.json(game)
  } catch (error) {
    console.log(error)

    return response.status(500).json(error)
  }
})

app.listen({ port: `${PORT}` }, async () => {
  console.log(`Server running on Port ${PORT}`)
  await sequelize.authenticate()
  console.log('Database connected!')
})
