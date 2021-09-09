const express = require('express')
const app = express.Router()
module.exports = app
app.get('/', function (req, res) {
    res.json({ "message": "ok", status: 200 })
});
