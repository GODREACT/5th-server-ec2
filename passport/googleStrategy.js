const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const models = require('../models');

function generateRandomCode(n) {
  let str = ''
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10)
  }
  return Number(str)
}

module.exports = () => {
   passport.use(
      new GoogleStrategy(
         {
            clientID: process.env.GOOGLE_CLIENT_ID, // 구글 로그인에서 발급받은 REST API 키
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3001/auth/google/callback',  // 구글 로그인 Redirect URI 경로
            passReqToCallback: true,
         },
         async (accessToken, refreshToken, profile, done) => {
            console.log('google profile : ', profile);
            try {
               const exUser = await models.User.findOne({
                  // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
                  where: { email: profile.id, method: 'google' },
               });
               // 이미 가입된 구글 프로필이면 성공
               if (exUser) {
                  done(null, exUser); // 로그인 인증 완료
               } else {
                  // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                  const newUser = await models.User.create({
                     email: profile?.email[0].value,
                     name: profile.displayName,
                     method: 'google',
                     walletnum: generateRandomCode(6)
                  });
                  done(null, newUser); // 회원가입하고 로그인 인증 완료
               }
            } catch (error) {
               console.error(error);
               done(error);
            }
         },
      ),
   );
};