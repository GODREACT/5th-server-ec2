const Sequelize = require('sequelize');

const User = require('./user/user');
const Wallet = require('./user/wallet');
const Html = require('./html');
const Htmlreview = require('./htmlreview');
const Customer_notice = require('./customer/customer_notice');
const Customer_bug = require('./customer/customer_bug');
const Stock_detail = require('./stockdetail');
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

db.Customer_notice = Customer_notice;
db.Customer_bug = Customer_bug;
db.Stock_detail = Stock_detail;


// User.initiate(sequelize);
User.initiate(sequelize);//DB를 추가할꺼면 무조건 있어야함
Wallet.initiate(sequelize);
Html.initiate(sequelize);
Htmlreview.initiate(sequelize);
Customer_notice.initiate(sequelize);
Customer_bug.initiate(sequelize);
Stock_detail.initiate(sequelize);

User.associate(db);
// Wallet.associate(db);
Html.associate(db);
Htmlreview.associate(db);


module.exports = db;