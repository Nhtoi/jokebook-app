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
    return res.status(400).json({ error: "Missing required fields: category, setup, and delivery" });
  }

  // Add the new joke to the database
  jokeModel.addNewJoke(category, setup, delivery, (err) => {
    if (err) return res.status(500).send('Error adding new joke');

    // Retrieve the updated list of jokes for the category
    jokeModel.getCategoryID(category, (err, categoryId) => {
      if (err) return res.status(500).send('Error retrieving category ID');

      jokeModel.getJokesByCategory(categoryId, 10, (err, jokes) => {
        if (err) return res.status(500).send('Error retrieving updated jokes');
        
        // Render the updated jokes in the EJS template
        res.render('jokes', { jokes, category });
      });
    });
  });
};