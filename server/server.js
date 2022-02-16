const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const { response } = require('express');
const db = require('./config/database');

const PORT = process.env.PORT || 5000;

// Test Postgres connection
db.authenticate()
  .then(() => console.log('Connection has been established'))
  .catch(error => console.log('Error: ' + error))

app.get('/', (request, response) => response.send('INDEX'));

// Routes
app.use('/players', require('./routes/players'));




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
