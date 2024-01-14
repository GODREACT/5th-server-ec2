const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/data/:id', (req, res) => {
  try {
    // console.log(req.params.id);
    models.User.findOne({
      where: {
        id: req.params.id
      }
      })
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      })
  } catch (err) {
    console.log(err);
  }
})

router.patch('/ask/:id', (req, res) => {
  try {
    models.User.update({
      balance : req.body.balance,
      coin : req.body.coin
    },{
      where: {
        id : req.params.id
      }
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;