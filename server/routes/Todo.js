const express = require('express')
const app = express.Router()
const jwtValidate = require('express-jwt')
const CONFIG = require('../config')
const { validationResult } = require('express-validator')
const TOKEN_SECRET = CONFIG.JWT_TOKEN_SECRET
const isAuth = jwtValidate({ secret: TOKEN_SECRET, algorithms: [CONFIG.JWT_TOKEN_ALGORITHM] })
app.post('/data', [isAuth], async (req, res) => {
  let reviewData = new reviewModel(req.body);
  let savedReview = await reviewData.save();
  if (savedReview === reviewData) {
    res.json({message: "Review added successfully"});
  } else {
    res.status(400).json({"message": "Unable to add review of a product, Please try again"});
  }
});

app.get('/all', async (req, res) => {
  res.json(await reviewData.find());
})
module.exports = app