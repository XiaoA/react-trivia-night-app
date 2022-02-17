require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const { response } = require('express');
const db = require('./config/database');
const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000"
}

const PORT = process.env.PORT || 5000;
app.use(cors(corsOptions))

// Test Postgres connection
db.authenticate()
  .then(() => console.log('Connection has been established'))
  .catch(error => console.log('Error: ' + error))

//app.options('*', cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, response) => response.send('INDEX'));

// app.post('/players', async(req, res) => {
//   const { username } = req.body

//   try {
    
//   }
// })

// app.all('/', function(request, response, next) {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

// Routes
app.use('/players', require('./routes/players'));
app.use('/teams', require('./routes/teams'));
app.use('/team-members', require('./routes/team-members'));
app.use('/team-rankings', require('./routes/team-rankings'));




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
