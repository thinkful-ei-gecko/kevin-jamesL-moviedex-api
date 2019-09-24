require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const moviesData = require('./movies-data-small.json');

const app = express();

app.use(morgan('dev'));
app.use(cors());

// app.use(function validateBearerToken(req, res, next) {
//   const apiToken = process.env.API_TOKEN;
//   const authToken = req.get('Authorization');

//   if (!authToken || authToken.split(' ')[1] !== apiToken) {
//     return res.status(401).json({ error: 'Unauthorized request' });
//   }
//   // move to the next middleware
//   next();
// });

app.get('/movie', (req, res) => {
  const { genre, country, avg_vote } = req.query;
  let response = moviesData;

  if (genre) {
    response = response.filter(r =>
      r.genre.includes(genre.toLowerCase())
    );
  }

  res.json(response);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
