const express = require('express');
const router = express.Router();
const db = require('../db/queries/products');

router.get('/', async (req, res) => {
  try {
    const products = await db.getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
