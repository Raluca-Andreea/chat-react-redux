const express = require('express');
const privateChatRoutes = express.Router();
const User = require('../models/User');

privateChatRoutes.get('/allUsers', (req, res, next) => {
  User.find({connected: true})
  .then(users => {
    console.log("SE HAN ENVIADO LOS USER CONECTADOS, INCLUSO EL ULTIMO")
    res.status(200).json(users)
  })
  .catch(err => res.status(401).json(err))
});

module.exports = privateChatRoutes;
