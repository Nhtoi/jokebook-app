const db = require('../database/db');

function getJokesByCategory(categoryId, limit, callback) {
  const limitInt = parseInt(limit, 10);  
  
  if (isNaN(limitInt) || limitInt <= 0) {
    return callback(new Error('Invalid limit parameter'));
  }

  const sql = `
    SELECT Jokes.setup, Jokes.delivery
    FROM Jokes
    JOIN Categories ON Jokes.category_id = Categories.category_id
    WHERE Jokes.category_id = ?
    LIMIT ?
  `;

  db.all(sql, [categoryId, limitInt], (err, rows) => {
    if (err) {
      return callback(err); 
    }
    if (!rows || rows.length === 0) {
      return callback(new Error('No jokes found for this category'));
    }
    callback(null, rows); 
  });
}


function getRandomJoke(callback) {
  const sql = `
    SELECT setup, delivery FROM Jokes
    ORDER BY RANDOM()
    LIMIT 1
  `;
  db.get(sql, [], callback);
}

function getCategoryID(category, callback) {
  const sql = 'SELECT category_id FROM Categories WHERE name = ?';
  db.get(sql, [category], (err, row) => {
    if (err) return callback(err);
    if (!row) return callback(new Error('Category not found'));
    callback(null, row.category_id);
  });
}


exports.addNewJoke = (category, setup, delivery, callback) => {
  getCategoryID(category, (err, categoryId) => {
    if (err) return callback(err);

    const sql = `INSERT INTO Jokes (setup, delivery, category_id) VALUES (?, ?, ?)`;
    db.run(sql, [setup, delivery, categoryId], (err) => {
      if (err) return callback(err);
      callback(null); 
    });
  });
};



module.exports = { getJokesByCategory, getRandomJoke };
