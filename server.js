const express = require('express');
const cors =require('cors')
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const http = require('http');
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require('uuid');
const socketIo = require("socket.io");

const { sequelize } = require('./models');

const indexRouter = require('./routes')
const userRouter = require('./routes/user.js');

const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

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

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cookieSession({
  keys: uuidv4(),
  resave: false,
  saveUnitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
})
);

app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});