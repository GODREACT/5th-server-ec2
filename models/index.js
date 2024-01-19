const Sequelize = require('sequelize');

const User = require('./user/user');
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
//
db.Html =Html;
db.Htmlreview = Htmlreview;

// User.initiate(sequelize);
User.initiate(sequelize);//DB를 추가할꺼면 무조건 있어야함
Html.initiate(sequelize);
Htmlreview.initiate(sequelize);

User.associate(db);
Html.associate(db);
Htmlreview.associate(db);

// User.associate(db); //FK

db.User = User;




module.exports = db;