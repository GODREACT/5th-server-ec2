const express = require('express');
const passport = require('passport');
const models = require('../models');
const User = require('../models/user/user.js');
const bcrypt = require('bcrypt');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { isNotLoggedIn, isLoggedIn } = require('./middleware');

const router = express.Router();

const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uri = process.env.GOOGLE_REDIRECT_URI;

const cookieConfig = {
  //cookieConfig는 키, 밸류 외에 설정을 보낼 수 있다.
    maxAge : 30000,
      //밀리초 단위로 들어가는데 30000을 설정하면 30초만료 쿠키를 생성한다. 
      path: '/',
      httpOnly: true,
      //통신할때만 접속할 수 있다. 기본값은 false임 
      signed: true,
      //쿠키를 암호화 시킨다. 
  };

router.post('/google/data', async (req, res) => {
  const code = req.body.code;
  const url = `https://oauth2.googleapis.com/token`;
  try {
    await axios
      .post(url, {
        code: code,
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        grant_type : "authorization_code"
      },{
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((result) => {
        // console.log(el)
        // return el.data.access_token
        const accessToken = result.data.access_token;
        axios
          .get(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json`, {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
          })
          .then((user) => {
            console.log(user.data.email);
            const exUser = models.User.findOne({where: { email : user.data.email }});
            if(exUser) {
              res.send('로그인 성공');
            } else {

            }
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      })
  } catch(err) {
    console.log(err);
  }
})

// 사용자 미들웨어 isNotLoggedIn을 통과해야 async (req, res, next) => 미들웨어 실행
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { name, email, password, method, wallet_code } = req.body; // 프론트에서 보낸 폼데이터를 받는다.

  try {
     // 기존에 이메일로 가입한 사람이 있나 검사 (중복 가입 방지)
     const exUser = await User.findOne({ where: { email } });
     if (exUser) {
        // return res.redirect('/join?error=exist'); // 에러페이지로 바로 리다이렉트
        return res.send('fail');
     }

     // 정상적인 회원가입 절차면 해시화
     const hash = await bcrypt.hash(password, 12);
     console.log(hash);

     // DB에 해당 회원정보 생성
     await User.create({
        email : email,
        name : name,
        password: hash, // 비밀번호에 해시문자를 넣어준다.
        method : method,
        wallet_code: wallet_code
     });

     return res.send('success');
  } catch (error) {
     console.error(error);
     return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if(authError) {
      console.log(authError);
      return next(authError);
    }
    if(!user) {
      // return res.redirect(`/?loginError=${info.message}`);
      if(info.message == '구글로그인으로 로그인해주세요.') {
        return res.send('3');
      }
      return res.send('2');
    }
    return req.login(user, (loginError) => {
      if(loginError) {
        console.error(loginError);
        return next(loginError);
      }
      res.cookie('loginCookie', 'value', cookieConfig);
      res.send('1');
    });
  })(req, res, next);
})

// 구글로 로그인하기
router.post('/googlelogin', async (req, res) => {
  try {
    function generateRandomCode(n) {
      let str = ''
      for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10)
      }
      return str
    }
    console.log(req.body.token);
    const user = jwt.decode(req.body.token);
    const a = await models.User.findOne({
      where: {
        email : user.email,
        method : 'google'
      }
    })
    if(a) {
      res.send(200);
    } else {
      models.User.create({
        name: user.name,
        email: user.email,
        wallet_code: generateRandomCode(6),
        method: 'google'
      })
      .then((result) => {
        res.status(200).send(`${user.email}`);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  } catch(err) {
    console.log(err)
  }
})

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;