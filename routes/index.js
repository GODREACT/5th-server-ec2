const express = require('express');
const models = require('../models');
const { Op } = require('sequelize');
const router = express.Router();


// router.get('/', async (req, res, next) => {
//   try {
//     res.render('index');
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

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
// router.get('/search/:keyword', async (req, res) => {
//   try {
//     const params = req.params;
//     console.log(params);
//     console.log('---------------------')
//     console.log(params.keyword);
//     const htmlitems = await models.Html.findAll({
//       where:{
//         title:{
//           [Op.like]: `%${params.keyword}%` 
//           // 검색한 단어가 들어가 있는
//         }
//       },
//      });
//      res.json({ 'htmlitems': htmlitems,}); 

//   } catch (error) {
//     console.error('Error fetching items:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
//여러개 검색
// router.get('/search/:keyword', async (req, res) => {
//   try {
//     const params = req.params;
//     // console.log(params);
//     const keyword = params.keyword;
//     // console.log(keyword);

//     // html 모델에서 검색
//     const htmlItems = await models.Html.findAll({
//       where: {
//         title: {
//           [Op.like]: `%${keyword}%` // 검색한 단어가 들어가 있는 name 필드를 검색
//         }
//       }
//     });

//     console.log(htmlItems);
//     // res.json({ 'htmlItems': htmlItems,  }); 
//   } catch (error) {
//     console.error('Error fetching items:', error);
//     res.status(500).json({ error: '검색서버에 문제 생김' });
//   }
// });

// router.post('/success', async (req, res) => {
//   try {
//     const code = req.body.code;
//     const client_id = '1087352918812-0sng7c0ne7imi2npab9fev8vj2ivvg16.apps.googleusercontent.com';
//     const client_secret = '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'
//     const redirect_uri = 'http://localhost:3000/success'
//     const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}$grant_type=authorization_code`
//     console.log(code);

//     const access_token = await axios
//       .post(url, {
//         headers: { "content-type": "application/x-www-form-urlencoded" },
//       })
//       .then((result) => {
//         return result.data.access_token
//       })
//       .catch((err) => {
//         console.log(err);
//       })
    
//     console.log(access_token);
//   } catch(err) {
//     console.log(err);
//   }
// })

module.exports = router;