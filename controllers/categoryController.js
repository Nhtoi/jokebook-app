const categoryModel = require('../models/categoryModel');

exports.getAllCategories = (req, res) => {
  categoryModel.getAllCategories((err, categories) => {
      if (err) return res.status(500).send('Error retrieving categories');
      res.render('categories', { categories });
  });
};