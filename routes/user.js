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
        // console.log(result);
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

// 지갑 코드 가져오기
router.get('/wallet/:id', async (req, res) => {
  try {
    // console.log(req);
    await models.User.findOne({
        where: {
          id : req.params.id
        }
      })
      .then((result) => {
        res.send(result.wallet_code);
      })
      .catch((err) => {
        console.log(err);
      })
  } catch(err) {
    console.log(err);
  }
})

// 지갑 안에 어떤 코인이 있는지
router.get('/wallet/get/:code', async (req, res) => {
  try {
    console.log(req.params.code);
    await models.Wallet.findAll({
        where: {
          code: req.params.code
        }
      })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      })
  } catch(err) {
    console.log(err);
  }
})

// 지갑에 코인 추가하기
router.post('/wallet/ask/:code', async (req, res) => {
  try {
    console.log(req.params.code);
    console.log(req.body);
    await models.Wallet.create({
      code : req.params.code,
      coin_name : req.body.code,
      fullcode : req.body.fullcode,
      volume: req.body.volume,
      totalprice: req.body.totalPrice
    })
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;