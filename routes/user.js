const express = require('express');
const models = require('../models');


const router = express.Router();

router.get('/data/:id', (req, res) => {
  try {
    // console.log(req.params.id);
    models.User.findOne({
      where: {
        email: req.params.id
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

// 매수 후 유저 잔고 최신화
router.patch('/ask/:id', (req, res) => {
  try {
    models.User.update({
        balance : req.body.balance,
      },{
      where: {
        email : req.params.id
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

// 매도 후 유저 잔고 최신화
router.patch('/bid/:id', (req, res) => {
  try {
    models.User.update({
      balance: req.body.cash
    },{
      where: {
        email : req.params.id
      }
    })
    .then((result) => {
      res.sendStatus(200);
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

// 지갑에 코인 더 매수하기
router.patch('/wallet/moreask/:code', async (req, res) => {
  try {
    console.log(req.body);
    await models.Wallet.update({
      totalprice : req.body.totalPrice,
      volume : req.body.volume
    }, {
      where : {
        code : req.params.code,
        fullcode : req.body.fullcode
      }
    })
  } catch(err) {
    console.log(err);
  }
})

// 지갑에 코인 매도하기
router.patch('/wallet/bid/:code', async (req, res) => {
  try {
    await models.Wallet.update({
        totalprice : req.body.totalPrice,
        volume : req.body.volume
      },
      {where : {
        code : req.params.code,
        fullcode : req.body.fullcode
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

// 코인 풀 매도
router.delete('/wallet/delete/:code', async (req, res) => {
  try {
    await models.Wallet.destroy({
      where : {
        fullcode : req.body.fullcode
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