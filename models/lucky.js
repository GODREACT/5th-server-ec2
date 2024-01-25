// html.js 제목,내용,작성자,작성날짜,이미지,조회수
const Sequelize = require('sequelize');

class Lucky extends Sequelize.Model{
  static initiate(sequelize) {
    Lucky.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'lucky',
      tableName: 'luckytable',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
};

module.exports = Lucky;