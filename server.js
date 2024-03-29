const express = require('express');
const cors =require('cors')
const nunjucks = require('nunjucks');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require("dotenv").config({ path: "./.env" });
require("dotenv").config();

const dotenv = require('dotenv');
dotenv.config();

const passportConfig = require('./passport');
const { sequelize } = require('./models');
const indexRouter = require('./routes')
const userRouter = require('./routes/user.js');
const authRouter = require('./routes/auth.js');
const testRouter = require('./routes/test.js');

const app = express();
passportConfig();

const htmlRouter = require('./routes/html.js');
const htmlreviewRouter = require('./routes/htmlreview.js');
const customernoticeRoutes= require("./routes/cutomer_notice");
const customerbugRoutes = require("./routes/cutomer_bug");
const stockdetailRoutes = require("./routes/stockdetail");


// force 에 true가 들어가면 테이블을 재생성함
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.set('port', process.env.PORT || 3003);
app.set('view engine', 'html');
// 넌적스 초기화
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  // origin: 'http://localhost:3000',
  origin: true,
  credentials: true
}));
// app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  name: 'user-cookies',
  resave: true,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/app1/api/', indexRouter);
app.use('/app1/api/user', userRouter);
app.use('/app1/api/auth', authRouter);
app.use('/app1/api/html', htmlRouter);
app.use('/app1/api/htmlreview', htmlreviewRouter);
app.use('/app1/api/test', testRouter);

app.use('/app1/api/notice_detail', customernoticeRoutes);
app.use('/app1/api/bug', customerbugRoutes);
app.use('/app1/api/stock_detail', stockdetailRoutes);


app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
