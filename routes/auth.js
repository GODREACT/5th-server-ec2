const express = require('express');
const passport = require('passport');
const models = require('../models');
const User = require('../models/user/user.js');
const bcrypt = require('bcrypt');
const axios = require('axios');
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
  const { name, email, password, method } = req.body; // 프론트에서 보낸 폼데이터를 받는다.

  try {
     // 기존에 이메일로 가입한 사람이 있나 검사 (중복 가입 방지)
     const exUser = await User.findOne({ where: { email } });
     if (exUser) {
        return res.redirect('/join?error=exist'); // 에러페이지로 바로 리다이렉트
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
     });

     return res.redirect('/');
  } catch (error) {
     console.error(error);
     return next(error);
  }
});

router.post('/locallogin', isNotLoggedIn, (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', (authError, user, info) => {
    // console.log(user);
    // console.log(info);
    if(authError) {
      console.log(authError);
      return next(authError);
    }
    if(!user) {
      // console.log(info)
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if(loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // res.setHeader('Set-Cookie', `${user.dataValues.email}`);
      console.log(user);
      res.cookie('loginCookie', 'value', cookieConfig);
      res.redirect('http://localhost:3000');
    });
  })(req, res, next);
})

//* 구글로 로그인하기 라우터 ***********************
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] })); // 프로파일과 이메일 정보를 받는다.

//? 위에서 구글 서버 로그인이 되면, 네이버 redirect url 설정에 따라 이쪽 라우터로 오게 된다. 인증 코드를 박게됨
router.get(
   '/google/callback',
   passport.authenticate('google', { failureRedirect: '/' }), //? 그리고 passport 로그인 전략에 의해 googleStrategy로 가서 구글계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
   (req, res) => {
      res.send('로그인됨');
   },
);

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;