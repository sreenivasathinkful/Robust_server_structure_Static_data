const express = require("express");
const app = express();

const users = require("./data/users-data");
const states = require("./data/states-data");

// TODO: return an array of users from /users in form of { data: Array }
app.get('/users', (req, res) => {
  res.json({ data: users });
});

// TODO: return a single user by id from /users/:userId in form of { data: Object }
app.get('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json({ data: user });
  } else {
    res.status(404).send(`User ID not found: ${userId}`);
  }
});

// TODO: return all states from /states in the form of { data: Array }
app.get('/states', (req, res) => {
  res.json({ data: states });
});

// TODO: Return a single state from /states/:stateCode in the form of { data: { stateCode: String, name: String } }
app.get('/states/:stateCode', (req, res) => {
  const stateCode = req.params.stateCode;
  const stateName = states[stateCode];

  if (stateName) {
    res.json({ data: { stateCode, name: stateName } });
  } else {
    res.status(404).send(`State code not found: ${stateCode}`);
  }
});

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// TODO: Add error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});

module.exports = app;
