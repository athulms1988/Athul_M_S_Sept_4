const express = require('express')
const app = express.Router()
const jwtValidate = require('express-jwt')
const CONFIG = require('../config')
const { body, validationResult } = require('express-validator')
const TOKEN_SECRET = CONFIG.JWT_TOKEN_SECRET
const isAuth = jwtValidate({ secret: TOKEN_SECRET, algorithms: [CONFIG.JWT_TOKEN_ALGORITHM] })
const todoModel = require('../model/todo');

app.post('/', isAuth, [
  body().isArray(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
  }
  const filter = { id: req.user.id };
  const update = { todoList: req.body };
  let doc = await todoModel.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true
  });
  res.json({message: "Todo updated successfully"});
});

app.get('/', isAuth, async (req, res) => {
  let todoList = await todoModel.find({ id: req.user.id });

  if (todoList && todoList.length > 0) {
    let filteredList = todoList[0].todoList.map((list) => {
      return {
        title: list.title,
        task: list.task.map((todo) => {
          return {
            description: todo.description,
            status: todo.status
          }
        })
      };
    })
    res.send(filteredList);
  } else {
    res.send([]);
  }
})
module.exports = app