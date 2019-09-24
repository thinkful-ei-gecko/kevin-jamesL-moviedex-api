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

  if ('genre' in req.query) {
    if (genre) {
      response = response.filter((r) =>
        r.genre.toLowerCase().includes(genre.toLowerCase())
      );
    } else {
      return res.status(400).json({ error: 'Genre cannot be blank' });
    }
  }

  if (country) {
    response = response.filter((r) =>
      r.country.toLowerCase().includes(country.toLowerCase())
    );
  }

  if (avg_vote) {
    response = response.filter((r) => r.avg_vote >= avg_vote);
  }

  res.json(response);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
