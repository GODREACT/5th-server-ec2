const express = require('express');
const cors =require('cors')
const nunjucks = require('nunjucks');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const cookieSession = require('cookie-session');
const passport = require('passport');
require("dotenv").config({ path: "./.env" });
const path = require('path');
const http = require('http');
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require('uuid');

require("dotenv").config();

const CustomernoticeRoutes= require("./routes/cutomer_notice");
const CustomerbugRoutes = require("./routes/cutomer_bug");
const StockdetailRoutes = require("./routes/stockdetail");

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
// const server = http.createServer(app);
// const io = socketIo(server);

const htmlRouter = require('./routes/html.js');
const htmlreviewRouter = require('./routes/htmlreview.js');
const CustomernoticeRoutes= require("./routes/cutomer_notice");
const CustomerbugRoutes = require("./routes/cutomer_bug");
const StockdetailRoutes = require("./routes/stockdetail");

const payload = {
    access_key: "JkpxthVIGy0EtmtyU00axkI8MKVsyvoxdTJ4hDn4", 
    nonce: uuidv4(),
};

// force 에 true가 들어가면 테이블을 재생성함
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

// const io = socketIo('wss://api.upbit.com/websocket/v1');
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');
// 넌적스 초기화
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(express.static(path.join(__dirname, 'images')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/api/test', testRouter);

app.use('/html', htmlRouter);
app.use('/htmlreview', htmlreviewRouter);

app.use('/notice_detail', CustomernoticeRoutes);
app.use('/bug',CustomerbugRoutes);
app.use('/stock_detail',StockdetailRoutes);


app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});