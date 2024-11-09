const jokeModel = require('../models/jokeModel');

exports.getJokesByCategory = (req, res) => {
  const categoryId = parseInt(req.params.category_id, 10); 
  const limit = req.query.limit || 5;  

  jokeModel.getJokesByCategory(categoryId, limit, (err, jokes) => {
    if (err) {
      return res.status(500).send(err.message); 
    }
    
    const category = categoryId === 1 ? 'funnyJoke' : 'lameJoke'; 
    res.render('jokes', { jokes, category });  
  });
};

exports.addNewJoke = (req, res) => {
  const { category, setup, delivery } = req.body;


  if (!category || !setup || !delivery) {
    return res.status(400).json({ error: 'Missing required fields: category, setup, and delivery' });
  }

  jokeModel.addNewJoke(category, setup, delivery, (err) => {
    if (err) {
      if (err.message === 'Category not found') {
        return res.status(404).json({ error: 'Specified category does not exist' });
      }
      return res.status(500).json({ error: 'Error adding joke' });
    }

    
    jokeModel.getJokesByCategory(category, 10, (err, jokes) => {
      if (err) {
        return res.status(500).json({ error: 'Error retrieving updated jokes' });
      }
      res.json(jokes); 
    });
  });
};
