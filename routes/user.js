const express = require('express');
const models = require('../models');
const axios = require('axios');

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

router.post('/wallet/ask/:id', (req, res) => {
  try {

  } catch(err) {
    console.log(err);
  }
})

router.post('/register', (req, res) => {
  try {
    const userInfo = req.body
    models.User
      .create({
        name : userInfo.name,
        email : userInfo.email,
        password : userInfo.password,
        method: userInfo.method
      })
      .then((result) => {
        res.status(200).send('회원가입 성공 !');
      })
      .catch((err) => {
        console.log(err);
      })
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;