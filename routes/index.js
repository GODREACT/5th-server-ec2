const express = require('express');
const models = require('../models');
const { Op } = require('sequelize');
const router = express.Router();
require('dotenv').config();

var client_id = process.env.NAVER_CLIENT_ID;
var client_secret = process.env.NAVER_CLIENT_SECRET;
var state = process.env.NAVER_STATE;
var loginRedirectURI = encodeURI(process.env.NAVER_CALLBACK_URL);
var callbackRedirectURI = encodeURI(process.env.NAVER_CALLBACK_URL);
var api_url = "";

router.use('/images', express.static( 'images')); //이미지 접근 권한

router.post('/kakao', async (req, res, next) => {
  try {
    const {access_token} = req.body;
    console.log("카카오 access_token: ", access_token);

    var request = require('request');
    var options = {
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
    };

    request.post(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log("카카오로그인 body: ", JSON.parse(body));
        const userData = JSON.parse(body);
        res.status(200).json(userData);
        //여기서 쿠키 설정해주기?
      } else {
        res.status(response.statusCode).end();
        console.log("error = " + response.statusCode);
      }
    });
    // console.log("kakaoResponse.data: ", kakaoResponse.data);
  } catch (error) {
    next(error);
  }
});

router.get('/lucky',async(req,res)=>{
    try {
      await models.Lucky.findAll({})
      .then(result => {
        res.send(result);
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

router.get("/naverbutton", function (req, res) {
  api_url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" + client_id + "&redirect_uri=" + loginRedirectURI + "&state=" + state;
  
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  
  res.end(
    "<a href='" + api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
  );
});

module.exports = router;