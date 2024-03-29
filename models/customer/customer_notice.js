const Sequelize = require('sequelize');

class Customer_notice extends Sequelize.Model{
  static initiate(sequelize) {
    Customer_notice.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      regdt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },

      views: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      notice_detail:{
        type:Sequelize.TEXT,
        allowNull:false,
      },
      img_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Customer_notice',
      tableName: 'noticeTable',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    })
  }
};

module.exports = Customer_notice;
