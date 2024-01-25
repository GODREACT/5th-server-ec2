const Sequelize = require('sequelize');
const Lucky = require('./lucky');
const User = require('./user/user');
const Wallet = require('./user/wallet');
const Html = require('./html');
const Htmlreview = require('./htmlreview');
// const Image = require('./image');
const db = {};

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

// 유저 관련
db.User = User;
db.Wallet = Wallet;
//
db.Html =Html;
db.Htmlreview = Htmlreview;
db.Lucky = Lucky;
// User.initiate(sequelize);
User.initiate(sequelize);//DB를 추가할꺼면 무조건 있어야함
Wallet.initiate(sequelize);
Html.initiate(sequelize);
Htmlreview.initiate(sequelize);
Lucky.initiate(sequelize);
User.associate(db);
// Wallet.associate(db);
Html.associate(db);
Htmlreview.associate(db);

module.exports = db;