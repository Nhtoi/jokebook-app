const db = require('../database/db');

exports.getAllCategories = (callback) => {
    const query = 'SELECT * FROM Categories';
    db.all(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};
