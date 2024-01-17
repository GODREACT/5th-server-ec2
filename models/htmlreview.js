// Htmlreview.js 제목,내용,작성자,작성날짜,이미지,조회수
const Sequelize = require('sequelize');

class Htmlreview extends Sequelize.Model{
  static initiate(sequelize) {
    Htmlreview.init({
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
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"), 
      },
    },
      
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Htmlreview',
      tableName: 'HtmlreviewTable',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  // 받는쪽 
  static associate(db) {
    // 받을곳(지금모델)     보내는곳      지정할 이름       include로 사용할이름   가져올데이터
    db.Htmlreview.belongsTo(db.User, {foreignKey: 'userid',as:'user',sourceKey: 'id'});
    db.Htmlreview.belongsTo(db.Html, {foreignKey:'reviewid',as:'review',sourceKey: 'id'});
  }
};

module.exports = Htmlreview;