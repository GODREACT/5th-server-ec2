const express = require('express');
const cors =require('cors')
const nunjucks = require('nunjucks');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require('uuid');
const WebSocket = require("ws");

const payload = {
    access_key: "JkpxthVIGy0EtmtyU00axkI8MKVsyvoxdTJ4hDn4", 
    nonce: uuidv4(),
};

const app = express();
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

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUnitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}),
);

const jwtToken = jwt.sign(payload, "IQsvYFnvjMCXsa5l3J7Ijk7QGhEwXeHMhdlqpAM5");

// const ws = new WebSocket("wss://api.upbit.com/websocket/v1", {
//     headers: {
//         authorization: `Bearer ${jwtToken}`
//     }
// });


// ws.on("open", () => {
//     console.log("connected!");
//     // Request after connection
//     ws.send('[{"ticket":"test example"},{"type":"ticker", "codes":["KRW-BTC"]}, {"format":"DEFAULT"}]');
// });

// ws.on("error", console.error);

// ws.on("message", (data) => console.log(data.toString()));

// ws.on("close", () => console.log("closed!"));

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});