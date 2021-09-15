const express = require('express');
const app = express();
const port = process.env.PORT || 3004;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors());

const connectToDatabase = require('./db/connection');
connectToDatabase();

const userRoute = require("./routes/Users");
const reviewRoute = require("./routes/Todo");
const healthRoute = require("./routes/Health");


app.use("/user", userRoute);
app.use("/todo", reviewRoute);
app.use("/health", healthRoute);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Invalid Auth Token, please login again" });
  }
});
module.exports = app.listen(port, () => console.log(`Listening on port ${port}...`));

