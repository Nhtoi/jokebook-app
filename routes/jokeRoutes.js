const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');


router.get('/joke/:category_id', jokeController.getJokesByCategory);
router.post('/joke/new', jokeController.addNewJoke);


module.exports = router;
