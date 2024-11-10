const express = require('express');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/categoryRoutes');
const jokeRoutes = require('./routes/jokeRoutes');
const jokeModel = require('./models/jokeModel');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/jokebook', categoryRoutes);
app.use('/jokebook', jokeRoutes);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    jokeModel.getRandomJoke((err, randomJoke) => {
      if (err) return res.status(500).send('Error retrieving random joke');
      res.render('index', { randomJoke });
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
