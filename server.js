const express = require('express');
const cors =require('cors')
const nunjucks = require('nunjucks');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require('uuid');
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const payload = {
    access_key: "JkpxthVIGy0EtmtyU00axkI8MKVsyvoxdTJ4hDn4", 
    nonce: uuidv4(),
};


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
app.use(express.cookieParser(process.env.COOKIE_SECRET));
app.use(express.cookieSession({
  resave: false,
  saveUnitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
})
);
// app.use(express.session())

// Upbit API 엔드포인트 및 키
const UPBIT_API_URL = 'https://api.upbit.com/v1/ticker';
const UPBIT_API_KEY = 'IQsvYFnvjMCXsa5l3J7Ijk7QGhEwXeHMhdlqpAM5';

// Upbit API 호출 함수
const getCoinData = async (symbols) => {
  try {
    const response = await axios.get(UPBIT_API_URL, {
      params: { markets: symbols.join(','), isDetails: false },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    throw error;
  }
};

const jwtToken = jwt.sign(payload, "IQsvYFnvjMCXsa5l3J7Ijk7QGhEwXeHMhdlqpAM5");

io.on('connenction', (socket) => {
  console.log('Connected !');

  socket.on('message', (data) => {
    console.log('Received : ', data);
  });

  // 클라이언트로부터 코인 정보 요청 시 처리
  socket.on('getCoinData', async (symbols) => {
    try {
      const coinData = await getCoinData(symbols);
      io.to(socket.id).emit('coinData', coinData);
    } catch (error) {
      // 오류 처리
      console.error('Error getting coin data:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Disconnected !');
  });
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});