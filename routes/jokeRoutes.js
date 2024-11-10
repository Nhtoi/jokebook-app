const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');

router.get('/joke', jokeController.getJokesByCategory);
router.get('/joke/add/new', (req, res) => {
  res.render('add-joke');
});
router.post('/joke/add/newJoke', jokeController.addNewJoke); 

module.exports = router;

