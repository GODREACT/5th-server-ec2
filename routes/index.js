const express = require('express');
const models = require('../models');
const { Op } = require('sequelize');
const router = express.Router();

router.use('/images', express.static( 'images')); //이미지 접근 권한

// 로그인 , 회원가입
router.post('/login', async (req, res) => {
  try {
    const user = req.body;
    await models.User.findOne({
      where: {
        email: user.email
      }
    })
    .then(result => {
      if(user.password == result.dataValues.password){
        res.send('1');
      } else {
        res.send('2');
      }
    })
  } catch(err) {
    console.log(err);
  }
})

router.post('/signup', async(req, res) => {
  try {
    const user = req.body;
    await models.User.create({
      id: user.id,
      name: user.name,
      password: user.password,
      email: user.email,
      phone: user.phone
    })
    .then(result => {
      res.send('success');
    })
    .catch(err => {
      console.log(err);
      res.send('fail');
    })
  } catch(err) {
    console.log(err);
  }
})
// 하나 검색
router.get('/search/:keyword', async (req, res) => {
  try {
    const params = req.params;
    console.log(params);
    console.log('---------------------')
    console.log(params.keyword);
    const htmlitems = await models.Html.findAll({
      where: {
        title: {
          [Op.like]: `%${params.keyword}%`
        }
      },
    });

    res.json({ 'htmlItems': htmlitems }); // 'htmlitems' 대신 'htmlItems'로 수정

  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;