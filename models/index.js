const Sequelize = require('sequelize');

const Customer_notice = require('./customer/customer_notice')
const Customer_bug = require('./customer/customer_bug');
const Stock_detail = require('./stockdetail');

const db = {};

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Customer_notice = Customer_notice;
db.Customer_bug = Customer_bug;
db.Stock_detail = Stock_detail;

Customer_notice.initiate(sequelize);
Customer_bug.initiate(sequelize);
Stock_detail.initiate(sequelize);

module.exports = db;