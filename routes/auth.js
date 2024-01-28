const express = require('express');
const passport = require('passport');
const models = require('../models');
const User = require('../models/user/user.js');
const bcrypt = require('bcrypt');
const axios = require('axios');
const { isNotLoggedIn, isLoggedIn } = require('./middleware');

const router = express.Router();

const cookieConfig = {
  maxAge: 3600000,
  path: '/',
  signed: true,
  domain: 'localhost', // 도메인 설정 수정
};

//가입부분
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

// 로그인 부분
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.log(authError);
      return next(authError);
    }
    if (!user) {
      // 로그인 실패 시 에러 응답을 보내고 함수 종료
      return res.send('2');
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      

      // 로그인 성공 시 쿠키 설정 후 응답
      res.cookie('user-cookie', user.email, cookieConfig);
      console.log('Cookie Set:', user.email); // 로그 추가
      return res.send('1');
    });
  })(req, res, next);
});

router.get('/test', isLoggedIn, (req, res, next) => {
  console.log('로그아웃 라우터에 도달했습니다.');
  req.logout((err) => {
    if (err) {
      return next(err); // 에러가 있다면 다음 미들웨어로 에러를 전달
    }
    res.clearCookie('user-cookie', { path: '/' });
    res.redirect('/');
  });
});


module.exports = router;